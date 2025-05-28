import { Bell, Book, Calendar, Circle, Medal, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Notifications() {
  const location = useLocation();
  const userId = localStorage.getItem("userId");

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:4000/api/notifications?studentId=${userId}`)
        .then((res) => setNotifications(res.data))
        .catch((err) => console.error("Error fetching notifications", err));
    }
  }, [userId]);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/notifications?type=announcement`)
      .then((res) => setNotifications(res.data))
      .catch((err) => console.error("Fetch failed:", err));
  }, []);
  

  const isActive = (path) => location.pathname.startsWith(path);

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
            }`}>
            <User className="w-5 h-5" />
            <span>My Profile</span>
          </Link>
          <Link
            to="/notifications"
            className={`flex items-center space-x-2 p-3 rounded-md ${
              isActive("/notifications")
                ? "bg-red-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}>
            <Bell className="w-5 h-5" />
            <span>Notifications</span>
          </Link>
          <Link
            to="/class-routine"
            className={`flex items-center space-x-2 p-3 rounded-md ${
              isActive("/class-routine")
                ? "bg-red-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}>
            <Calendar className="w-5 h-5" />
            <span>Class Routine</span>
          </Link>
          <Link
            to="/exam-routine"
            className={`flex items-center space-x-2 p-3 rounded-md ${
              isActive("/exam-routine")
                ? "bg-red-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}>
            <Book className="w-5 h-5" />
            <span>Exam Routine</span>
          </Link>
          <Link
            to="/belt-info"
            className={`flex items-center space-x-2 p-3 rounded-md ${
              isActive("/belt-info")
                ? "bg-red-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}>
            <Medal className="w-5 h-5" />
            <span>Belt Info</span>
          </Link>
        </nav>
      </aside>

      {/* Notifications Content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Notifications</h1>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Notifications</h2>

          {notifications.length === 0 ? (
            <p className="text-gray-600">No notifications available.</p>
          ) : (
            <div className="space-y-4">
              {notifications.map((note) => (
                <div
                  key={note.id}
                  className={`p-4 rounded-md ${
                    note.type === "belt"
                      ? "bg-blue-50 border-l-4 border-blue-500"
                      : note.type === "payment"
                      ? "bg-green-50 border-l-4 border-green-500"
                      : "bg-yellow-50 border-l-4 border-yellow-500"
                  }`}>
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center space-x-2 font-semibold">
                      {note.type === "belt" ? (
                        <Medal className="w-4 h-4" />
                      ) : note.type === "payment" ? (
                        <Book className="w-4 h-4" />
                      ) : (
                        <Bell className="w-4 h-4" />
                      )}
                      <span>{note.message}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(note.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
