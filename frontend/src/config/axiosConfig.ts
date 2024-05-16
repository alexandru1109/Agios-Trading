import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
    baseURL: 'http://192.168.0.180:5173', // URL-ul de bază al backend-ului tău
});

export default instance;
