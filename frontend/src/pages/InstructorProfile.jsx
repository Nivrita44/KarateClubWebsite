import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const InstructorProfile = () => {
//   const [instructor, setInstructor] = useState({
//     name: "John Smith",
//     position: "Chief Instructor",
//     bio: "I have been teaching Karate for 15 years and have trained many national-level champions.",
//     profilePic: "https://via.placeholder.com/100", // Profile picture of the instructor
//   });

//   const [students, setStudents] = useState([
//     {
//       id: 1,
//       name: "Alice Johnson",
//       belt: "White Belt",
//       certification: "Beginner Karate Certificate",
//       profilePic: "https://via.placeholder.com/100",
//     },
//     {
//       id: 2,
//       name: "Bob Miller",
//       belt: "Yellow Belt",
//       certification: "Intermediate Karate Certificate",
//       profilePic: "https://via.placeholder.com/100",
//     },
//   ]); // Replace with dynamic data, fetched from API or context

//   const navigate = useNavigate();

//   useEffect(() => {
//     // You could fetch instructor and student data here from the backend
//     // Example: setInstructor(response.data.instructor);
//     // Example: setStudents(response.data.students);
//   }, []);

//   const handleStudentClick = (studentId) => {
//     // Navigate to student profile page
//     navigate(`/student-profile/${studentId}`);
//   };

//   return (
//     <section className="container mx-auto px-6 py-12">
//       {/* Instructor Details */}
//       <div className="text-center mb-8">
//         <img
//           src={instructor.profilePic}
//           alt="Instructor"
//           className="w-24 h-24 rounded-full mx-auto mb-4"
//         />
//         <h2 className="text-3xl font-bold">{instructor.name}</h2>
//         <p className="text-lg text-gray-600">{instructor.position}</p>
//         <p className="text-gray-500 mt-4">{instructor.bio}</p>
//       </div>

//       {/* Student List */}
//       <h3 className="text-2xl font-bold text-center mb-6">Manage Students</h3>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {students.map((student) => (
//           <div
//             key={student.id}
//             className="bg-white shadow-lg rounded-lg p-6 cursor-pointer hover:scale-105 transition-all"
//             onClick={() => handleStudentClick(student.id)}>
//             <div className="flex items-center justify-center">
//               <img
//                 src={student.profilePic}
//                 alt="Student"
//                 className="w-16 h-16 rounded-full"
//               />
//             </div>
//             <h4 className="text-lg font-semibold text-center mt-4">
//               {student.name}
//             </h4>
//             <p className="text-gray-600 text-center">{student.belt}</p>
//             <p className="text-sm text-gray-500 text-center">
//               {student.certification}
//             </p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
};

export default InstructorProfile;
