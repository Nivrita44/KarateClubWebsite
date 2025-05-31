import bcrypt from 'bcryptjs';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import mysql from 'mysql2';
import multer from "multer";

import SSLCommerzPayment from "sslcommerz-lts";
import { cloudinary, cloudinaryConfig } from "./config/cloudinaryConfig.js"; // Cloudinary configuration
import db from './config/mysql.js';
import { multerUploads } from "./middlewares/multer.js"; // Multer middleware for image upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

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
        database: "SUST_Karate_Club",
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
            // Fetch student ID by matching email in bill - student table
            const [billInfo] = await sslcommerzDb.execute(
                "SELECT email FROM bills WHERE transaction_id = ?", [tran_id]
            );

            if (billInfo.length) {
                const email = billInfo[0].email;
                const [
                    [student]
                ] = await db.query(
                    "SELECT id FROM students WHERE email = ?", [email]
                );

                if (student ? .id) {
                    await db.query(
                        "INSERT INTO notifications (studentId, message, type) VALUES (?, ?, ?)", [student.id, "Your payment was successful!", "payment"]
                    );
                }
            }

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

// SSLCommerz success: trigger payment notification
app.post("/sslcommerz/success/:tran_id", async(req, res) => {
    const { tran_id } = req.params;
    try {
        const [result] = await sslcommerzDb.execute("UPDATE bills SET status = 'paid' WHERE transaction_id = ?", [tran_id]);

        if (result.affectedRows > 0) {
            const [billInfo] = await sslcommerzDb.execute("SELECT email FROM bills WHERE transaction_id = ?", [tran_id]);
            if (billInfo.length) {
                const email = billInfo[0].email;
                const [
                    [student]
                ] = await db.query("SELECT id FROM students WHERE email = ?", [email]);
                if (student ? .id) {
                    await db.query("INSERT INTO notifications (studentId, message, type) VALUES (?, ?, ?)", [student.id, "Your payment was successful!", "payment"]);
                }
            }
            res.redirect(`http://localhost:5173/success/${tran_id}`);
        } else {
            res.status(404).send("Transaction not found");
        }
    } catch (error) {
        console.error("❌ Error updating transaction status:", error);
        res.status(500).send("Error updating transaction status");
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
// Get all students
app.get("/api/students", async(req, res) => {
    const [results] = await db.query("SELECT * FROM students");
    res.json(results);
});
// Get student by ID
// Student belt/certificate update route
app.put("/api/students/:id", async(req, res) => {
    const { belt, certificate } = req.body;
    const studentId = req.params.id;

    try {
        await db.query("UPDATE students SET belt = ?, certificate = ? WHERE id = ?", [belt, certificate, studentId]);

        if (belt) {
            await db.query("INSERT INTO notifications (studentId, message, type) VALUES (?, ?, ?)", [studentId, `Your belt has been updated to ${belt}.`, "belt"]);
        }
        if (certificate) {
            await db.query("INSERT INTO notifications (studentId, message, type) VALUES (?, ?, ?)", [studentId, "Your certificate has been uploaded.", "certificate"]);
        }

        res.json({ message: "Student updated" });
    } catch (err) {
        console.error("❌ Belt update failed:", err);
        res.status(500).json({ error: "Update failed" });
    }
});

//certificate image upload
app.post(
    "/api/upload-certificate",
    upload.single("certificate"),
    async(req, res) => {
        try {
            const stream = cloudinary.uploader.upload_stream({ folder: "certificates" },
                (err, result) => {
                    if (err) return res.status(500).json({ error: "Upload failed" });
                    res.json({ url: result.secure_url });
                }
            );
            stream.end(req.file.buffer);
        } catch (err) {
            res.status(500).json({ error: "Server error" });
        }
    }
);
// Notifications ROUTES

//get/receive a notification
// Notifications GET route
app.get("/api/notifications", async(req, res) => {
    const { type, studentId } = req.query;
    let query = "SELECT * FROM notifications";
    const params = [];

    if (studentId) {
        query += " WHERE studentId = ?";
        params.push(studentId);
    } else if (type) {
        query += " WHERE type = ?";
        params.push(type);
    }
    query += " ORDER BY createdAt DESC";
    const [results] = await db.query(query, params);
    res.json(results);
});

//send notifications(more likely announcemments here)
app.post("/api/notifications", async(req, res) => {
    const { studentId, message, type } = req.body;

    try {
        if (studentId) {
            await db.query(
                "INSERT INTO notifications (studentId, message, type) VALUES (?, ?, ?)", [studentId, message, type || "announcement"]
            );
        } else {
            const [students] = await db.query("SELECT id FROM students");
            for (const student of students) {
                await db.query(
                    "INSERT INTO notifications (studentId, message, type) VALUES (?, ?, ?)", [student.id, message, "announcement"]
                );
            }
        }

        res.status(201).json({ message: "Notification sent." });
    } catch (err) {
        console.error("Notification error:", err);
        res.status(500).json({ error: "Server error" });
    }
});
// Update notification
app.put("/api/notifications/:id", async(req, res) => {
    const { id } = req.params;
    const { message, type } = req.body;

    try {
        await db.query(
            "UPDATE notifications SET message = ?, type = ? WHERE id = ?", [message, type, id]
        );
        res.json({ message: "Notification updated" });
    } catch (err) {
        console.error("Notification update error:", err);
        res.status(500).json({ error: "Update failed" });
    }
});
// Delete notification
app.delete("/api/notifications/:id", async(req, res) => {
    const { id } = req.params;

    try {
        await db.query("DELETE FROM notifications WHERE id = ?", [id]);
        res.json({ message: "Notification deleted" });
    } catch (err) {
        console.error("Notification delete error:", err);
        res.status(500).json({ error: "Delete failed" });
    }
});



//  GET all announcements
app.get("/api/announcements", async(req, res) => {
    const [rows] = await db.query("SELECT * FROM announcements ORDER BY createdAt DESC");
    res.json(rows);
});

// POST a new announcement
app.post(
    "/api/announcements",
    upload.single("attachment"),
    async(req, res) => {
        const { title, content } = req.body;
        let attachmentUrl = null;

        if (req.file) {
            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream({ folder: "announcements" },
                    (err, result) => (err ? reject(err) : resolve(result))
                );
                stream.end(req.file.buffer);
            });
            attachmentUrl = result.secure_url;
        }

        await db.query(
            "INSERT INTO announcements (title, content, attachmentUrl) VALUES (?, ?, ?)", [title, content, attachmentUrl]
        );

        res.status(201).json({ message: "Announcement created" });
    }
);


// PUT (update) an announcement
app.put("/api/announcements/:id", async(req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    await db.query("UPDATE announcements SET title = ?, content = ? WHERE id = ?", [title, content, id]);
    res.json({ message: "Announcement updated" });
});

//  DELETE an announcement
app.delete("/api/announcements/:id", async(req, res) => {
    const { id } = req.params;
    await db.query("DELETE FROM announcements WHERE id = ?", [id]);
    res.json({ message: "Announcement deleted" });
});



// Add a new student

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
//students login
app.post("/api/login", async(req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ message: "Email and password required." });

    try {
        const [results] = await db.query("SELECT * FROM students WHERE email = ?", [
            email,
        ]);

        if (results.length === 0) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        delete user.password;

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role || "student", // <-- Send role here
                imageUrl: user.imageUrl,
                campus: user.campus,
                department: user.department,
                gender: user.gender,
            },
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});
//instructors login
app.post("/api/instructor-login", async(req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ message: "Email and password required." });

    try {
        const [results] = await db.query(
            "SELECT * FROM instructors WHERE email = ?", [email]
        );

        if (results.length === 0) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const instructor = results[0];

        // ✅ DEBUG HERE
        console.log("Request email:", email);
        console.log("DB result:", instructor);
        console.log(
            "Password match:",
            await bcrypt.compare(password, instructor.password)
        );

        const isPasswordValid = await bcrypt.compare(password, instructor.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        delete instructor.password;

        res.status(200).json({
            message: "Login successful",
            user: {
                id: instructor.id,
                name: instructor.name,
                email: instructor.email,
                role: instructor.role || "instructor",
                phone: instructor.phone,
                imageUrl: instructor.profilePic,
            },
        });
    } catch (err) {
        console.error("Login error:", err);
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

app.put("/api/instructor/:id", async(req, res) => {
    const { id } = req.params;
    const updatedFields = req.body;

    try {
        const ignoreFields = ["createdAt", "updatedAt"];
        const filteredKeys = Object.keys(updatedFields).filter(
            (key) => !ignoreFields.includes(key)
        );
        const fields = filteredKeys.map((key) => `${key} = ?`).join(", ");
        const values = filteredKeys.map((key) => updatedFields[key]);


        await db.query(`UPDATE instructors SET ${fields} WHERE id = ?`, [
            ...values,
            id,
        ]);
        // console.log(`✅ Updated instructor with ID: ${id}`);
        res.status(200).json({ message: "Instructor updated successfully" });
    } catch (err) {
        console.error("Update error:", err); // ✅ See terminal for message
        res.status(500).json({ message: "Update failed" });
    }
});

// Image upload endpoint
app.post("/api/upload", upload.single("image"), async(req, res) => {
    try {
        const stream = cloudinary.uploader.upload_stream({ folder: "instructors" },
            (err, result) => {
                if (err) return res.status(500).json({ error: "Upload failed" });
                res.json({ url: result.secure_url });
            }
        );
        stream.end(req.file.buffer); // ✅ req.file is valid thanks to multer
    } catch (err) {
        console.error("Upload error:", err);
        res.status(500).json({ error: "Server error" });
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

// Get about club content
app.get("/api/about", async(req, res) => {
    const [rows] = await db.query("SELECT * FROM about_club");
    res.json(rows);
});

// Update about club content
app.put("/api/about", async(req, res) => {
    const updates = req.body; // { section: content }

    try {
        for (const section in updates) {
            const [exists] = await db.query("SELECT * FROM about_club WHERE section = ?", [section]);
            if (exists.length > 0) {
                await db.query("UPDATE about_club SET content = ? WHERE section = ?", [updates[section], section]);
            } else {
                await db.query("INSERT INTO about_club (section, content) VALUES (?, ?)", [section, updates[section]]);
            }
        }

        res.json({ message: "About Club content updated." });
    } catch (err) {
        console.error("❌ Error updating about_club:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// Get student belt info
app.get("/api/student/:id/belt-info", async(req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query(
            "SELECT name, belt, certificate, createdAt, updatedAt FROM students WHERE id = ?", [id]
        );
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ message: "Student not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error fetching belt info", error: err });
    }
});

// Fetch all exam routines
app.get("/api/exams", async(req, res) => {
    try {
        const [results] = await db.query("SELECT * FROM exams ORDER BY date ASC");
        res.json(results);
    } catch (error) {
        console.error("Error fetching exams:", error);
        res.status(500).json({ message: "Failed to fetch exams" });
    }
});


// Fetch exams by belt level
app.get("/api/exams/:belt", async(req, res) => {
    const { belt } = req.params;
    try {
        const [rows] = await db.query("SELECT * FROM exam_routine WHERE belt = ?", [belt]);
        res.json(rows);
    } catch (err) {
        console.error("❌ Belt exam fetch error:", err);
        res.status(500).json({ error: "Failed to fetch exams for belt" });
    }
});

app.post("/api/exams", async(req, res) => {
    const { date, time, belt, examiner, location } = req.body;

    try {
        const sql = `
      INSERT INTO exams (date, time, belt, examiner, location)
      VALUES (?, ?, ?, ?, ?)
    `;
        await db.query(sql, [date, time, belt, examiner, location]);
        res.status(201).json({ message: "Exam routine added successfully." });
    } catch (err) {
        console.error("❌ Exam insert error:", err);
        res.status(500).json({ error: "Database error" });
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