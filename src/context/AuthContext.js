import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = 'http://localhost:5000/api';

  useEffect(() => {
    // Check for existing session
    const savedSessionId = localStorage.getItem('sessionId');
    if (savedSessionId) {
      verifySession(savedSessionId);
    } else {
      setLoading(false);
    }
  }, []);

  const verifySession = async (sid) => {
    try {
      const response = await fetch(`${API_URL}/auth/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: sid })
      });

      const data = await response.json();
      if (data.success) {
        setUser(data.user);
        setSessionId(sid);
      } else {
        localStorage.removeItem('sessionId');
      }
    } catch (error) {
      console.error('Session verification failed:', error);
      localStorage.removeItem('sessionId');
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();
      if (data.success) {
        setUser(data.user);
        setSessionId(data.sessionId);
        localStorage.setItem('sessionId', data.sessionId);
        return { success: true, message: data.message };
      }
      return { success: false, message: data.message };
    } catch (error) {
      return { success: false, message: 'Network error. Please check if server is running.' };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (data.success) {
        setUser(data.user);
        setSessionId(data.sessionId);
        localStorage.setItem('sessionId', data.sessionId);
        return { success: true, message: data.message };
      }
      return { success: false, message: data.message };
    } catch (error) {
      return { success: false, message: 'Network error. Please check if server is running.' };
    }
  };

  const logout = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setSessionId(null);
      localStorage.removeItem('sessionId');
    }
  };

  const updateProfile = async (name, email) => {
    try {
      const response = await fetch(`${API_URL}/auth/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, name, email })
      });

      const data = await response.json();
      if (data.success) {
        setUser(data.user);
        return { success: true, message: data.message };
      }
      return { success: false, message: data.message };
    } catch (error) {
      return { success: false, message: 'Network error' };
    }
  };

  const value = {
    user,
    sessionId,
    loading,
    signup,
    login,
    logout,
    updateProfile,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
