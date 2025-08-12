import { createContext, useState, useEffect } from "react";

// Create context object
export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  // Load user and role from localStorage
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("token");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [role, setRole] = useState(() => {
    return localStorage.getItem("role") || "student";
  });

  // Sync context changes with localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("token", JSON.stringify(user));
    } else {
      localStorage.removeItem("token");
    }

    if (role) {
      localStorage.setItem("role", role);
    } else {
      localStorage.removeItem("role");
    }
  }, [user, role]);

  // Provide context values
  const value = {
    user,
    setUser,
    role,
    setRole,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
