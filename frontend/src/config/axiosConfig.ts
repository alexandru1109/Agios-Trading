import axios, { AxiosInstance } from 'axios';

const instance = axios.create({
    baseURL: 'http://192.168.0.180:5000/api',
  });
  
  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });
  

export default instance;
