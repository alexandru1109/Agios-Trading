import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
    baseURL: 'http://192.168.0.180:5000/api', // Adaptează URL-ul de bază în funcție de configurația ta
});

export default instance;
