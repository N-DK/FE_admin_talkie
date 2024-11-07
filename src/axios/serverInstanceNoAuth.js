import axios from 'axios';
const SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;

const createNoAuthInstance = (baseURL) => {
    const serverInstanceNoAuth = axios.create({
        baseURL,
        headers: { 'Content-Type': 'application/json' },
    });

    const interceptorsRq = (config) => config;

    const interceptorsRqError = (error) => Promise.reject(error);

    const interceptorsRs = (response) => response?.data;

    const interceptorsRsError = (error) =>
        Promise.reject(error?.response?.data);

    serverInstanceNoAuth.interceptors.request.use(
        interceptorsRq,
        interceptorsRqError,
    );
    serverInstanceNoAuth.interceptors.response.use(
        interceptorsRs,
        interceptorsRsError,
    );

    return serverInstanceNoAuth;
};

export const serverInstanceNoAuth = createNoAuthInstance(SERVER_DOMAIN);
