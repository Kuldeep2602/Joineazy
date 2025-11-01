import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockUsers, mockAssignments, mockSubmissions } from '../data/mockData';
import {
  initializeStorage,
  getUsers,
  getCurrentUser,
  setCurrentUser,
  clearCurrentUser
} from '../utils/localStorage';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUserState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize localStorage with mock data
    initializeStorage(mockUsers, mockAssignments, mockSubmissions);
    
    // Check for existing user session
    const user = getCurrentUser();
    if (user) {
      setCurrentUserState(user);
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      const userWithoutPassword = { ...user };
      delete userWithoutPassword.password;
      setCurrentUser(userWithoutPassword);
      setCurrentUserState(userWithoutPassword);
      return { success: true, user: userWithoutPassword };
    }
    
    return { success: false, error: 'Invalid email or password' };
  };

  const logout = () => {
    clearCurrentUser();
    setCurrentUserState(null);
  };

  const value = {
    currentUser,
    login,
    logout,
    loading,
    isAuthenticated: !!currentUser,
    isStudent: currentUser?.role === 'student',
    isAdmin: currentUser?.role === 'admin' || currentUser?.role === 'teacher'
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
