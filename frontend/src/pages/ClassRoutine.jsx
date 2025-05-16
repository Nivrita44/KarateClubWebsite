import {
  Bell,
  Book,
  Calendar,
  CalendarDays,
  Clock,
  MapPin,
  Medal,
  User,
  UserRound,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function ClassRoutine() {
  const schedule = [
    {
      day: "Monday",
      time: "5:00 PM",
      duration: "1 hour",
      instructor: "Sensei Williams",
      location: "Main Dojo - Room 1",
    },
    {
      day: "Wednesday",
      time: "5:00 PM",
      duration: "1 hour",
      instructor: "Sensei Williams",
      location: "Main Dojo - Room 1",
    },
    {
      day: "Friday",
      time: "6:00 PM",
      duration: "1.5 hours",
      instructor: "Sensei Rodriguez",
      location: "Main Dojo - Room 2",
    },
    {
      day: "Saturday",
      time: "10:00 AM",
      duration: "2 hours",
      instructor: "Sensei Chen",
      location: "Main Dojo - Room 1",
    },
  ];
  const location = useLocation();

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
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Class Routine</h1>

        <div className="bg-white shadow rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <CalendarDays className="w-6 h-6 text-red-600" />
            <div>
              <h2 className="text-xl font-semibold">Weekly Schedule</h2>
              <p className="text-sm text-gray-500">
                Your regular training sessions
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-t border-gray-200">
              <thead>
                <tr className="text-gray-600 font-medium border-b border-gray-200">
                  <th className="py-2 px-4">Day</th>
                  <th className="py-2 px-4">Time</th>
                  <th className="py-2 px-4">Duration</th>
                  <th className="py-2 px-4">Instructor</th>
                  <th className="py-2 px-4">Location</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-2 px-4 font-medium">{item.day}</td>
                    <td className="py-2 px-4 flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>{item.time}</span>
                    </td>
                    <td className="py-2 px-4">{item.duration}</td>
                    <td className="py-2 px-4">
                      <div className="inline-flex items-center space-x-1">
                        <UserRound className="w-4 h-4 text-gray-500" />
                        <span>{item.instructor}</span>
                      </div>
                    </td>
                    <td className="py-2 px-4">
                      <div className="inline-flex items-center space-x-1">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span>{item.location}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Please arrive 15 minutes before class starts for proper warm-up.
          </p>
        </div>
      </main>
    </div>
  );
}
