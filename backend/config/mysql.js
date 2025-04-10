import mysql from "mysql2/promise";

// Initialize the database connection
const db =  await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ema234", // Make sure this is correct
  database: "demo_import",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


console.log("Connected to MySQL database.");

// Define the table creation query
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

// Execute the query correctly without callback
try {
 const [results] =  await db.query(createNewTableQuery);
  console.log("Students table created or already exists.");
  console.log("Results:", results);
} catch (error) {
  console.error("Error creating table:", error);
}

// Export the database connection
export default db;