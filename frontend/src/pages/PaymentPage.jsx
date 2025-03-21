/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PaymentPage = () => {
  const { id } = useParams(); // Get studentID from the URL
  const [student, setStudent] = useState(null); // State to store student data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [campus, setCampus] = useState(""); // State to store selected campus
  const [amount, setAmount] = useState(1000); // Default amount
  const navigate = useNavigate(); // Initialize navigate function

  console.log("🔍 studentID from URL:", id); // Debugging log

  // Fetch student data when studentID changes
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/get-member/${id}`
        );
        setStudent(response.data); // Set student data from the response
      } catch (error) {
        console.error("❌ Error fetching student data:", error);
        setError("Failed to fetch student data. Please try again later.");
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };

    if (id) {
      fetchStudentData(); // Fetch data only if studentID is available
    } else {
      setError("Invalid student ID."); // Handle case where studentID is missing
      setLoading(false);
    }
  }, [id]);

  // Handle campus selection and update amount
  const handleCampusChange = (e) => {
    const selectedCampus = e.target.value;
    setCampus(selectedCampus); // Update selected campus
    // Update the amount based on campus
    if (selectedCampus === "Outside") {
      setAmount(1500);
    } else {
      setAmount(1000);
    }
  };

  // Handle payment button click
  const handlePayment = async () => {
    if (!student) {
      alert("Invalid student details. Please try again.");
      return;
    }

    try {
      // Sending payment request to the backend
      const response = await axios.post(
        "http://localhost:4000/sslcommerz/init",
        {
          name: student.name, // Student name
          // studentID: student.studentID, // Student ID
          // department: student.department, // Department
          email: student.email, // Email
          amount, // Payment amount
          currency: "BDT",
        }
      );

      if (response.data.url) {
        // Redirecting user to SSLCommerz Payment Gateway
        window.location.href = response.data.url;
      } else {
        alert("Failed to initiate payment. Please try again.");
      }
    } catch (error) {
      console.error("❌ Error initiating payment:", error);
      alert("Error initiating payment: " + error.message);
    }
  };

  // Display loading state while fetching data
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
        <p className="ml-4 text-gray-700">Loading...</p>
      </div>
    );
  }

  // Display error message if there's an error
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  // Display message if no student data is found
  if (!student) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          Student not found.
        </div>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="bg-blue-700 text-white py-4 px-6">
            <h2 className="text-3xl font-bold text-center">Payment Section</h2>
            <p className="text-center mt-2">
              Please make the payment to finalize your admission.
            </p>
          </div>

          {/* Student Details Section */}
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">Student Details</h3>
            <div className="space-y-6">
              {/* Name */}
              <div className="flex justify-between items-center text-lg">
                <span className="font-medium">Name:</span>
                <span className="text-gray-700">{student.name}</span>
              </div>

              {/* Student ID */}
              <div className="flex justify-between items-center text-lg">
                <span className="font-medium">Student ID:</span>
                <span className="text-gray-700">{student.studentID}</span>
              </div>

              {/* Department */}
              <div className="flex justify-between items-center text-lg">
                <span className="font-medium">Department:</span>
                <span className="text-gray-700">{student.department}</span>
              </div>

              {/* Email */}
              <div className="flex justify-between items-center text-lg">
                <span className="font-medium">Email:</span>
                <span className="text-gray-700">{student.email}</span>
              </div>

              {/* Campus */}
              <div className="flex justify-between items-center text-lg">
                <label className="font-medium">Campus:</label>
                <select
                  name="campus"
                  value={campus}
                  onChange={handleCampusChange}
                  className="w-full border p-2 rounded"
                  required
                >
                  <option value="">Select</option>
                  <option value="SUST">SUST</option>
                  <option value="SUST-School">SUST-School</option>
                  <option value="Outside">Outside of SUST</option>
                </select>
              </div>

              {/* Amount */}
              <div className="flex justify-between items-center text-lg">
                <span className="font-medium">Amount:</span>
                <span className="text-gray-700">{amount} BDT</span>
              </div>
            </div>
          </div>

          {/* Payment Button Section */}
          <div className="bg-gray-50 px-6 py-4">
            <button
              onClick={handlePayment}
              className="w-full bg-blue-400 text-white py-3 rounded-lg hover:bg-blue-800 transition duration-300"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentPage;
