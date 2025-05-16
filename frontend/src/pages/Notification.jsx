import { Bell, Book, Calendar, Circle, Medal, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Notifications() {
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

      {/* Notifications Content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Notifications</h1>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">
            Recent Announcements{" "}
            <span className="text-red-600 font-normal text-sm">(2 unread)</span>
          </h2>

          <div className="space-y-4">
            {/* Notification 1 */}
            <div className="bg-red-50 p-4 rounded-md border-l-4 border-red-500">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center space-x-2 font-semibold">
                  <Bell className="w-4 h-4" />
                  <span>Blue Belt Exam Scheduled</span>
                  <Circle className="w-2 h-2 text-red-600 fill-red-600" />
                </div>
                <span className="text-sm text-gray-500">May 1, 2025</span>
              </div>
              <p className="text-gray-700 text-sm">
                Your blue belt examination has been scheduled for June 15th at
                3:00 PM. Please ensure all training requirements are met.
              </p>
            </div>

            {/* Notification 2 */}
            <div className="bg-white p-4 rounded-md shadow-sm">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center space-x-2 font-semibold">
                  <Calendar className="w-4 h-4" />
                  <span>Class Cancelled - May 10</span>
                </div>
                <span className="text-sm text-gray-500">May 3, 2025</span>
              </div>
              <p className="text-gray-700 text-sm">
                The evening class on May 10th has been cancelled due to dojo
                renovations. Classes will resume on May 11th.
              </p>
            </div>

            {/* Additional Notifications */}
            <div className="bg-white p-4 rounded-md shadow-sm">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center space-x-2 font-semibold">
                  <Bell className="w-4 h-4" />
                  <span>Summer Camp Registration Open</span>
                </div>
                <span className="text-sm text-gray-500">Apr 28, 2025</span>
              </div>
              <p className="text-gray-700 text-sm">
                Registration for the summer karate camp is now open. Early bird
                discount available until May 30th.
              </p>
            </div>

            <div className="bg-red-50 p-4 rounded-md border-l-4 border-red-500">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center space-x-2 font-semibold">
                  <Bell className="w-4 h-4" />
                  <span>New Training Requirements</span>
                  <Circle className="w-2 h-2 text-red-600 fill-red-600" />
                </div>
                <span className="text-sm text-gray-500">Apr 20, 2025</span>
              </div>
              <p className="text-gray-700 text-sm">
                Updated training requirements for blue and brown belts are now
                in effect. Please check the belt info section for details.
              </p>
            </div>

            <div className="bg-white p-4 rounded-md shadow-sm">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center space-x-2 font-semibold">
                  <Calendar className="w-4 h-4" />
                  <span>Tournament Preparation Class Added</span>
                </div>
                <span className="text-sm text-gray-500">Apr 15, 2025</span>
              </div>
              <p className="text-gray-700 text-sm">
                A new tournament preparation class has been added on Saturdays
                at 2:00 PM. All students are encouraged to attend.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
