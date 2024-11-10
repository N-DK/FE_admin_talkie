import { serverInstance } from '../axios/serverInstance';
import { API_URL } from './API';

export const getSystem = async () => {
    const API = API_URL?.infor_system;

    return new Promise(async (resolve, reject) => {
        try {
            const data = await serverInstance.get(API);
            resolve(data?.data);
        } catch (error) {
            reject(error);
        }
    });
};

export const updateSystem = async (_data) => {
    const API = API_URL?.update_infor;

    return new Promise(async (resolve, reject) => {
        try {
            const data = await serverInstance.post(API, _data);
            resolve(data?.data);
        } catch (error) {
            reject(error);
        }
    });
};

export const adminSendEmail = async (_data) => {
    const API = API_URL?.admin_send_email;

    return new Promise(async (resolve, reject) => {
        try {
            const data = await serverInstance.post(API, _data);
            resolve(data?.data);
        } catch (error) {
            reject(error);
        }
    });
};
