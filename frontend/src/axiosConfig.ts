// src/axiosConfig.ts
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5173', // Adaptează URL-ul de bază în funcție de configurația ta
});

export default instance;
