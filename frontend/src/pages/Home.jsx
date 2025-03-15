import React from "react";
import About from "../components/About";
import Banner from "../components/Banner";
import Header from "../components/Header";
import Instructors from "../components/Instructors";
import Position from "../components/Position";
import ChooseUs from "../components/ChooseUs";
const Home = () => {
  return (
    <div>
      <Header />
      <Position />
      <About />
      <ChooseUs />
      <Instructors />
      <Banner />
    </div>
  );
};

export default Home;
