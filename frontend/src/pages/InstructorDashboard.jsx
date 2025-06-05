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
    <div className="flex h-screen bg-background font-formal text-primary">
      {/* Sidebar */}
      <aside
        className={`bg-white shadow-lg transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        } flex flex-col justify-between h-full overflow-y-auto`}>
        <div className="p-4 space-y-4">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-primary hover:text-accent mb-6"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}>
            {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>

          <nav className="flex flex-col gap-3 text-[16px] font-medium text-primary">
            {[
              { to: "profile", label: "My Profile", icon: <User /> },
              { to: "students", label: "Manage Students", icon: <Users /> },
              { to: "notifications", label: "Notifications", icon: <Bell /> },
              { to: "announcements", label: "Announcements", icon: <Megaphone /> },
              { to: "exams", label: "Manage Exams", icon: <Book /> },
              { to: "about", label: "Edit About Club", icon: <Info /> },
            ].map(({ to, label, icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2 rounded transition-all hover:bg-accent hover:text-primary ${
                    isActive ? "bg-accent text-primary font-semibold" : ""
                  }`
                }>
                {icon}
                {!isCollapsed && <span>{label}</span>}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto bg-background">
        <Outlet />
      </main>
    </div>
  );
};

export default InstructorDashboard;
