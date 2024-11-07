import { serverInstance } from '../axios/serverInstance';
import { API_URL } from './API';

export const getAllPostService = async (offset, limit, search) => {
    const API = API_URL?.get_all_post;

    return new Promise(async (resolve, reject) => {
        try {
            const response = await serverInstance.post(API, {
                limit,
                offset,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
};
