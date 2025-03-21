import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const InstructorProfile = () => {
  const { docId } = useParams(); // Get the instructor ID from the URL
  const [instructor, setInstructor] = useState(null); // Store instructor data
  const [loading, setLoading] = useState(true); // Loading state for the profile
  const [error, setError] = useState(null); // Error handling state

  // Fetch instructor data when the component mounts or docId changes
  useEffect(() => {
    const fetchInstructorData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/instructor/${docId}`
        );
        setInstructor(response.data); // Set the fetched data to state
      } catch (err) {
        setError("Failed to fetch instructor data.");
      } finally {
        setLoading(false);
      }
    };

    if (docId) {
      fetchInstructorData(); // Fetch data if docId is available
    } else {
      setError("Invalid instructor ID.");
      setLoading(false);
    }
  }, [docId]);

  // Show loading state or error message
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!instructor) {
    return <div>Instructor not found.</div>;
  }

  return (
    <section className="container mx-auto px-6 py-12">
      {/* Instructor Info */}
      <div className="text-center mb-8">
        <img
          src={instructor.profilePic}
          alt="Instructor"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h2 className="text-3xl font-bold">{instructor.name}</h2>
        <p className="text-lg text-gray-600">{instructor.position}</p>
        <p className="text-gray-500 mt-4">{instructor.studyBackground}</p>
        <p className="text-gray-500 mt-4">
          Serving Period: {instructor.servingPeriod}
        </p>
      </div>

      {/* Contact and Achievements */}
      <div className="text-center mt-6">
        <h3 className="text-xl font-semibold">Contact Info</h3>
        <p className="text-lg text-gray-600">Email: {instructor.email}</p>
        <p className="text-lg text-gray-600">Phone: {instructor.phone}</p>
      </div>

      <div className="text-center mt-6">
        <h3 className="text-xl font-semibold">Achievements</h3>
        <ul className="list-disc text-lg text-gray-600 mt-2">
          {instructor.achievements.map((achievement, index) => (
            <li key={index}>{achievement}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default InstructorProfile;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const InstructorProfile = () => {
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
// };

// export default InstructorProfile;
