import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import BeltInfo from "./pages/BeltInfo";
import ClassRoutine from "./pages/ClassRoutine";
import Contact from "./pages/Contact";
import ExamRoutine from "./pages/ExamRoutine";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import InstructorProfile from "./pages/InstructorProfile";
import Instructors from "./pages/Instructors";
import JoinUsPage from "./pages/JoinUs";
import Login from "./pages/Login";
import Notifications from "./pages/Notification";
import PaymentPage from "./pages/PaymentPage";
import PendingPage from "./pages/PendingPage";
import Profile from "./pages/Profile";
import SuccessPage from "./pages/SuccessPage";
import UpcomingEvents from "./pages/UpcomingEvents";

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/instructors" element={<Instructors />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/join-us" element={<JoinUsPage />} />
        <Route path="/pending" element={<PendingPage />} />
        <Route path="/payment/:id" element={<PaymentPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/events/upcoming" element={<UpcomingEvents />} />
        <Route path="/my-profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/class-routine" element={<ClassRoutine />} />
        <Route path="/exam-routine" element={<ExamRoutine />} />
        <Route path="/belt-info" element={<BeltInfo />} />
        <Route
          path="/instructor-profile/:ins_id"
          element={<InstructorProfile />}
        />
        <Route path="/success/:tran_id" element={<SuccessPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
