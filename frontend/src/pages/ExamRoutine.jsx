import { Bell, Book, Calendar, MapPin, Medal, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function ExamRoutine() {
  const exams = [
    {
      date: "Sunday, June 15, 2025",
      time: "3:00 PM",
      belt: "Blue",
      examiner: "Sensei Williams",
      location: "Main Dojo",
      beltColor: "bg-blue-200 text-blue-800",
    },
    {
      date: "Saturday, September 20, 2025",
      time: "2:00 PM",
      belt: "Purple",
      examiner: "Sensei Rodriguez",
      location: "Main Dojo",
      beltColor: "bg-purple-200 text-purple-800",
    },
    {
      date: "Wednesday, December 10, 2025",
      time: "4:00 PM",
      belt: "Brown",
      examiner: "Master Tanaka",
      location: "Main Dojo ",
      beltColor: "bg-amber-300 text-amber-800",
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
        <h1 className="text-3xl font-bold mb-6">Exam Routine</h1>

        <div className="bg-white shadow rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Book className="w-6 h-6 text-red-600" />
            <div>
              <h2 className="text-xl font-semibold">Upcoming Exams</h2>
              <p className="text-sm text-gray-500">
                Your belt examination schedule
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-t border-gray-200">
              <thead>
                <tr className="text-gray-600 font-medium border-b border-gray-200">
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Time</th>
                  <th className="py-3 px-4">Belt Level</th>
                  <th className="py-3 px-4">Examiner</th>
                  <th className="py-3 px-4">Location</th>
                </tr>
              </thead>
              <tbody>
                {exams.map((exam, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span>{exam.date}</span>
                    </td>
                    <td className="py-3 px-4">{exam.time}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-sm font-semibold ${exam.beltColor}`}
                      >
                        {exam.belt}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="inline-flex items-center space-x-1">
                        <User className="w-4 h-4 text-gray-500" />
                        <span>{exam.examiner}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="inline-flex items-center space-x-1">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span>{exam.location}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Exam preparation clinics are held one week before each exam date.
          </p>
        </div>
      </main>
    </div>
  );
}
