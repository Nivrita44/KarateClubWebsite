import React, { useState } from "react";

const Profile = () => {
  // State to manage user profile data
  const [userData, setUserData] = useState({
    name: "John Doe",
    institute: "Shahjalal University of Science and Technology, Sylhet",
    class: "Advanced Karate",
    gender: "Male",
    belt: "Black Belt",
    certification: "National Karate Championship",
    picture: "https://via.placeholder.com/100",
  });

  // State to control edit mode
  const [isEdit, setIsEdit] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          My Profile
        </h2>

        {/* Profile Picture */}
        <div className="flex justify-center mb-4">
          <img
            src={userData.picture}
            alt="Profile"
            className="w-24 h-24 rounded-full border border-gray-300 shadow-md"
          />
        </div>

        {/* Profile Details */}
        <div className="text-left text-gray-700 space-y-3">
          <p>
            <strong>Name:</strong>{" "}
            {isEdit ? (
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                className="border p-1 rounded-md"
              />
            ) : (
              userData.name
            )}
          </p>
          <p>
            <strong>Institute:</strong> {userData.institute}
          </p>
          <p>
            <strong>Class:</strong>{" "}
            {isEdit ? (
              <input
                type="text"
                name="class"
                value={userData.class}
                onChange={handleChange}
                className="border p-1 rounded-md"
              />
            ) : (
              userData.class
            )}
          </p>
          <p>
            <strong>Gender:</strong> {userData.gender}
          </p>
          <p>
            <strong>Belt:</strong>{" "}
            {isEdit ? (
              <input
                type="text"
                name="belt"
                value={userData.belt}
                onChange={handleChange}
                className="border p-1 rounded-md"
              />
            ) : (
              userData.belt
            )}
          </p>
          <p>
            <strong>Certification:</strong>{" "}
            {isEdit ? (
              <input
                type="text"
                name="certification"
                value={userData.certification}
                onChange={handleChange}
                className="border p-1 rounded-md"
              />
            ) : (
              userData.certification || "None"
            )}
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => setIsEdit(!isEdit)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition shadow-md">
            {isEdit ? "Cancel" : "Edit Profile"}
          </button>

          {isEdit && (
            <button
              onClick={() => setIsEdit(false)}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition shadow-md">
              Save My Info
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Profile;
