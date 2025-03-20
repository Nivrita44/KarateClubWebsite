import mysql from 'mysql';

const db = mysql.createConnection({
    host: 'localhost', // Example: '192.168.1.100' or domain
    user: 'root',
    password: '',
    database: 'sust_karate_club'
});

const createNewTableQuery = `
    CREATE TABLE IF NOT EXISTS students (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        guardian VARCHAR(255),
        relation VARCHAR(50),
        dateOfBirth DATE,
        studentID VARCHAR(50) UNIQUE NOT NULL,
        campus VARCHAR(255),
        department VARCHAR(255),
        gender ENUM('Male', 'Female', 'Other'),
        bloodGroup ENUM('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'),
        height DECIMAL(5,2),
        weight DECIMAL(5,2),
        currentAddress TEXT,
        permanentAddress TEXT,
        phone VARCHAR(20) UNIQUE,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        nationalID VARCHAR(50) UNIQUE,
        religion VARCHAR(50),
        previousExperience TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
`;

// Execute the query
db.query(createNewTableQuery, (err, result) => {
    if (err) {
        console.error("Error creating table:", err);
    } else {
        console.log("Students table created or already exists.");
    }
});

export default db;