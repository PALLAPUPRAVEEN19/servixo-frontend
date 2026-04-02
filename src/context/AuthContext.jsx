import React, { createContext, useState, useContext, useEffect } from 'react';
import { mockStorage } from '../services/mockStorage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize the DB from localStorage 
    mockStorage.initDB();
    
    // Check for an existing session
    const storedUser = localStorage.getItem('servixo_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password, role) => {
    const users = mockStorage.getAll('users');
    const existingUser = users.find(u => u.email === email && u.password === password && u.role === role);
    
    if (existingUser) {
      setUser(existingUser);
      localStorage.setItem('servixo_user', JSON.stringify(existingUser));
      return true;
    }
    return false;
  };

  const signup = (userData) => {
    const newUser = mockStorage.addItem('users', userData);
    setUser(newUser);
    localStorage.setItem('servixo_user', JSON.stringify(newUser));
    return newUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('servixo_user');
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
