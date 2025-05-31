import axios from "axios";
import { Bell, Book, Calendar, Medal, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function BeltInfo() {
  const userId = localStorage.getItem("userId");
  const location = useLocation();
  const [beltInfo, setBeltInfo] = useState({
    name: "",
    belt: "",
    certificate: "",
    createdAt: "",
    updatedAt: "",
    history: [],
    nextExam: null,
  });
  const [progress, setProgress] = useState(0);

  const beltStages = [
    "White Belt",
    "Yellow Belt",
    "Orange Belt",
    "Green Belt",
    "Blue Belt",
    "Purple Belt",
    "Brown Belt",
    "Black Belt",
  ];

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:4000/api/student/${userId}/belt-info`)
        .then((res) => {
          setBeltInfo(res.data);
          const stage = beltStages.indexOf(res.data.belt);
          setProgress(Math.floor(((stage + 1) / beltStages.length) * 100));
        })
        .catch(() => alert("Failed to load belt info"));
    }
  }, [userId]);

  useEffect(() => {
    if (beltInfo.belt) {
      axios
        .get("http://localhost:4000/api/exams")
        .then((res) => {
          const next = res.data.find((exam) => exam.belt === beltInfo.belt);
          setBeltInfo((prev) => ({
            ...prev,
            nextExam: next
              ? `${next.date} at ${next.time} (${next.location})`
              : null,
          }));
        })
        .catch(() => console.error("Failed to fetch exams"));
    }
  }, [beltInfo.belt]);  
  

  const isActive = (path) => location.pathname.startsWith(path);
  const currentIndex = beltStages.indexOf(beltInfo.belt);

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

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">Belt Info</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current Belt */}
          <div className="bg-white shadow rounded-xl p-6">
            <div className="text-center">
              <img
                src={`/badges/${beltInfo.belt
                  ?.toLowerCase()
                  .replace(" ", "-")}.png`}
                alt={beltInfo.belt}
                className="w-24 h-24 mx-auto rounded-full object-cover shadow"
              />
              <h2 className="text-2xl font-bold mt-4">
                {beltInfo.belt || "Belt Unknown"}
              </h2>
              <p className="text-gray-600">
                You've been at this level since{" "}
                {new Date(beltInfo.updatedAt).toLocaleDateString()}
              </p>
              <div className="mt-4">
                <p className="text-gray-600">Progress to next belt</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-600 h-2.5 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-right text-gray-600">{progress}%</p>
              </div>
            </div>
          </div>

          {/* Certificate & Next Exam */}
          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-2 text-center">
              Latest Certificate
            </h3>
            {beltInfo.certificate ? (
              <div className="text-center">
                <a
                  href={beltInfo.certificate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline">
                  View Certificate
                </a>
              </div>
            ) : (
              <p className="text-center text-gray-500">
                No certificate uploaded yet.
              </p>
            )}
            <h3 className="text-lg font-semibold mt-6 text-center">
              Next Exam Schedule
            </h3>
            {beltInfo.nextExam ? (
              <p className="text-center text-green-600">{beltInfo.nextExam}</p>
            ) : (
              <p className="text-center text-gray-500">
                No upcoming exams scheduled.
              </p>
            )}
          </div>
        </div>

        {/* Belt Progression */}
        <div className="mt-6 bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Belt Progression</h2>
          <div className="flex items-center space-x-3 justify-center">
            {beltStages.map((belt, index) => {
              const colors = [
                "bg-gray-200 text-gray-600",
                "bg-yellow-400 text-yellow-900",
                "bg-orange-400 text-orange-900",
                "bg-green-500 text-white",
                "bg-blue-300 text-blue-800",
                "bg-purple-300 text-purple-800",
                "bg-amber-600 text-amber-100",
                "bg-gray-800 text-white",
              ];
              return (
                <div
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm font-semibold transition ${
                    index === currentIndex
                      ? colors[index]
                      : index < currentIndex
                      ? colors[index]
                      : "bg-gray-100 text-gray-500"
                  } ${
                    index > currentIndex
                      ? "opacity-60 hover:opacity-100 hover:scale-105"
                      : ""
                  }`}>
                  {belt}
                </div>
              );
            })}
          </div>
        </div>

        {/* Belt History */}
        <div className="mt-6 bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Belt History</h2>
          {beltInfo.history && beltInfo.history.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {beltInfo.history.map((item, idx) => (
                <li key={idx} className="py-2">
                  <div className="flex justify-between">
                    <span>{item.belt}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No history available.</p>
          )}
        </div>
      </main>
    </div>
  );
}
