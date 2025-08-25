![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)

# 🥋 SUST Karate Club – Web Management System

A full-stack web application to digitize the operations of the Karate Club at Shahjalal University of Science and Technology (SUST). The system allows students to register, pay fees, track belt progress, and stay updated on events, while instructors can manage students, send notifications, and maintain schedules.

---

## 🚀 Features

### 👤 Student Module
- Online registration with image upload
- Secure login & profile management
- SSLCommerz-based payment processing
- Belt progression tracking & certificate uploads
- Class & exam routines
- Personalized notifications

### 👨‍🏫 Instructor/Admin Module
- Secure login & editable profile
- Manage student belts and certificates
- Send role-based notifications (belt, payment, announcements)
- Post announcements and upcoming exams
- Edit club information (About Us, Mission, Vision)

### 🌐 Public Features
- Home, About, Gallery, and Upcoming Events pages
- Instructor list & Join Us functionality

---

## 🧑‍💻 Tech Stack

| Layer         | Technology                           |
|---------------|--------------------------------------|
| Frontend      | React + Vite + Tailwind CSS          |
| Backend       | Node.js + Express.js                 |
| Database      | MySQL                                |
| File Uploads  | Multer + Cloudinary                  |
| Payments      | SSLCommerz                           |
| Auth & Security | Bcrypt, Role-based routing         |

---

## 🗃️ Project Structure

frontend/
├── src/
│ ├── components/ # UI components
│ ├── pages/ # React pages (routes)
│ ├── context/ # App-level context provider
│ ├── App.jsx # Main route config
│ └── main.jsx # Entry point
├── index.html
├── tailwind.config.js
└── vite.config.js

backend/
├── config/ # DB and cloudinary config
├── middlewares/ # Multer file handler
├── server.js # Express app
└── SUST_Karate_Club.sql # Database schema


---

## ⚙️ Installation

### 1️⃣ Backend Setup

{```bash
cd backend
npm install
npm run server
}


## Create a .env file:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=SUST_Karate_Club

CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx

2️⃣ Frontend Setup
bash
Copy
Edit
cd frontend
npm install
npm run dev

Frontend will run at: http://localhost:5173
Backend runs at: http://localhost:4000

📦 Environment Variables
Set the following in both frontend and backend:

env
# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# MySQL
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=

🔐 Roles & Access
Student

View/update profile

Pay fees

Track belts, receive notifications

Instructor

Manage students (belts & certificates)

Upload certificates

Send notifications

Post exam schedules

Public

Access events, instructors, and registration

<details>
  <summary>📸 View Screenshots</summary>
<img width="2470" height="6894" alt="image" src="https://github.com/user-attachments/assets/62bdef90-fbcd-4b4a-bf11-00868522a6dc" />
<img width="2470" height="2552" alt="image" src="https://github.com/user-attachments/assets/3fc2a844-91de-41a3-b8cd-66fb36a03bb9" />
<img width="2470" height="3148" alt="image" src="https://github.com/user-attachments/assets/bebd6266-55b7-447c-ade6-c568d17ab861" />
<img width="2470" height="4220" alt="image" src="https://github.com/user-attachments/assets/5d5f5037-dadd-4fef-b97c-a4f778d4d1ef" />
<img width="2470" height="2750" alt="image" src="https://github.com/user-attachments/assets/7e9149f7-6010-498d-8f2a-a1955d8de20e" />
</details>

## 🌐 Live Demo
will be uploaded soon!!


📣 Contributors:  
- [Shakera Jannat Ema](https://github.com/shakeraema)  
- [Nivrita Munib](https://github.com/Nivrita44)  


🪪 License
SUST © 2025 [Nivrita-Shakera / SUST]
