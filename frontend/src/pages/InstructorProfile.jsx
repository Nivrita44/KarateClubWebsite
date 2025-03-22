import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const InstructorProfile = () => {
  const { ins_id } = useParams(); // Extract ins_id from the URL
  const [instructor, setInstructor] = useState(null); // Store instructor data
  const [loading, setLoading] = useState(true); // Loading state for the profile
  const [error, setError] = useState(null); // Error handling state

  useEffect(() => {
    if (!ins_id) {
      setError("Invalid instructor ID.");
      setLoading(false);
      return;
    }

    const fetchInstructorData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/instructor/${ins_id}`
        );
        setInstructor(response.data); // Set the fetched data to state
      } catch (err) {
        setError("Failed to fetch instructor data.");
      } finally {
        setLoading(false);
      }
    };

    fetchInstructorData();
  }, [ins_id]); // Only re-run when ins_id changes

  if (loading) {
    return (
      <div className="text-center text-lg font-semibold text-gray-600">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-lg font-semibold text-red-500">
        {error}
      </div>
    );
  }

  if (!instructor) {
    return (
      <div className="text-center text-lg font-semibold text-gray-600">
        Instructor not found.
      </div>
    );
  }

  return (
    <section className="container mx-auto px-6 py-12 bg-white rounded-lg shadow-md">
      {/* Instructor Info */}
      <div className="text-center mb-8">
        <img
          src={instructor.profilePic}
          alt="Instructor"
          className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-indigo-500 shadow-lg"
        />
        <h2 className="text-4xl font-bold text-indigo-700">
          {instructor.name}
        </h2>
        <p className="text-xl text-gray-600">{instructor.position}</p>
        <p className="text-gray-500 mt-4 text-lg leading-relaxed max-w-3xl mx-auto">
          {instructor.about || "No description available."}
        </p>
      </div>

      {/* Contact Info */}
      <div className="text-center mt-6">
        <h3 className="text-xl font-semibold text-indigo-600">Contact Info</h3>
        <p className="text-lg text-gray-600">Email: {instructor.email}</p>
        <p className="text-lg text-gray-600">Phone: {instructor.phone}</p>
        <p className="text-lg text-gray-600">
          {instructor.address_line1 && instructor.address_line2 ? (
            <>
              Address: {instructor.address_line1}, {instructor.address_line2}
            </>
          ) : (
            "Address not provided."
          )}
        </p>
      </div>

      {/* Additional Info */}
      <div className="text-center mt-6">
        <h3 className="text-xl font-semibold text-indigo-600">
          Additional Information
        </h3>
        <p className="text-lg text-gray-600">
          Experience: {instructor.experience || "No experience data available."}
        </p>
        <p className="text-lg text-gray-600">
          Fees: ${instructor.fees || "Not available"}
        </p>
      </div>
    </section>
  );
};

export default InstructorProfile;


//comment out kore rakhsi pore testing e lagte pare

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
