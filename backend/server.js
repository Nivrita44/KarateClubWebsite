import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import mysql from 'mysql2';
import SSLCommerzPayment from "sslcommerz-lts";
import db from './config/mysql.js';
import { cloudinaryConfig, cloudinary } from "./config/cloudinaryConfig.js"; // Cloudinary configuration
import { multerUploads } from "./middlewares/multer.js"; // Multer middleware for image upload

cloudinaryConfig();



const app = express();
const port = process.env.PORT || 4000;

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
        password: "Ema234",
        database: "demo_import",
    })
  .promise(); //why mysql2 te promise  evabe use kore na.. er age amra db r code likhsi mysql er ager version er. to promise chara choltese na kno?.. bujhtesina code e kisu overlap ache.. funtionality check kore dekho ekhon . partam na. zemne ase emnei cholle cholbo, nailw nai etai boltesi choltese choluk baki kam kaj hoitese kina.  oita dekhte boltesi ar ki 
// ekhane amk db ta dekha, cnnection ta

// Ensure bills table exists
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



// API to handle checkout operation (fetching user data using id)
// app.get('/get-member/:id', async (req, res) => {
//     const { id } = req.params;
//     console.log(`🔍 Received request for user ID: ${id}`);

//     // Using CAST to ensure the ID is treated as an integer
//     const sql = "SELECT * FROM students WHERE id = ?";
//     const [result]= await db.query(sql, [id], (err, result) => {
//         if (err) {
//             console.error("❌ Database error:", err);
//             return res.status(500).json({ message: "Database Error", error: err });
//         }

//         console.log(`🔍 Query result:`, result);

//         if (result.length === 0) {
//             console.log("❌ No user found with that ID.");
//             return res.status(404).json({ message: "Student not found" });
//         }

//         console.log("✅ Successfully fetched user data:", result[0]);
//         res.status(200).json(result[0]);
//     });
// });

app.get("/get-member/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`🔍 Received request for user ID: ${id}`);

    const sql = "SELECT * FROM students WHERE id = ?";
    const result = await db.query(sql, [id]);

    console.log(`🔍 Query result:`, result);

    if (result.length === 0) {
      console.log("❌ No user found with that ID.");
      return res.status(404).json({ message: "Student not found" });
    }

    console.log("✅ Successfully fetched user data:", result[0]);
    res.status(200).json(result[0]);
  } catch (err) {
    console.error("❌ Database error:", err);
    res.status(500).json({ message: "Database Error", error: err });
  }
});



// Get Instructor data by ID

app.get("/api/instructors", async (req, res) => {
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

// Join Club 
app.post("/api/join", multerUploads, async (req, res) => {
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

    // Cloudinary upload logic
    const imageFile = req.file;
    console.log(imageFile);

    let imageUrl = null;
    
    if (imageFile) {
      // Upload image to Cloudinary
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "auto" },
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

    // Insert data into MySQL
    const sql = imageUrl ? `
      INSERT INTO students 
      (name, guardian, relation, dateOfBirth, studentID, campus, department, gender, bloodGroup, height, weight,
      currentAddress, permanentAddress, phone, password, email, nationalID, religion, previousExperience, imageUrl) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ` : `
      INSERT INTO students 
      (name, guardian, relation, dateOfBirth, studentID, campus, department, gender, bloodGroup, height, weight,
      currentAddress, permanentAddress, phone, password, email, nationalID, religion, previousExperience) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = imageUrl ? [
      name, guardian, relation, dateOfBirth, studentID, campus, department, gender, bloodGroup, height, weight,
      currentAddress, permanentAddress, phone, password, email, nationalID, religion, previousExperience, imageUrl
    ] : [
      name, guardian, relation, dateOfBirth, studentID, campus, department, gender, bloodGroup, height, weight,
      currentAddress, permanentAddress, phone, password, email, nationalID, religion, previousExperience
    ];

    const [result] = await db.query(sql, values);
    
    res.status(201).json({
      message: "Student added successfully!",
      studentID: result.insertId,
    });

  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ 
      message: err.message.includes("Cloudinary") 
        ? "Cloudinary Upload Error" 
        : "Database Error", 
      error: err 
    });
  }
});


/// Fetch instructor data by ID
app.get("/api/instructor/:ins_id", async (req, res) => {
  try {
    const { ins_id } = req.params;
    const sql = "SELECT * FROM instructors WHERE id = ?";
    const result = await db.query(sql, [ins_id]);

    if (result.length === 0) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    res.status(200).json(result[0]);
  } catch (err) {
    console.error("❌ Database error:", err);
    res.status(500).json({ message: "Database Error", error: err });
  }
});

// Fetch all instructors from the database
app.get("/api/instructors", (req, res) => {
  const sql = "SELECT * FROM instructors"; // Query to fetch all instructors

  db.query(sql, (err, result) => {
    if (err) {
      console.error("❌ Database error:", err);
      return res.status(500).json({ message: "Database Error", error: err });
    }

    res.status(200).json(result); // Return the instructors data to the frontend
  });
});





// Root API
app.get('/', (req, res) => {
    res.send('API WORKING');
});

// Start Server
app.listen(port, () => {
    console.log(`✅ Server running on port ${port}`);
});

