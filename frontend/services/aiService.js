import { apiRequest } from './api.js';

/**
 * Phase 8: Advanced AI API Service
 * Pure JavaScript client service for Hints, Deep Explanations, Similar Questions, and Weak Topic Practice
 */
export const aiService = {
  /**
   * Request an in-quiz conceptual hint
   */
  getHint: async ({ question, options, topic }, token) => {
    const headers = {};
    if (token) headers.Authorization = `Bearer ${token}`;

    return await apiRequest('/ai/hint', {
      method: 'POST',
      headers,
      body: JSON.stringify({ question, options, topic }),
    });
  },

  /**
   * Request deep pedagogical explanation and distractor analysis for a question
   */
  getExplanation: async ({ question, options, correctAnswer, selectedOption, topic }, token) => {
    const headers = {};
    if (token) headers.Authorization = `Bearer ${token}`;

    return await apiRequest('/ai/explain', {
      method: 'POST',
      headers,
      body: JSON.stringify({ question, options, correctAnswer, selectedOption, topic }),
    });
  },

  /**
   * Generate an aligned follow-up question testing the same concept
   */
  getSimilarQuestion: async ({ question, topic, difficulty }, token) => {
    const headers = {};
    if (token) headers.Authorization = `Bearer ${token}`;

    return await apiRequest('/ai/similar-question', {
      method: 'POST',
      headers,
      body: JSON.stringify({ question, topic, difficulty }),
    });
  },

  /**
   * Generate an adaptive remedial practice quiz targeting weak areas
   */
  generateWeakPractice: async ({ weakTopics, difficulty = 'medium', numberOfQuestions = 5 }, token) => {
    const headers = {};
    if (token) headers.Authorization = `Bearer ${token}`;

    return await apiRequest('/ai/weak-practice', {
      method: 'POST',
      headers,
      body: JSON.stringify({ weakTopics, difficulty, numberOfQuestions }),
    });
  },
};

export default aiService;
