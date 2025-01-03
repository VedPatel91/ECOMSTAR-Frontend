// api/api.js
import axios from 'axios';

// Base URL for API requests
const API_URL = 'http://localhost:5000/api/v1'; 

// Create an instance of Axios with default settings
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    // Add more common headers if needed (e.g., authentication token)
    // 'Authorization': `Bearer ${your_token}`,
  },
});

// Optional: Interceptors for request and response handling
// api.interceptors.response.use(
//   (response) => response,  // Handle response here (e.g., logging)
//   (error) => {
//     // Handle errors here (e.g., global error logging, notification)
//     return Promise.reject(error);
//   }
// );

export default api;
