// API base URL helper for the frontend
// Priority: VITE_API_BASE_URL -> VITE_API_URL -> fallback localhost
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  'http://localhost:5000/api';

export { API_BASE_URL };

