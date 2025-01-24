import axios from 'axios';
import { BASE_URL } from '../utils/contsant';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Add authorization headers, if needed
    // const token = AsyncStorage.getItem('token'); 
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global error responses
    if (error.response?.status === 401) {
      // Handle unauthorized errors (e.g., logout user)
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

export default api;
