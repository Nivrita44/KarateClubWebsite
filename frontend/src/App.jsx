import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import InstructorProfile from "./pages/InstructorProfile";
import Instructors from "./pages/Instructors";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/instructors" element={<Instructors />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-profile" element={<Profile />} />
        <Route
          path="/instructor-profile/:docId"
          element={<InstructorProfile />}
        />
      </Routes>
    </div>
  );
};

export default App;
