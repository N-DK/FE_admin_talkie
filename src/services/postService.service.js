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

export const getAllPostBlockService = async (offset, limit, search) => {
    const API = API_URL.get_all_post_block;

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

export const getAllReportPostService = async (offset, limit, search) => {
    const API = API_URL.list_report;

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

export const blockPostService = async (post_ids) => {
    const API = API_URL.block_post;

    return new Promise(async (resolve, reject) => {
        try {
            const data = await serverInstance.post(API, {
                post_id: post_ids,
            });
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};

export const unlockPostService = async (post_ids) => {
    const API = API_URL.unlock_post;

    return new Promise(async (resolve, reject) => {
        try {
            const data = await serverInstance.post(API, {
                post_id: post_ids,
            });
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};

export const unreportPostService = async (post_id) => {
    const API = API_URL.unreport_post;

    return new Promise(async (resolve, reject) => {
        try {
            const data = await serverInstance.post(API, {
                post_id,
            });
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};
