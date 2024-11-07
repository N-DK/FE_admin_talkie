import { serverInstance } from '../axios/serverInstance';
import { API_URL } from './API';

export const getAllChannelService = async (offset, limit) => {
    const API = API_URL?.get_all_channel;

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
