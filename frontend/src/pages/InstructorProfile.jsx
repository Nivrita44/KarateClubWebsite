import React, { useState, useEffect } from "react";
import axios from "axios";

const beltOptions = [
  "White Belt",
  "Yellow Belt",
  "Orange Belt",
  "Green Belt",
  "Blue Belt",
  "Purple Belt",
  "Brown Belt",
  "Black Belt",
];

const InstructorProfile = () => {
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");
  const [instructor, setInstructor] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/instructor/${userId}`
        );
        setInstructor(response.data[0]);
        setPreview(response.data[0].profilePic);
      } catch (err) {
        console.error("Failed to load instructor profile.");
      } finally {
        setLoading(false);
      }
    };

    if (userId && role === "instructor") fetchInstructor();
  }, [userId, role]);

  const handleChange = (e) => {
    setInstructor({ ...instructor, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPreview(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append("image", file);

    axios
      .post("http://localhost:4000/api/upload", formData)
      .then((res) => {
        setInstructor({ ...instructor, profilePic: res.data.url });
      })
      .catch(() => alert("Image upload failed."));
  };

  const handleSave = async () => {
    if (password && password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const payload = { ...instructor };
      if (password) payload.password = password;

      await axios.put(
        `http://localhost:4000/api/instructor/${userId}`,
        payload
      );
      setIsEdit(false);
      setPassword("");
      setConfirmPassword("");
      setToast("Profile updated successfully!");

      setTimeout(() => setToast(""), 3000);
    } catch (err) {
      alert("Failed to save profile.");
    }
  };

  if (loading)
    return <div className="text-center py-10 text-gray-600">Loading...</div>;
  if (!instructor)
    return <div className="text-center text-red-600 py-10">Unauthorized</div>;

  return (
    <section className="max-w-4xl mx-auto mt-12 bg-white shadow-xl rounded-lg p-8">
      {toast && (
        <div className="mb-4 text-center bg-green-100 text-green-800 py-2 rounded shadow">
          {toast}
        </div>
      )}

      <div className="flex flex-col items-center gap-4">
        <img
          src={preview}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-red-500 shadow-md"
        />
        {isEdit && (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-sm"
          />
        )}
        <h1 className="text-3xl font-bold text-gray-800">{instructor.name}</h1>
        <p className="text-gray-600">{instructor.position}</p>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setIsEdit(!isEdit)}>
          {isEdit ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      <div className="mt-8 space-y-6">
        {/* Text fields */}
        {[
          { label: "Email", name: "email" },
          { label: "Phone", name: "phone" },
          { label: "Study Background", name: "studyBackground" },
          { label: "Achievements", name: "achievements" },
          { label: "Serving Period", name: "servingPeriod" },
        ].map(({ label, name }) => (
          <div key={name}>
            <label className="block text-sm text-gray-500">{label}</label>
            {isEdit ? (
              <input
                type="text"
                name={name}
                value={instructor[name] || ""}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            ) : (
              <p className="text-gray-800">{instructor[name] || "—"}</p>
            )}
          </div>
        ))}

        {/* Belt dropdown */}
        <div>
          <label className="block text-sm text-gray-500">Belt</label>
          {isEdit ? (
            <select
              name="belt"
              value={instructor.belt || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1">
              <option value="">Select Belt</option>
              {beltOptions.map((belt) => (
                <option key={belt} value={belt}>
                  {belt}
                </option>
              ))}
            </select>
          ) : (
            <p className="text-gray-800">{instructor.belt || "—"}</p>
          )}
        </div>

        {/* Password fields */}
        {isEdit && (
          <>
            <div>
              <label className="block text-sm text-gray-500">
                New Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </>
        )}
      </div>

      {isEdit && (
        <div className="mt-6 text-center">
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
            Save Changes
          </button>
        </div>
      )}
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
