import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinUs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    guardian: "",
    relation: "",
    dateOfBirth: "",
    studentID: "",
    campus: "",
    department: "",
    gender: "",
    bloodGroup: "",
    height: "",
    weight: "",
    currentAddress: "",
    permanentAddress: "",
      phone: "",
    password: "",
    email: "",
    nationalID: "",
    religion: "",
    previousExperience: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    if (image) {
      formDataToSend.append("image", image);
    }

    try {
      const response = await fetch("http://localhost:4000/api/join", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();
      if (response.ok) {
        alert("Student added successfully!");
        navigate("/pending");
      } else {
        alert("Error adding student");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error sending request");
    }
  };


  return (
    <section className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center mb-6">
        SUST Karate Club Admission Form
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        {/* Name & Guardian Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Guardian's Name</label>
            <input
              type="text"
              name="guardian"
              value={formData.guardian}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
        </div>

        {/* Relation & Date of Birth */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block font-medium">Relation with Guardian</label>
            <input
              type="text"
              name="relation"
              value={formData.relation}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
        </div>

        {/* Student ID & Campus */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block font-medium">Student ID</label>
            <input
              type="text"
              name="studentID"
              value={formData.studentID}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Campus</label>
            <select
              name="campus"
              value={formData.campus}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required>
              <option value="">Select</option>
              <option value="SUST">SUST</option>
              <option value="SUST-School">SUST-School</option>
              <option value="Outside">Outside of SUST</option>
            </select>
          </div>
        </div>

        {/* Department & Gender */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block font-medium">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Blood Group & Physical Attributes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block font-medium">Blood Group</label>
            <input
              type="text"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Height (ft)</label>
            <input
              type="text"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Weight (kg)</label>
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
        </div>

        {/* Contact Details */}
        <div className="mt-4">
          <label className="block font-medium">Current Address</label>
          <input
            type="text"
            name="currentAddress"
            value={formData.currentAddress}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mt-4">
          <label className="block font-medium">Permanent Address</label>
          <input
            type="text"
            name="permanentAddress"
            value={formData.permanentAddress}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mt-4">
          <label className="block font-medium">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mt-4">
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mt-4">
          <label className="block font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mt-4">
          <label className="block font-medium">National ID</label>
          <input
            type="text"
            name="nationalID"
            value={formData.nationalID}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Religion & Previous Experience */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block font-medium">Religion</label>
            <input
              type="text"
              name="religion"
              value={formData.religion}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block font-medium">Profile Picture</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Previous Experience</label>
            <textarea
              name="previousExperience"
              value={formData.previousExperience}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              rows="2"></textarea>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 text-center">
          <button
            type="submit"
            className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800">
            Submit Application
          </button>
        </div>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already a member of the club?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => navigate("/login")}>
              Login
            </span>
          </p>
        </div>
      </form>
    </section>
  );
};

export default JoinUs;