/**
 * Centralized API Service
 * Handles HTTP requests to the Express backend with clean error unwrap.
 * No TypeScript, clean JavaScript async/await.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

/**
 * Custom API request helper
 */
export async function apiRequest(endpoint, options = {}) {
  const url = `${API_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData;
  const defaultHeaders = isFormData ? {} : { 'Content-Type': 'application/json' };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };


  try {
    const response = await fetch(url, config);
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMessage = data?.message || `Request failed with status ${response.status}`;
      const error = new Error(errorMessage);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (error) {
    // If backend is not running or unreachable
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      const offlineError = new Error(`Cannot connect to Backend API at ${API_URL}. Is the server running?`);
      offlineError.status = 503;
      throw offlineError;
    }
    throw error;
  }
}

/**
 * Health API service
 */
export const healthService = {
  getHealth: () => apiRequest('/health'),
};

export default apiRequest;
