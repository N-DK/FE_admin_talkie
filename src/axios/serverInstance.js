import axios from 'axios';
import { constant } from '../constant';
import storage from '../utils/storage';

const SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;

function createInstance(baseURL, timeout = 10000) {
    const serverInstance = axios.create({
        baseURL,
        headers: { 'Content-Type': 'application/json' },
    });

    const interceptorsRq = async (config) => {
        let accessToken = storage.getAccessToken();

        config.headers['x-cypher-token'] = accessToken;
        config.timeout = timeout || constant?.axios?.timeout;

        return config;
    };
    const interceptorsRqError = (error) => {
        return Promise.reject(error);
    };

    const interceptorsRs = (response) => {
        return response?.data;
    };

    const interceptorsRsError = async (error) => {
        const status = error?.response?.status;
        if (status === 401 || status === 403) {
            storage.clearToken();
            return Promise.reject(error);
        }
    };
    serverInstance.interceptors.request.use(
        interceptorsRq,
        interceptorsRqError,
    );
    serverInstance.interceptors.response.use(
        interceptorsRs,
        interceptorsRsError,
    );

    return serverInstance;
}

export const serverInstance = createInstance(SERVER_DOMAIN, 60000);
