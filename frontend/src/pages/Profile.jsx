import axios from "axios";
import { Bell, BookOpen, Calendar, Medal, UserCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedTab, setSelectedTab] = useState("profile");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:4000/get-member/${userId}`)
        .then((res) => setUserData(res.data))
        .catch((err) => console.error("Failed to fetch profile", err));
    }
  }, [userId]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  if (!userData) return <div className="text-center p-10">Loading...</div>;

  const SidebarItem = ({ tab, label, Icon }) => (
    <li
      onClick={() => setSelectedTab(tab)}
      className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg transition text-base hover:bg-blue-100 ${
        selectedTab === tab
          ? "bg-blue-100 text-blue-600 font-semibold"
          : "text-gray-800"
      }`}
    >
      <Icon size={20} />
      {label}
    </li>
  );

  const renderContent = () => {
    switch (selectedTab) {
      case "profile":
        return (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-40 bg-gradient-to-r from-blue-500 to-indigo-500 relative">
              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                <img
                  src={userData.imageUrl || assets.profile_pic}
                  alt="Profile"
                  className="w-36 h-36 border-4 border-white object-cover shadow-lg"
                />
              </div>
            </div>

            <div className="mt-20 px-8 pb-8 text-center text-gray-800">
              <h2 className="text-3xl font-bold mb-4">{userData.name}</h2>

              <div className="text-left space-y-4 text-lg max-w-md mx-auto">
                <p>
                  <strong>Institute:</strong> {userData.campus}
                </p>
                <p>
                  <strong>Department:</strong> {userData.department}
                </p>
                <p>
                  <strong>Gender:</strong> {userData.gender}
                </p>
                <p>
                  <strong>Email:</strong> {userData.email}
                </p>
              </div>

              <div className="mt-6 flex justify-center gap-4">
                <button
                  onClick={() => setIsEdit(!isEdit)}
                  className="bg-blue-600 text-white px-6 py-2 text-base rounded-lg hover:bg-blue-700 transition shadow-md"
                >
                  {isEdit ? "Cancel" : "Edit Profile"}
                </button>
                {isEdit && (
                  <button
                    onClick={() => setIsEdit(false)}
                    className="bg-green-600 text-white px-6 py-2 text-base rounded-lg hover:bg-green-700 transition shadow-md"
                  >
                    Save My Info
                  </button>
                )}
              </div>
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
            <ul className="list-disc pl-5 space-y-2 text-lg text-gray-700">
              <li>Next belt exam on 25th April.</li>
              <li>Class timing changed for Group B: Now 4-5 PM.</li>
              <li>Submit your ID card photo by Friday.</li>
            </ul>
          </div>
        );

      case "classRoutine":
        return (
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Class Routine</h2>
            <table className="w-full text-left text-lg text-gray-700 border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 border">Day</th>
                  <th className="p-3 border">Time</th>
                  <th className="p-3 border">Instructor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border">Monday</td>
                  <td className="p-3 border">4:00 PM - 5:00 PM</td>
                  <td className="p-3 border">Sensei John</td>
                </tr>
                <tr>
                  <td className="p-3 border">Wednesday</td>
                  <td className="p-3 border">4:00 PM - 5:00 PM</td>
                  <td className="p-3 border">Sensei Maria</td>
                </tr>
              </tbody>
            </table>
          </div>
        );

      case "examRoutine":
        return (
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Exam Routine</h2>
            <table className="w-full text-left text-lg text-gray-700 border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 border">Date</th>
                  <th className="p-3 border">Time</th>
                  <th className="p-3 border">Belt Level</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border">April 25</td>
                  <td className="p-3 border">10:00 AM</td>
                  <td className="p-3 border">Yellow Belt</td>
                </tr>
                <tr>
                  <td className="p-3 border">May 10</td>
                  <td className="p-3 border">2:00 PM</td>
                  <td className="p-3 border">Green Belt</td>
                </tr>
              </tbody>
            </table>
          </div>
        );

      case "beltInfo":
        return (
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Belt Information</h2>
            <p className="text-gray-700 text-lg">
              <strong>Current Belt:</strong> {userData.belt || "White"}
            </p>
            <p className="text-gray-700 text-lg mt-2">
              <strong>Next Goal:</strong> Yellow Belt (expected in May)
            </p>
          </div>
        );

      default:
        return <p>Invalid tab.</p>;
    }
  };

  return (
    <section className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 hidden md:block">
        <h2 className="text-2xl font-bold mb-8 text-center">Karate Panel</h2>
        <ul className="space-y-3">
          <SidebarItem tab="profile" label="My Profile" Icon={UserCircle} />
          <SidebarItem tab="notifications" label="Notifications" Icon={Bell} />
          <SidebarItem
            tab="classRoutine"
            label="Class Routine"
            Icon={Calendar}
          />
          <SidebarItem tab="examRoutine" label="Exam Routine" Icon={BookOpen} />
          <SidebarItem tab="beltInfo" label="Belt Info" Icon={Medal} />
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">{renderContent()}</main>
    </section>
  );
};

export default Profile;
