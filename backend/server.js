import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import db from './config/mysql.js';
import { cloudinaryConfig, uploader } from './config/cloudinaryConfig.js'; // Cloudinary configuration
import { multerUploads } from './middlewares/multer.js'; // Multer middleware for image upload



//app config
const app = express()
const port = process.env.PORT || 4000

//middlewares
app.use(express.json())
app.use(cors())


app.post("/api/join", multerUploads, (req, res) => {
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
  const imageFile = req.file; // This will be the image uploaded by the user

  if (imageFile) {
    // Upload the image to Cloudinary
    uploader
      .upload_stream(
        { resource_type: "auto" }, // Auto-detect the file type (image, video, etc.)
        async (error, result) => {
          if (error) {
            console.log("Error uploading image to Cloudinary:", error);
            return res
              .status(500)
              .json({ message: "Cloudinary Upload Error", error });
          }

          const imageUrl = result.secure_url; // The image URL returned by Cloudinary

          // Now insert the data into MySQL, including the image URL
          const sql = `
          INSERT INTO students 
          (name, guardian, relation, dateOfBirth, studentID, campus, department, gender, bloodGroup, height, weight,
          currentAddress, permanentAddress, phone, password, email, nationalID, religion, previousExperience, imageUrl) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

          db.query(
            sql,
            [
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
              imageUrl,
            ],
            (err, result) => {
              if (err) {
                console.error("❌ Database Insert Error:", err);
                return res
                  .status(500)
                  .json({ message: "Database Error", error: err });
              }
              res
                .status(201)
                .json({
                  message: "Student added successfully!",
                  studentID: result.insertId,
                });
            }
          );
        }
      )
      .end(imageFile.buffer); // End the stream and send the file buffer to Cloudinary
  } else {
    // No image uploaded, proceed without image URL
    const sql = `
      INSERT INTO students 
      (name, guardian, relation, dateOfBirth, studentID, campus, department, gender, bloodGroup, height, weight,
      currentAddress, permanentAddress, phone, password, email, nationalID, religion, previousExperience) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
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
      ],
      (err, result) => {
        if (err) {
          console.error("❌ Database Insert Error:", err);
          return res
            .status(500)
            .json({ message: "Database Error", error: err });
        }
        res
          .status(201)
          .json({
            message: "Student added successfully!",
            studentID: result.insertId,
          });
      }
    );
  }
});




//api endpoints
app.get('/', (req, res) => {
    res.send('API WORKING')
})

app.listen(port, () => {
    console.log("Server Started", port)
})