import axios from "axios";
import { Bell, Book, Calendar, MapPin, Medal, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const beltColorMap = {
  "White Belt": "bg-gray-200 text-gray-800",
  "Yellow Belt": "bg-yellow-300 text-yellow-900",
  "Orange Belt": "bg-orange-400 text-white",
  "Green Belt": "bg-green-400 text-white",
  "Blue Belt": "bg-blue-400 text-white",
  "Purple Belt": "bg-purple-400 text-white",
  "Brown Belt": "bg-amber-600 text-white",
  "Black Belt": "bg-black text-white",
};



export default function ExamRoutine() {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/exams")
      .then((res) => setExams(res.data))
      .catch((err) => console.error("Failed to fetch exams", err));
  }, []);

  const location = useLocation();


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
                    className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span>{exam.date}</span>
                    </td>
                    <td className="py-3 px-4">{exam.time}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-sm font-semibold ${
                          beltColorMap[exam.belt] || "bg-gray-100 text-gray-500"
                        }`}>
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
