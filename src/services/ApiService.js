import axios from "axios";

class ApiService {
    constructor() {
        const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1";
        this.client = axios.create({
            baseURL,
            headers: {
                "Content-Type": "application/json",
            },
        });

        /*
        this.client.interceptors.request.use((config) => {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
        */
    }

    get(url, params = {}) {
        return this.client.get(url, { params });
    }
    post(url, data, params = {}) {
        return this.client.post(url, data, params);
    }
    put(url, data, params = {}) {
        return this.client.put(url, data, params);
    }
    delete(url, params = {}) {
        return this.client.delete(url, params);
    }
}

export default new ApiService();
// usage:
// import apiService from './ApiService';
// apiService.get('/endpoint').then(response => console.log(response.data)).catch(error => console.error(error));