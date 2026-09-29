import { apiRequest } from './api.js';

/**
 * Quiz API Service
 * Handles CRUD operations, search, filters, pagination, and starter quiz seeding.
 * Strictly pure JavaScript.
 */
export const quizService = {
  /**
   * Fetch paginated quizzes with optional search, topic, and difficulty filters
   */
  getQuizzes: async ({ search = '', topic = 'all', difficulty = 'all', page = 1, limit = 12 } = {}) => {
    const params = new URLSearchParams();
    if (search && search.trim()) params.append('search', search.trim());
    if (topic && topic !== 'all') params.append('topic', topic);
    if (difficulty && difficulty !== 'all') params.append('difficulty', difficulty);
    if (page) params.append('page', page);
    if (limit) params.append('limit', limit);

    const queryString = params.toString();
    const endpoint = queryString ? `/quizzes?${queryString}` : '/quizzes';

    return await apiRequest(endpoint);
  },

  /**
   * Get single quiz by ID with author details
   */
  getQuizById: async (id) => {
    return await apiRequest(`/quizzes/${id}`);
  },

  /**
   * Create a new quiz (Requires auth token)
   */
  createQuiz: async (quizData, token) => {
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return await apiRequest('/quizzes', {
      method: 'POST',
      headers,
      body: JSON.stringify(quizData),
    });
  },

  /**
   * Delete quiz by ID (Author or Admin only)
   */
  deleteQuiz: async (id, token) => {
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return await apiRequest(`/quizzes/${id}`, {
      method: 'DELETE',
      headers,
    });
  },

  /**
   * Seed starter quizzes for immediate practice
   */
  seedQuizzes: async (token) => {
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return await apiRequest('/quizzes/seed', {
      method: 'POST',
      headers,
    });
  },

  /**
   * Generate a quiz with AI on any topic
   */
  generateQuiz: async (params, token) => {
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return await apiRequest('/quizzes/generate', {
      method: 'POST',
      headers,
      body: JSON.stringify(params),
    });
  },

  /**
   * Upload a document (PDF, TXT, MD) and generate a customized assessment quiz
   */
  generateQuizFromDocument: async (formData, token) => {
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return await apiRequest('/quizzes/from-document', {
      method: 'POST',
      headers,
      body: formData,
    });
  },

  /**
   * Submit quiz answers for evaluation and XP reward
   */
  submitQuiz: async (quizId, payload, token) => {
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return await apiRequest(`/quizzes/${quizId}/submit`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });
  },


  /**
   * Get user's past attempts for a quiz
   */
  getQuizAttempts: async (quizId, token) => {
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return await apiRequest(`/quizzes/${quizId}/attempts`, {
      headers,
    });
  },
};

export default quizService;
