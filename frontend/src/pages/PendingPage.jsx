import React from "react";
import { useNavigate } from "react-router-dom";

const PendingPage = () => {
  const navigate = useNavigate();

  return (
    <section className="container mx-auto px-6 py-12 text-center">
      <h2 className="text-3xl font-bold mb-4">Application Pending</h2>
      <p className="text-gray-600 mb-6">
        Your admission is pending. Please proceed to the payment section to
        complete your registration.
      </p>

      <button
        onClick={() => navigate("/payment")}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
        Go to Payment
      </button>
    </section>
  );
};

export default PendingPage;
