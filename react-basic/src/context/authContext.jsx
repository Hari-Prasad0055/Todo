import React, { createContext, useContext, useState } from "react";


const UserContext = createContext();

export default function AuthContext({ children }) {
  const [user, setUser] = useState(null);

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
export const useAuth = () => useContext(UserContext);
