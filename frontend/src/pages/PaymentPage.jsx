import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();

  const handlePayment = () => {
    alert("Payment Successful! You will receive your Membership ID soon.");
    navigate("/login"); // Redirect to login after payment
  };

  return (
    <section className="container mx-auto px-6 py-12 text-center">
      <h2 className="text-3xl font-bold mb-4">Payment Section</h2>
      <p className="text-gray-600 mb-6">
        Please make the payment to finalize your admission.
      </p>

      <button
        onClick={handlePayment}
        className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800">
        Pay Now
      </button>
    </section>
  );
};

export default PaymentPage;