import {
  Bell,
  Book,
  ChevronLeft,
  ChevronRight,
  Info,
  Megaphone,
  User,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";


const InstructorDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    document.title = "Instructor Dashboard";
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-white shadow-lg transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        } flex flex-col justify-between h-full overflow-y-auto`}>
        <div className="p-4 space-y-4">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-gray-500 hover:text-red-600 mb-6"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}>
            {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>

          <nav className="flex flex-col gap-3 text-sm font-medium text-gray-700">
            <NavLink
              to="profile"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded hover:bg-gray-100 ${
                  isActive ? "bg-red-100 text-red-600" : ""
                }`
              }>
              <User />
              {!isCollapsed && <span>My Profile</span>}
            </NavLink>

            <NavLink
              to="students"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded hover:bg-gray-100 ${
                  isActive ? "bg-red-100 text-red-600" : ""
                }`
              }>
              <Users />
              {!isCollapsed && <span>Manage Students</span>}
            </NavLink>

            <NavLink
              to="notifications"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded hover:bg-gray-100 ${
                  isActive ? "bg-red-100 text-red-600" : ""
                }`
              }>
              <Bell />
              {!isCollapsed && <span>Notifications</span>}
            </NavLink>

            <NavLink
              to="announcements"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded hover:bg-gray-100 ${
                  isActive ? "bg-red-100 text-red-600" : ""
                }`
              }>
              <Megaphone />
              {!isCollapsed && <span>Announcements</span>}
            </NavLink>
            <NavLink
              to="exams"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded hover:bg-gray-100 ${
                  isActive ? "bg-red-100 text-red-600" : ""
                }`
              }>
              <Book />
              {!isCollapsed && <span>Manage Exams</span>}
            </NavLink>

            <NavLink
              to="about"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded hover:bg-gray-100 ${
                  isActive ? "bg-red-100 text-red-600" : ""
                }`
              }>
              <Info />
              {!isCollapsed && <span>Edit About Club</span>}
            </NavLink>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default InstructorDashboard;
