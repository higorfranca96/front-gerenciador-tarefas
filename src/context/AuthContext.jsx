import React, { createContext, useState, useEffect } from 'react';
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
//   const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

//   const login = (token, userData) => {
  const login = (token) => {
    setToken(token);
    // setUser(userData);
  };

  const logout = () => {
    setToken(null);
    // setUser(null);
  };

  return (
    // <AuthContext.Provider value={{ token, user, login, logout }}>
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}