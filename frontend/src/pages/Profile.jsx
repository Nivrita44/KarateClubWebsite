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
    if (userId) fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    axios
      .put(`http://localhost:4000/update-member/${userId}`, {
        email: userData.email,
        phone: userData.phone,
      })
      .then(() => {
        setIsEdit(false);
        fetchUser();
      })
      .catch((err) => {
        console.error("Failed to update profile:", err);
        alert("Error updating profile.");
      });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `http://localhost:4000/upload-profile-image/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.data.imageUrl) {
        setUserData((prev) => ({ ...prev, imageUrl: res.data.imageUrl }));
      }
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Failed to upload profile picture.");
    }
  };

  if (!userData) return <div className="text-center py-16">Loading...</div>;

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h2 className="text-2xl font-extrabold text-primary">
            Karate SUST
          </h2>
        </div>
        <nav className="flex flex-col space-y-2 px-4">
          {[
            { path: "/my-profile", label: "My Profile", icon: User },
            { path: "/notifications", label: "Notifications", icon: Bell },
            { path: "/class-routine", label: "Class Routine", icon: Calendar },
            { path: "/exam-routine", label: "Exam Routine", icon: Book },
            { path: "/belt-info", label: "Belt Info", icon: Medal },
          ].map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-2 p-3 rounded-md transition ${
                isActive(path)
                  ? "bg-primary text-accent"
                  : "text-gray-700 hover:bg-gray-200"
              }`}>
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        {/* Banner */}
        <div className="bg-gradient-to-r from-primary to-accent rounded-t-2xl h-52 relative">
          <div className="absolute top-28 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
            <img
              src={userData.imageUrl || assets.profile_pic}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white shadow-md"
            />
            <label className="mt-2 text-sm text-blue-600 cursor-pointer hover:underline">
              Change Profile Picture
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Info */}
        <div className="bg-white rounded-b-2xl pt-36 pb-12 px-6 shadow text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-10">
            {userData.name}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6 max-w-4xl mx-auto text-left mb-10">
            {[
              { label: "Full Name", value: userData.name },
              {
                label: "Email",
                value: isEdit ? (
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  />
                ) : (
                  userData.email
                ),
              },
              {
                label: "Phone",
                value: isEdit ? (
                  <input
                    type="text"
                    name="phone"
                    value={userData.phone || ""}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  />
                ) : (
                  userData.phone || "N/A"
                ),
              },
              { label: "Campus", value: userData.campus },
              { label: "Department", value: userData.department },
              { label: "Gender", value: userData.gender },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-sm text-gray-500 mb-1">{label}</p>
                <p className="text-lg font-medium">{value}</p>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4">
            {isEdit ? (
              <>
                <button
                  className="px-6 py-2 bg-primary text-accent rounded-md shadow hover:bg-accent hover:text-primary transition"
                  onClick={handleSave}>
                  Save
                </button>
                <button
                  className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md shadow hover:bg-gray-400"
                  onClick={() => setIsEdit(false)}>
                  Cancel
                </button>
              </>
            ) : (
              <button
                className="px-6 py-2 border border-primary text-primary rounded-md shadow-sm hover:bg-primary hover:text-accent transition"
                onClick={() => setIsEdit(true)}>
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
