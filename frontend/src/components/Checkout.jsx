// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// const Checkout = () => {
//   const { id } = useParams(); // Get the student ID from the URL
//   const [userDetails, setUserDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate(); // Initialize navigate function

//   // Fetch user data when the component mounts or studentID changes
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:4000/get-member/${id}`
//         );
//         setUserDetails(response.data); // Set user details from the response
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//         setError(
//           "There was an issue fetching the data. Please try again later."
//         );
//       } finally {
//         setLoading(false); // Stop loading regardless of success or failure
//       }
//     };

//     fetchUserData();
//   }, [studentID]);

//   // Display loading state while fetching data
//   if (loading) {
//     return <div className="text-center py-12">Loading...</div>;
//   }

//   // Display error message if there's an error
//   if (error) {
//     return <div className="text-center py-12 text-red-600">{error}</div>;
//   }

//   // Display message if no user details are found
//   if (!userDetails) {
//     return <div className="text-center py-12">User not found.</div>;
//   }

//   return (
//     <section className="container mx-auto px-6 py-12">
//       <h2 className="text-3xl font-bold text-center mb-6">Checkout</h2>
//       <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
//         <h3 className="text-xl font-semibold mb-4">Basic Details</h3>
//         <p>
//           <strong>Name:</strong> {userDetails.name}
//         </p>
//         <p>
//           <strong>Student ID:</strong> {userDetails.studentID}
//         </p>
//         <p>
//           <strong>Department:</strong> {userDetails.department}
//         </p>
//         <p>
//           <strong>Gender:</strong> {userDetails.gender}
//         </p>
//         <p>
//           <strong>Blood Group:</strong> {userDetails.bloodGroup}
//         </p>
//         <p>
//           <strong>Phone:</strong> {userDetails.phone}
//         </p>
//         <p>
//           <strong>Email:</strong> {userDetails.email}
//         </p>

//         {/* Payment Gateway Integration (Placeholder) */}
//         <div className="mt-6 text-center">
//           <button
//             className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800"
//             onClick={() => {
//               alert("Proceeding to payment gateway...");
//               // Add payment gateway integration logic here
//             }}
//           >
//             Proceed to Payment
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Checkout;
