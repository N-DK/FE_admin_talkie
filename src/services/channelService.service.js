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

export const getAllChannelBlockService = async (offset, limit, search) => {
    const API = API_URL.get_all_channel_block;

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

export const blockChannelService = async (channel_ids) => {
    const API = API_URL.block_channel;

    return new Promise(async (resolve, reject) => {
        try {
            const data = await serverInstance.post(API, {
                channel_id: channel_ids,
            });
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};

export const unlockChannelService = async (channel_ids) => {
    const API = API_URL.unlock_channel;

    return new Promise(async (resolve, reject) => {
        try {
            const data = await serverInstance.post(API, {
                channel_id: channel_ids,
            });
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};
