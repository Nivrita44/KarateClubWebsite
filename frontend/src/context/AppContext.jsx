import { createContext } from "react";
import { instructors } from "../assets/assets.js";
export const AppContext = createContext();

const AppContextProvider = (props) => {
  const value = {
    instructors,
  };
  console.log("AppContextProvider is rendering:", instructors);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
