import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);
  
  // Check for saved user session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (credentials) => {
    try {
      const response = await api.post('/api/login/', credentials);
      const { user: userData, token } = response.data;
      
      // Save user to state and localStorage
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);
      
      // Existing user, so set isNewUser to false
      setIsNewUser(false);
      return { success: true, user: userData };
      
    } catch (error) {
      console.error('Login error:', error.message);
      throw error;
    }
  };

  const signup = async (credentials) => {
    try {
      const response = await api.post('/api/register/', credentials);
      const { user: userData, token } = response.data;
      
      setUser(userData);
      setIsNewUser(true);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);

      return { success: true, user: userData };
    } catch (error) {
      console.error('Signup error:', error.message);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsNewUser(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const value = {
    user,
    isNewUser,
    setIsNewUser,
    login,
    logout,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 