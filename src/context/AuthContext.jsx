import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('servixo_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password, role) => {
    if (!email || !password) return false;
    // TODO: Replace with real API call
    const loggedInUser = { id: Date.now().toString(), name: email.split('@')[0], email, role };
    setUser(loggedInUser);
    localStorage.setItem('servixo_user', JSON.stringify(loggedInUser));
    return true;
  };

  const signup = (userData) => {
    // TODO: Replace with real API call
    const newUser = { ...userData, id: Date.now().toString() };
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
