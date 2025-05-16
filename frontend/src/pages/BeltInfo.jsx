import { Bell, Book, Calendar, Medal, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
export default function BeltInfo() {
  const beltProgress = 65; // Progress percentage
  const requirementsCompleted = [
    "Intermediate combinations",
    "Fourth kata",
    "Advanced kicks",
  ];
  const nextRequirements = [
    "Advanced combinations",
    "Fifth kata",
    "Basic sparring",
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
        <h1 className="text-3xl font-bold mb-6">Belt Info</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current Belt */}
          <div className="bg-white shadow rounded-xl p-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-green-500 text-white rounded-full mx-auto flex items-center justify-center text-3xl font-bold">
                G
              </div>
              <h2 className="text-2xl font-bold mt-4">Green Belt</h2>
              <p className="text-gray-600">
                You've been at this level for 6 months
              </p>
              <div className="mt-4">
                <p className="text-gray-600">Progress to next belt</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-600 h-2.5 rounded-full"
                    style={{ width: `${beltProgress}%` }}
                  />
                </div>
                <p className="text-right text-gray-600">{beltProgress}%</p>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Requirements Completed</h3>
              <ul className="list-disc list-inside text-green-600">
                {requirementsCompleted.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Next Belt */}
          <div className="bg-white shadow rounded-xl p-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-400 text-white rounded-full mx-auto flex items-center justify-center text-3xl font-bold border-4 border-dashed">
                B
              </div>
              <h2 className="text-2xl font-bold mt-4">Blue Belt</h2>
              <p className="text-gray-600">Minimum training time: 18 months</p>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Requirements</h3>
                <ul className="list-disc list-inside text-gray-600">
                  {nextRequirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
                <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded">
                  View Detailed Requirements
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Belt Progression */}
        <div className="mt-6 bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Belt Progression</h2>
          <div className="flex items-center space-x-3 justify-center">
            {[
              "White",
              "Yellow",
              "Orange",
              "Green (Current)",
              "Blue",
              "Purple",
              "Brown",
              "Black",
            ].map((belt, index) => {
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
              const currentIndex = 3;

              return (
                <div
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm font-semibold transition ${
                    index < currentIndex
                      ? colors[index]
                      : "bg-gray-100 text-gray-500"
                  } ${index === currentIndex ? colors[index] : ""} ${
                    index > currentIndex
                      ? "opacity-60 hover:opacity-100 hover:scale-105"
                      : ""
                  }`}
                >
                  {belt}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
