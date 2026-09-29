import { apiRequest } from './api.js';

/**
 * Phase 10: Gamification & Achievements API Service
 * Pure JavaScript client service for badges and milestone progression
 */
export const achievementService = {
  /**
   * Fetch all badges and user unlock progression
   */
  getAchievements: async (token) => {
    const headers = {};
    if (token) headers.Authorization = `Bearer ${token}`;

    return await apiRequest('/achievements', {
      method: 'GET',
      headers,
    });
  },

  /**
   * Manually trigger achievement evaluation
   */
  evaluateAchievements: async (context = {}, token) => {
    const headers = {};
    if (token) headers.Authorization = `Bearer ${token}`;

    return await apiRequest('/achievements/evaluate', {
      method: 'POST',
      headers,
      body: JSON.stringify(context),
    });
  },
};

export default achievementService;
