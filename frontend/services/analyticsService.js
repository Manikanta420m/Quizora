import { apiRequest } from './api.js';

/**
 * Analytics Client Service
 * Retrieves user attempt metrics, topic mastery, and weak areas.
 * Strictly pure JavaScript.
 */
export const analyticsService = {
  /**
   * Get comprehensive performance analytics for current user
   */
  getUserStats: async (token) => {
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return await apiRequest('/analytics/user', { headers });
  },

  /**
   * Get aggregated classroom, quiz, and student performance metrics for Teacher Dashboard
   */
  getTeacherStats: async (token) => {
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return await apiRequest('/analytics/teacher', { headers });
  },
};

export default analyticsService;
