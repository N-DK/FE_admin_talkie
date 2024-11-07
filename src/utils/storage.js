import { constant } from '../constant';

const storage = {
    getItem: function (key) {
        const items = localStorage.getItem(`${key}`);
        if (!items) return false;
        return JSON.parse(items);
    },

    setItem: function (key, items) {
        localStorage.setItem(`${key}`, JSON.stringify(items));
    },

    remove: function (key) {
        localStorage.removeItem(`${key}`);
    },

    setAccessToken: function (t) {
        const { token, accessToken } = constant.storeKey;
        const oldToken = storage?.getItem(token);

        const newToken = { ...(oldToken || {}), [accessToken]: t };

        storage.setItem(token, newToken);
    },

    setToken: function (a) {
        const { token, accessToken } = constant.storeKey;

        storage.setItem(token, {
            [accessToken]: a,
        });
    },

    clearToken: function () {
        const { token } = constant.storeKey;

        storage.remove(token);
    },

    getAccessToken: function () {
        const { token, accessToken } = constant.storeKey;
        return storage.getItem(token)?.[accessToken];
    },

    getAccessTokenBearer: function () {
        const { token, accessToken } = constant.storeKey;
        return `Bearer ${storage.getItem(token)?.[accessToken]}`;
    },

    getRefreshToken: function () {
        const { token, refreshToken } = constant.storeKey;
        return storage.getItem(token)?.[refreshToken];
    },

    getDeviceToken: function () {
        return storage.getItem(constant.storeKey.deviceToken);
    },
};

export default storage;
