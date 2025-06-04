import { Bell, Book, Calendar, Medal, User } from "lucide-react";
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

  const isActive = (path) => location.pathname.startsWith(path);

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
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Notifications</h1>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-primary mb-5">
            Recent Notifications
          </h2>

          {notifications.length === 0 ? (
            <p className="text-gray-600 text-sm">No notifications available.</p>
          ) : (
            <div className="space-y-4">
              {notifications.map((note) => (
                <div
                  key={note.id}
                  className={`p-4 rounded-md border-l-4 ${
                    note.type === "belt"
                      ? "bg-blue-50 border-blue-500"
                      : note.type === "payment"
                      ? "bg-green-50 border-green-500"
                      : "bg-yellow-50 border-yellow-500"
                  }`}>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2 font-medium text-gray-800">
                      {note.type === "belt" ? (
                        <Medal className="w-5 h-5 text-blue-500" />
                      ) : note.type === "payment" ? (
                        <Book className="w-5 h-5 text-green-500" />
                      ) : (
                        <Bell className="w-5 h-5 text-yellow-500" />
                      )}
                      <span>{note.message}</span>
                    </div>
                    <span className="text-xs text-gray-500">
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
