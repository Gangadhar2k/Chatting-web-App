import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [room, setRoom] = useState(null);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, room, setRoom }}>
      {children}
    </AuthContext.Provider>
  );
};
