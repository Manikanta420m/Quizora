'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import authService from '@/services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Load stored token and restore session on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedToken = localStorage.getItem('auth_token');
        if (storedToken) {
          setToken(storedToken);
          const response = await authService.getMe(storedToken);
          if (response?.success && response?.user) {
            setUser(response.user);
          } else {
            // Invalid session, clean up
            localStorage.removeItem('auth_token');
            setToken(null);
            setUser(null);
          }
        }
      } catch (error) {
        console.warn('Session verification failed:', error.message);
        localStorage.removeItem('auth_token');
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  /**
   * Login handler
   */
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await authService.login({ email, password });
      if (response?.success && response?.token) {
        localStorage.setItem('auth_token', response.token);
        setToken(response.token);
        setUser(response.user);
        return { success: true, user: response.user };
      }
      throw new Error(response?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Register handler
   */
  const register = async ({ name, email, password, role }) => {
    setIsLoading(true);
    try {
      const response = await authService.register({ name, email, password, role });
      if (response?.success && response?.token) {
        localStorage.setItem('auth_token', response.token);
        setToken(response.token);
        setUser(response.user);
        return { success: true, user: response.user };
      }
      throw new Error(response?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Google login / register handler
   */
  const googleLogin = async ({ credential, role = 'student' }) => {
    setIsLoading(true);
    try {
      const response = await authService.googleAuth({ credential, role });
      if (response?.success && response?.token) {
        localStorage.setItem('auth_token', response.token);
        setToken(response.token);
        setUser(response.user);
        return { success: true, user: response.user };
      }
      throw new Error(response?.message || 'Google authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Logout handler
   */
  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.warn('Server logout error:', err.message);
    } finally {
      localStorage.removeItem('auth_token');
      setToken(null);
      setUser(null);
      router.push('/');
    }
  };

  const value = {
    user,
    token,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    googleLogin,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Custom hook to consume AuthContext cleanly in components
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
