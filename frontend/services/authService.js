import { apiRequest } from './api.js';

/**
 * Authentication API Service
 * Handles user registration, login, logout, and token session verification.
 */
export const authService = {
  /**
   * Register a new user
   */
  register: async ({ name, email, password, role }) => {
    return await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, role }),
    });
  },

  /**
   * Login user
   */
  login: async ({ email, password }) => {
    return await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  /**
   * Authenticate / register via Google ID token credential
   */
  googleAuth: async ({ credential, role = 'student' }) => {
    return await apiRequest('/auth/google', {
      method: 'POST',
      body: JSON.stringify({ credential, role }),
    });
  },

  /**
   * Logout user and clear server session cookie
   */
  logout: async () => {
    return await apiRequest('/auth/logout', {
      method: 'POST',
    });
  },

  /**
   * Get currently authenticated user profile
   */
  getMe: async (token) => {
    return await apiRequest('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  /**
   * Refresh expired access token
   */
  refreshToken: async () => {
    return await apiRequest('/auth/refresh', {
      method: 'POST',
    });
  },
};

export default authService;
