import axios from "axios";
import { Bell, Book, Calendar, Medal, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const userId = localStorage.getItem("userId");

  const location = useLocation();
  const isActive = (path) => location.pathname.startsWith(path);

  const fetchUser = () => {
    axios
      .get(`http://localhost:4000/get-member/${userId}`)
      .then((res) => setUserData(res.data))
      .catch((err) => console.error("Failed to fetch profile", err));
  };

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Saving profile with:", userData);
    axios
      .put(`http://localhost:4000/update-member/${userId}`, {
        email: userData.email,
        phone: userData.phone,
      })
      .then((res) => {
        console.log("Profile updated successfully.");
        setIsEdit(false); // Exit edit mode
        fetchUser(); // Refetch user data to update the profile
      })
      .catch((err) => {
        console.error("Failed to update profile:", err);
        alert("Error updating profile.");
      });
  };

  if (!userData) return <div className="text-center p-10">Loading...</div>;

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-red-600">Karate Academy</h2>
        </div>
        <nav className="flex flex-col space-y-2 px-4">
          <Link
            to="/my-profile"
            className={`flex items-center space-x-2 p-3 rounded-md ${
              isActive("/profile")
                ? "bg-red-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            <User className="w-5 h-5" />
            <span>My Profile</span>
          </Link>
          <Link
            to="/notifications"
            className={`flex items-center space-x-2 p-3 rounded-md ${
              isActive("/notifications")
                ? "bg-red-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Bell className="w-5 h-5" />
            <span>Notifications</span>
          </Link>
          <Link
            to="/class-routine"
            className={`flex items-center space-x-2 p-3 rounded-md ${
              isActive("/class-routine")
                ? "bg-red-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span>Class Routine</span>
          </Link>
          <Link
            to="/exam-routine"
            className={`flex items-center space-x-2 p-3 rounded-md ${
              isActive("/exam-routine")
                ? "bg-red-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Book className="w-5 h-5" />
            <span>Exam Routine</span>
          </Link>
          <Link
            to="/belt-info"
            className={`flex items-center space-x-2 p-3 rounded-md ${
              isActive("/belt-info")
                ? "bg-red-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Medal className="w-5 h-5" />
            <span>Belt Info</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <div className="bg-gradient-to-r from-red-500 to-yellow-400 rounded-t-2xl h-40 relative">
          <div className="absolute top-24 left-1/2 transform -translate-x-1/2">
            <img
              src={userData.imageUrl || assets.profile_pic}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white shadow-md"
            />
          </div>
        </div>

        <div className="bg-white rounded-b-2xl pt-20 pb-10 shadow-md text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            {userData.name}
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto text-left">
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="text-lg font-medium">{userData.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              {isEdit ? (
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  className="border rounded px-2 py-1 w-full"
                />
              ) : (
                <p className="text-lg font-medium">{userData.email}</p>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              {isEdit ? (
                <input
                  type="text"
                  name="phone"
                  value={userData.phone || ""}
                  onChange={handleChange}
                  className="border rounded px-2 py-1 w-full"
                />
              ) : (
                <p className="text-lg font-medium">{userData.phone || "N/A"}</p>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-500">Campus</p>
              <p className="text-lg font-medium">{userData.campus}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Department</p>
              <p className="text-lg font-medium">{userData.department}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Gender</p>
              <p className="text-lg font-medium">{userData.gender}</p>
            </div>
          </div>

          <div className="mt-8 space-x-3">
            {isEdit ? (
              <>
                <button
                  className="px-5 py-2 bg-red-600 text-white rounded-md shadow"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className="px-5 py-2 bg-gray-300 rounded-md shadow"
                  onClick={() => setIsEdit(false)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                className="px-5 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                onClick={() => setIsEdit(true)}
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
