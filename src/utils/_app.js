import { store } from '../app/store';
import { routeConfig } from '../configs/routeConfig';
import { setSystem } from '../features/system/systemSlice';
import { setTheme } from '../features/theme/themeSlice';
import { setUserAccess } from '../features/user/userSlice';
import { getSystem } from '../services/systemService.service';
import {
    getUserInfoService,
    logoutService,
} from '../services/userService.service';
import storage from './storage';

export const _app = {
    logout: async () => {
        logoutService()
            .then(() => {
                storage.clearToken?.();
                window.location.href = routeConfig?.login;
            })
            .catch((e) => {
                console.log(e);
            });
    },

    setUserAuthed: (isAuth) => {
        const dispatch = store.dispatch;
        dispatch(
            setUserAccess({
                isAuth,
            }),
        );
    },

    getInitialData: {
        theme: () => {
            const theme = storage.getItem('theme') || 'light';
            const dispatch = store.dispatch;
            dispatch(setTheme(theme));

            return theme;
        },

        system: async () => {
            const dispatch = store.dispatch;
            const data = await getSystem();

            dispatch(setSystem(data));

            return data;
        },

        userInfo: async () => {
            return new Promise(async (resolve, reject) => {
                try {
                    const response = await getUserInfoService();
                    const data = response?.data?.[0];

                    const dispatch = store.dispatch;
                    dispatch(
                        setUserAccess({
                            userInfo: data,
                        }),
                    );

                    resolve(data);
                } catch (error) {
                    reject(error);
                }
            });
        },

        all: async () => {
            return await Promise.all([
                _app.getInitialData.userInfo(),
                _app.getInitialData.system(),
            ]);
        },
    },
};
