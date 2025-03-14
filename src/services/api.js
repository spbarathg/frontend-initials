import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for API calls
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // Here you can add token refresh logic
      // For now, we'll just redirect to login
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

// Special config for import endpoints
const importApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
  timeout: 300000, // 5 minutes
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add retry logic for import operations
importApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    if (!config || !response) return Promise.reject(error);

    if (response.status === 429 || response.status === 503) {
      const retries = config.retries || 0;
      if (retries < 3) {
        config.retries = retries + 1;
        const delay = Math.min(1000 * (retries + 1), 5000);
        await new Promise(resolve => setTimeout(resolve, delay));
        return importApi(config);
      }
    }
    return Promise.reject(error);
  }
);

export { importApi };
export default api;