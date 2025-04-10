import React from 'react'
import Login from './Login';
import { useNavigate } from 'react-router-dom';

const Success = ( {tran_id}) => {
    const navigate = useNavigate(); // Initialize navigate function
        const handleGoToLogin = () => {
        navigate(`/login`); // Redirect to login page
        };
    
    const transId= tran_id;

  return (
    <section className="container mx-auto px-6 py-12 text-center">
      <h2 className="text-3xl font-bold mb-4">Payment Successful</h2>
      <p className="text-gray-600 mb-6">
        Your admission is successful. Your transaction id is `${transId}`.
        Please go to the login page.
      </p>

      <button
        onClick={handleGoToLogin}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
        Go to Login
      </button>
    </section>
  );
};

export default Success