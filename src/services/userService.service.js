import { t } from 'i18next';
import { serverInstance } from '../axios/serverInstance';
import { serverInstanceNoAuth } from '../axios/serverInstanceNoAuth';
import storage from '../utils/storage';
import { API_URL } from './API';

export const loginService = async (data) => {
    const API = API_URL.login;

    return new Promise(async (resolve, reject) => {
        try {
            const __data_ = await serverInstanceNoAuth.post(API, data);
            const token = __data_?.token;

            storage.setToken(token);

            resolve({
                message: t('message_login_success'),
            });
        } catch (error) {
            reject({
                message: error?.message,
            });
        }
    });
};

export const getAllUserService = async (offset, limit) => {
    const API = API_URL.get_all_user;

    return new Promise(async (resolve, reject) => {
        try {
            const data = await serverInstance.post(API, {
                limit,
                offset,
            });

            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};

export const getAllUserBlockService = async (offset, limit, search) => {
    const API = API_URL.get_all_user_block;

    return new Promise(async (resolve, reject) => {
        try {
            const data = await serverInstance.post(API, {
                limit,
                offset,
            });
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};

export const getUserInfoService = async () => {
    const API = API_URL.get_user_info;

    return new Promise(async (resolve, reject) => {
        try {
            const data = await serverInstance.get(API);
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};

export const logoutService = async () => {
    const API = API_URL.logout;

    return new Promise(async (resolve, reject) => {
        try {
            const data = await serverInstance.post(API);
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};

export const blockUserService = async (user_ids) => {
    const API = API_URL.block_user;

    return new Promise(async (resolve, reject) => {
        try {
            const data = await serverInstance.post(API, {
                user_id: user_ids,
            });
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};

export const unlockUserService = async (user_ids) => {
    const API = API_URL.unlock_user;

    return new Promise(async (resolve, reject) => {
        try {
            const data = await serverInstance.post(API, {
                user_id: user_ids,
            });
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};
