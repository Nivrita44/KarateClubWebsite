import React from "react";
import About from "../components/About";
import Banner from "../components/Banner";
import Header from "../components/Header";
import Instructors from "../components/Instructors";
import Speciality from "../components/Speciality";
const Home = () => {
  return (
    <div>
      <Header />
      <Speciality />
      <About />
      <Instructors />
      <Banner />
    </div>
  );
};

export default Home;
