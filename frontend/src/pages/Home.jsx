import Header from "../components/Header";
import Position from "../components/Position";
import About from "../components/About";
import ChooseUs from "../components/ChooseUs";
import Instructors from "../components/Instructors";
import Banner from "../components/Banner";

const Home = () => {
  return (
    <main className="px-6 md:px-12">
      <Header />
      <Position />
      <About />
      <ChooseUs />
      <Instructors />
      <Banner />
    </main>
  );
};

export default Home;
