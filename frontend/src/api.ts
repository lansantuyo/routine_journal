import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { ACCESS_TOKEN } from "./constants";


const api = axios.create({
    baseURL: import.meta.env.REACT_APP_API_BASE_URL,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            // Ensure headers are initialized properly to avoid 'undefined'
            config.headers = config.headers || {};
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config; // This ensures that the return type is correctly handled
    },
    (error: AxiosError) => Promise.reject(error) // Make sure to return a promise in case of an error
);

export default api;