import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

// Create a context for authentication
const AuthContext = createContext();

// AuthProvider component to provide authentication context
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
  });

  // Login function to authenticate user
  const login = async (email, password) => {
    try {
      const response = await axios.post('/auth/login', { email, password });
      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      setAuthState({ token: access_token, isAuthenticated: true });
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  // Logout function to clear authentication
  const logout = () => {
    localStorage.removeItem('token');
    setAuthState({ token: null, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use authentication context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};