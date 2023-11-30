import axios from 'axios';
import { BASE_URL } from './CONSTANTS';
import { getAuthToken, setAuthToken } from '../utilities/TokenUtilities';

// aqui se crea la instancia de axios
const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// aqui se refresca el token
const refreshToken = async () => {
    const response = await axios.post(BASE_URL + '/api/token/refresh/', {
        // refresh: getRefreshToken(),
    });
    const token = response.data.access;
    setAuthToken(token);
    return token;
};

// aqui se agrega el token a todas las peticiones
api.interceptors.request.use(async (config) => {
    const token = getAuthToken();
    if (token) {
        // config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

let isRefreshing = false;
let failedQueue = [];
// aqui se procesan las peticiones que fallaron por un 401
const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

// aqui se interceptan las respuestas
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                try {
                    const token = await new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject });
                    });
                    console.log(token);
                    // originalRequest.headers.Authorization = `Bearer ${token}`;
                    return api(originalRequest);
                } catch (err) {
                    return Promise.reject(err);
                }
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const token = await refreshToken();
                isRefreshing = false;
                processQueue(null, token);
                // originalRequest.headers.Authorization = `Bearer ${token}`;
                return api(originalRequest);
            } catch (err) {
                isRefreshing = false;
                processQueue(err, null);
                // clearToken();
                window.location.href = '/login';
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);
export default api;