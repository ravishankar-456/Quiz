import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize user from localStorage on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('quizMaster_user');
      if (savedUser) {
        setTimeout(() => setUser(JSON.parse(savedUser)), 0);
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (email, name, password) => {
    const userData = {
      id: Date.now(),
      email,
      name,
      createdAt: new Date().toISOString(),
    };
    setUser(userData);
    localStorage.setItem('quizMaster_user', JSON.stringify(userData));
    localStorage.setItem('quizMaster_password', password); // Simple demo - don't do this in production!
  };

  const register = (email, name, password) => {
    const existingUser = localStorage.getItem('quizMaster_users');
    const users = existingUser ? JSON.parse(existingUser) : [];

    if (users.some(u => u.email === email)) {
      throw new Error('Email already registered');
    }

    const newUser = {
      id: Date.now(),
      email,
      name,
      createdAt: new Date().toISOString(),
    };

    users.push({ ...newUser, password });
    localStorage.setItem('quizMaster_users', JSON.stringify(users));

    login(email, name, password);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('quizMaster_user');
    localStorage.removeItem('quizMaster_password');
  };

  const updateProfile = (name) => {
    if (user) {
      const updatedUser = { ...user, name };
      setUser(updatedUser);
      localStorage.setItem('quizMaster_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
