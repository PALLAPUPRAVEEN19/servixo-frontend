import { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedUser = localStorage.getItem('user');
  const [user, setUser] = useState(
    storedUser ? JSON.parse(storedUser) : null
  );
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    const userResp = await authAPI.login(email, password);
    setUser(userResp);
    localStorage.setItem('user', JSON.stringify(userResp));
    return userResp;
  };

  const signup = async (name, email, password, roleName) => {
    const backendRole = roleName.toUpperCase();
    const userResp = await authAPI.register(name, email, password, backendRole);
    setUser(userResp);
    localStorage.setItem('user', JSON.stringify(userResp));
    return userResp;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
