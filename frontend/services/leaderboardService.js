import { apiRequest } from './api.js';

/**
 * Leaderboard Client Service
 * Strictly pure JavaScript.
 */
export const leaderboardService = {
  /**
   * Fetch global leaderboard with optional pagination
   */
  getLeaderboard: async ({ limit = 25, offset = 0 } = {}) => {
    const params = new URLSearchParams();
    if (limit) params.append('limit', limit);
    if (offset) params.append('offset', offset);

    return await apiRequest(`/leaderboard?${params.toString()}`);
  },

  /**
   * Fetch current user's rank details (Requires token)
   */
  getMyRank: async (token) => {
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return await apiRequest('/leaderboard/me', { headers });
  },

  /**
   * Seed starter competitors into the leaderboard
   */
  seedLeaderboard: async (token) => {
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return await apiRequest('/leaderboard/seed', {
      method: 'POST',
      headers,
    });
  },
};

export default leaderboardService;
