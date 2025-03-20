
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import db from './config/mysql.js';


db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL database!");
    }
});



//app config
const app = express()
const port = process.env.PORT || 4000

//middlewares
app.use(express.json())
app.use(cors())


// API Route for inserting data into MySQL
app.post('/api/join', (req, res) => {
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
        res.status(201).json({ message: "Student added successfully!", studentID: result.insertId });
    });
});



//api endpoints

app.get('/', (req, res) => {
    res.send('API WORKING')
})

app.listen(port, () => {
    console.log("Server Started", port)
})