import axios from 'axios';

// Get API URL from environment variable
// In development: VITE_API_URL=http://localhost:5000/api
// In production (Vercel): VITE_API_URL=https://be-haisanminhthong.onrender.com/api
const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  console.error(
    '⚠️ VITE_API_URL is not set! Please create .env.development file or set environment variable in Vercel.'
  );
}

const client = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Enable credentials for CORS
});

// Add request interceptor for logging
client.interceptors.request.use(
  (config) => {
    console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('[API] Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('[API] Response error:', error.response?.data || error.message);
    if (error.response) {
      // Server responded with error status
      console.error('[API] Status:', error.response.status);
      console.error('[API] Data:', error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error('[API] No response received. Is backend running?');
    }
    return Promise.reject(error);
  }
);

export default client;

