import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState(
    localStorage.getItem("visitorName") || "",
  );

  const updateUserName = (name) => {
    setUserName(name);
    localStorage.setItem("visitorName", name);
  };

  return (
    <UserContext.Provider value={{ userName, updateUserName }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook för att göra det enkelt att använda
export const useUser = () => useContext(UserContext);
