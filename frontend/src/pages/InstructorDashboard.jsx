import React, { useState, useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import {
  User,
  Users,
  Bell,
  Megaphone,
  Info,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

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

// import React, { useState, useEffect } from "react";
// import { Outlet, NavLink } from "react-router-dom";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const InstructorDashboard = () => {
//     const [isCollapsed, setIsCollapsed] = useState(false);
//   useEffect(() => {
//     document.title = "Instructor Dashboard";
//   }, []);

//   return (
//     <div className="flex bg-gray-100 h-screen">
//       {/* Sidebar */}
//       <aside
//         className={`bg-white shadow-xl transition-all duration-300 ${
//           isCollapsed ? "w-20" : "w-64"
//         } p-4 flex flex-col justify-between`}>
//         <h2 className="text-2xl font-bold text-red-600">Instructor Panel</h2>
//         <nav className="flex flex-col gap-2 text-gray-700 font-medium">
//           <NavLink to="profile" className="hover:text-red-600">
//             {isCollapsed ? <User size={20} /> : "My Profile"}
//           </NavLink>
//           <NavLink to="students" className="hover:text-red-600">
//             {isCollapsed ? <User size={20} /> : "Manage Students"}
//           </NavLink>
//           <NavLink to="notifications" className="hover:text-red-600">
//             Notifications
//           </NavLink>
//           <NavLink to="announcements" className="hover:text-red-600">
//             Announcements
//           </NavLink>
//           <NavLink to="about" className="hover:text-red-600">
//             Edit About Club
//           </NavLink>
//         </nav>
//         <button
//           onClick={() => setIsCollapsed(!isCollapsed)}
//           className="self-end mb-4 text-gray-500 hover:text-red-600">
//           {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
//         </button>
//       </aside>

//       {/* Content */}
//       <main className="flex-1 p-8">
//         <Outlet /> {/* This will now render <Home /> when at index */}
//       </main>
//     </div>
//   );
// };

// export default InstructorDashboard;
