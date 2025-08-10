/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PendingPage = () => {
  const navigate = useNavigate();

  // Added by mehrab 

  const [studentID, setStudentID] = useState(null);
  useEffect(() => {
    const id = sessionStorage.getItem("studentID");
    
    console.log("🔍 studentID from URL:", id); // Debugging log

    if (!id) {
      navigate("/login"); // Redirect to login if no studentID found
    } else {
      setStudentID(id); // Store studentID for use
    }
  }, [navigate]);

  const handleGoToPayment = () => {
    navigate(`/payment/${studentID}`);
  };



  return (
    <section className="container mx-auto px-6 py-12 text-center">
      <h2 className="text-3xl font-bold mb-4">Application Pending</h2>
      <p className="text-gray-600 mb-6">
        Your admission is pending. Please proceed to the payment section to
        complete your registration.
      </p>

      {studentID && (
        <button
          onClick={handleGoToPayment}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
          Go to Payment
        </button>
      )}
    </section>
  );
};

export default PendingPage;
