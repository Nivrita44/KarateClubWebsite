import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import db from './config/mysql.js';

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json()); // For parsing JSON request body
app.use(cors({ origin: "http://localhost:5173", credentials: true }));


// API to handle checkout operation (fetching user data using id)
app.get('/get-member/:id', (req, res) => {
    const { id } = req.params;
    console.log(`🔍 Received request for user ID: ${id}`);

    // Using CAST to ensure the ID is treated as an integer
    const sql = "SELECT * FROM students WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("❌ Database error:", err);
            return res.status(500).json({ message: "Database Error", error: err });
        }

        console.log(`🔍 Query result:`, result);

        if (result.length === 0) {
            console.log("❌ No user found with that ID.");
            return res.status(404).json({ message: "Student not found" });
        }

        console.log("✅ Successfully fetched user data:", result[0]);
        res.status(200).json(result[0]);
    });
});





app.post('/api/join', (req, res) => {
    console.log("📥 Received Data:", req.body); // Debugging log

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
        previousExperience
    } = req.body;

    // Ensure all required fields exist
    if (!name || !guardian || !relation || !dateOfBirth || !studentID || !campus || !department || !gender || !bloodGroup ||
        !height || !weight || !currentAddress || !permanentAddress || !phone || !password || !email || !nationalID || !religion) {
        console.log("❌ Missing Fields:", req.body);
        return res.status(400).json({ message: "All fields are required!" });
    }

    const sql = `
        INSERT INTO students 
        (name, guardian, relation, dateOfBirth, studentID, campus, department, gender, bloodGroup, height, weight, 
        currentAddress, permanentAddress, phone, password, email, nationalID, religion, previousExperience) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        name, guardian, relation, dateOfBirth, studentID, campus, department,
        gender, bloodGroup, height, weight, currentAddress, permanentAddress,
        phone, password, email, nationalID, religion, previousExperience
    ], (err, result) => {
        if (err) {
            console.error("❌ Database Insert Error:", err);
            return res.status(500).json({ message: "Database Error", error: err });
        }
        console.log("✅ Student added:", result.insertId);
        res.status(201).json({ message: "Student added successfully!", id: result.insertId });
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