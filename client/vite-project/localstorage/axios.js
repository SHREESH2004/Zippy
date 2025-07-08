import axios from 'axios';
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
axios.defaults.baseURL = SERVER_URL;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
