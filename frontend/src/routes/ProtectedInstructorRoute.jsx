import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedInstructorRoute = () => {
  const role = localStorage.getItem("role");

  if (role === "instructor") {
    return <Outlet />; // ✅ Allow access
  } else {
    return <Navigate to="/not-authorized" replace />; // 🚫 Redirect
  }
};

export default ProtectedInstructorRoute;
