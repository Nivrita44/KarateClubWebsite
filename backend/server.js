import bcrypt from 'bcrypt';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import mysql from 'mysql2';
import SSLCommerzPayment from "sslcommerz-lts";
import { cloudinary, cloudinaryConfig } from "./config/cloudinaryConfig.js"; // Cloudinary configuration
import db from './config/mysql.js';
import { multerUploads } from "./middlewares/multer.js"; // Multer middleware for image upload

cloudinaryConfig();


const app = express();
const port = process.env.PORT || 4000;
app.use(cors());


const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;
const is_live = false;

// Middleware
app.use(express.json()); // For parsing JSON request body
app.use(cors({ origin: "http://localhost:5173", credentials: true }));


const sslcommerzDb = mysql
    .createPool({
        host: "localhost",
        user: "root",
        password: "",
        database: "karateclubsust",
    })
    .promise();

const createBillsTable = `
  CREATE TABLE IF NOT EXISTS bills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    transaction_id VARCHAR(255) UNIQUE,
    name VARCHAR(255),
    email VARCHAR(255),
    status VARCHAR(50),
    amount DECIMAL(10, 2)
  );
`;

sslcommerzDb.query(createBillsTable)
    .then(() => console.log("✅ Bills table ready"))
    .catch(err => {
        console.error("❌ Failed to create Bills table:", err);
        process.exit(1);
    });



// Initialize payment
app.post("/sslcommerz/init", async(req, res) => {
    const { name, email, amount } = req.body;
    if (!name || !email || !amount) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const tran_id = `TRANS_${Date.now()}`;
    const data = {
        store_id,
        store_passwd,
        total_amount: amount,
        currency: "BDT",
        tran_id,
        cus_name: name,
        cus_email: email,
        cus_phone: "01711111111", // Static phone number for now
        shipping_method: "NO",
        product_name: "Fee",
        product_category: "N/A",
        product_profile: "None",
        success_url: `http://localhost:4000/sslcommerz/success/${tran_id}`,
        fail_url: `http://localhost:4000/sslcommerz/fail`,
        cancel_url: `http://localhost:4000/sslcommerz/fail`,
        emi_option: 0,
    };

    try {
        // Insert transaction as "pending"
        const query = `INSERT INTO bills (transaction_id, name, email, status, amount) VALUES (?, ?, ?, 'pending', ?)`;
        await sslcommerzDb.execute(query, [tran_id, name, email, amount]);

        // Initialize SSLCommerz Payment
        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
        const apiResponse = await sslcz.init(data);

        if (apiResponse && apiResponse.GatewayPageURL) {
            res.json({ url: apiResponse.GatewayPageURL });
            console.log("🔗 Redirecting to:", apiResponse.GatewayPageURL);
        } else {
            res.status(500).json({ error: "Failed to generate payment link" });
        }
    } catch (error) {
        console.error("❌ Error initiating payment:", error);
        res.status(500).json({ error: "Server error while initiating payment" });
    }
});

// Success route
app.post("/sslcommerz/success/:tran_id", async(req, res) => {
    const { tran_id } = req.params;
    try {
        // Update transaction status to 'paid'
        const updateQuery = `UPDATE bills SET status = 'paid' WHERE transaction_id = ?`;
        const [result] = await sslcommerzDb.execute(updateQuery, [tran_id]);

        if (result.affectedRows > 0) {
            res.redirect(`http://localhost:5173/success/${tran_id}`);
        } else {
            res.status(404).send("Transaction not found");
        }
    } catch (error) {
        console.error("❌ Error updating transaction status:", error);
        res.status(500).send("Error updating transaction status");
    }
});

// Failure route
app.post("/sslcommerz/fail", (req, res) => {
    res.redirect("http://localhost:5173/fail");
});

// Get transaction details
app.get("/api/transaction/:tran_id", async(req, res) => {
    const { tran_id } = req.params;
    try {
        const query = `SELECT * FROM bills WHERE transaction_id = ?`;
        const [rows] = await sslcommerzDb.execute(query, [tran_id]);

        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ error: "Transaction not found" });
        }
    } catch (error) {
        console.error("❌ Error fetching transaction details:", error);
        res.status(500).json({ error: "Server error while fetching transaction details" });
    }
});

app.get("/get-member/:id", async(req, res) => {
    try {
        const { id } = req.params;
        console.log(`🔍 Received request for user ID: ${id}`);

        const sql = "SELECT * FROM students WHERE id = ?";
        const [rows] = await db.query(sql, [id]);

        console.log(`🔍 Query result:`, rows);

        if (rows.length === 0) {
            console.log("❌ No user found with that ID.");
            return res.status(404).json({ message: "Student not found" });
        }

        console.log("✅ Successfully fetched user data:", rows[0]);
        res.status(200).json(rows[0]);
    } catch (err) {
        console.error("❌ Database error:", err);
        res.status(500).json({ message: "Database Error", error: err });
    }
});


// Get Instructor data by ID

app.get("/api/instructors", async(req, res) => {
    try {
        const sql = "SELECT * FROM instructors";
        const [result] = await db.query(sql);
        res.status(200).json(result);
        // console.log(result);
    } catch (err) {
        console.error("❌ Database error:", err);
        res.status(500).json({ message: "Database Error", error: err });
    }
});

app.post("/api/join", multerUploads, async(req, res) => {
    try {
        console.log("Function called");
        console.log(req.body);

        const {
            name,
            guardian,
            relation,
            dateOfBirth,
            studentID,
            campus,
            department,
            gender,
            bloodGroup,
            height,
            weight,
            currentAddress,
            permanentAddress,
            phone,
            password,
            email,
            nationalID,
            religion,
            previousExperience,
        } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        // Cloudinary upload logic
        const imageFile = req.file;
        console.log("Uploaded file:", imageFile);

        let imageUrl = null;

        if (imageFile) {
            // Upload image to Cloudinary
            const result = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream({ resource_type: "auto" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                uploadStream.end(imageFile.buffer);
            });

            console.log("Cloudinary upload result:", result);
            imageUrl = result.secure_url;
            console.log("Image URL:", imageUrl);
        }

        // Prepare SQL and values
        let sql;
        let values;

        if (imageUrl) {
            sql = `
                INSERT INTO students 
                (name, guardian, relation, dateOfBirth, studentID, campus, department, gender, bloodGroup, height, weight,
                currentAddress, permanentAddress, phone, password, email, nationalID, religion, previousExperience, imageUrl) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            values = [
                name, guardian, relation, dateOfBirth, studentID, campus, department, gender, bloodGroup, height, weight,
                currentAddress, permanentAddress, phone, hashedPassword, email, nationalID, religion, previousExperience, imageUrl
            ];
        } else {
            sql = `
                INSERT INTO students 
                (name, guardian, relation, dateOfBirth, studentID, campus, department, gender, bloodGroup, height, weight,
                currentAddress, permanentAddress, phone, password, email, nationalID, religion, previousExperience) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            values = [
                name, guardian, relation, dateOfBirth, studentID, campus, department, gender, bloodGroup, height, weight,
                currentAddress, permanentAddress, phone, hashedPassword, email, nationalID, religion, previousExperience
            ];
        }

        const [result] = await db.query(sql, values);

        res.status(201).json({
            message: "Student added successfully!",
            studentID: result.insertId,
        });

    } catch (err) {
        console.error("❌ Error:", err);
        res.status(500).json({
            message: err.message.includes("Cloudinary") ?
                "Cloudinary Upload Error" : "Database Error",
            error: err.message
        });
    }
});

//login
app.post("/api/login", async(req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password required." });
    }

    try {
        const [results] = await db.query("SELECT * FROM students WHERE email = ?", [email]);

        if (results.length === 0) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        // Don't expose the hashed password
        delete user.password;

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                campus: user.campus,
                department: user.department,
                gender: user.gender,
                imageUrl: user.imageUrl,
            },
        });
    } catch (err) {
        console.error("❌ Login error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

/// Fetch instructor data by ID
app.get("/api/instructor/:ins_id", async(req, res) => {
    try {
        const { ins_id } = req.params;
        const sql = "SELECT * FROM instructors WHERE id = ?";
        const result = await db.query(sql, [ins_id]);
        res.status(200).json(result[0]);
    } catch (err) {
        console.error("❌ Database error:", err);
        res.status(500).json({ message: "Database Error", error: err });
    }
});
// Update member
app.put("/update-member/:id", async(req, res) => {
    try {
        const id = req.params.id;
        const { email, phone } = req.body;

        console.log(`🔍 Updating user with ID: ${id}`);
        console.log(`New email: ${email}, New phone: ${phone}`);

        const sql = "UPDATE students SET email = ?, phone = ? WHERE id = ?";
        const [result] = await db.query(sql, [email, phone, id]);

        console.log("🔍 Query result:", result);

        if (result.affectedRows === 0) {
            console.log("❌ No user found to update.");
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Updated successfully" });
    } catch (err) {
        console.error("❌ Database error:", err);
        res.status(500).json({ message: "Database Error", error: err });
    }
});


// Root API
app.get('/', (req, res) => {
    res.send('API WORKING');
});

// Start Server
app.listen(port, () => {
    console.log(`✅Server running on port $ { port }`);
});