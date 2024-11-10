import { t } from 'i18next';
import { store } from '../app/store';
import { routeConfig } from '../configs/routeConfig';
import { setSystem } from '../features/system/systemSlice';
import { setTheme } from '../features/theme/themeSlice';
import { setUserAccess } from '../features/user/userSlice';
import { api } from '../helper';
import { getSystem } from '../services/systemService.service';
import {
    blockUserService,
    getUserInfoService,
    logoutService,
    unlockUserService,
} from '../services/userService.service';
import storage from './storage';
import {
    blockChannelService,
    unlockChannelService,
} from '../services/channelService.service';
import {
    blockPostService,
    unlockPostService,
} from '../services/postService.service';

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

    user: {
        block: (user_ids, onSuccess) =>
            api.modal?.confirm({
                title: t('confirm_block_user_title'),
                icon: null,
                content: t('confirm_block_user_content'),
                okText: t('btn_block'),
                cancelText: t('btn_cancel'),
                onOk: () => {
                    const loadingApiClose = api.message?.loading(
                        t('confirm_block_user_loading'),
                        20,
                    );
                    blockUserService(user_ids)
                        .then((fb) => {
                            api.message?.success(
                                t('confirm_block_user_success'),
                            );
                            onSuccess?.();
                        })
                        .catch((error) => {
                            api.message?.error(t('confirm_block_user_error'));
                        })
                        .finally(() => {
                            loadingApiClose?.();
                        });
                },
                centered: true,
            }),
        unblock: (user_ids, onSuccess) =>
            api.modal?.confirm({
                title: t('confirm_unlock_user_title'),
                icon: null,
                content: t('confirm_unlock_user_content'),
                okText: t('btn_unlock'),
                cancelText: t('btn_cancel'),
                onOk: () => {
                    const loadingApiClose = api.message?.loading(
                        t('confirm_unlock_user_loading'),
                        20,
                    );
                    unlockUserService(user_ids)
                        .then((fb) => {
                            api.message?.success(
                                t('confirm_unlock_user_success'),
                            );
                            onSuccess?.();
                        })
                        .catch((error) => {
                            api.message?.error(t('confirm_unlock_user_error'));
                        })
                        .finally(() => {
                            loadingApiClose?.();
                        });
                },
                centered: true,
            }),
    },

    channel: {
        block: (channel_ids, onSuccess) =>
            api.modal?.confirm({
                title: t('confirm_block_channel_title'),
                icon: null,
                content: t('confirm_block_channel_content'),
                okText: t('btn_block'),
                cancelText: t('btn_cancel'),
                onOk: () => {
                    const loadingApiClose = api.message?.loading(
                        t('confirm_block_channel_loading'),
                        20,
                    );
                    blockChannelService(channel_ids)
                        .then((fb) => {
                            api.message?.success(
                                t('confirm_block_channel_success'),
                            );
                            onSuccess?.();
                        })
                        .catch((error) => {
                            api.message?.error(
                                t('confirm_block_channel_error'),
                            );
                        })
                        .finally(() => {
                            loadingApiClose?.();
                        });
                },
                centered: true,
            }),
        unblock: (channel_ids, onSuccess) =>
            api.modal?.confirm({
                title: t('confirm_unlock_channel_title'),
                icon: null,
                content: t('confirm_unlock_channel_content'),
                okText: t('btn_unlock'),
                cancelText: t('btn_cancel'),
                onOk: () => {
                    const loadingApiClose = api.message?.loading(
                        t('confirm_unlock_channel_loading'),
                        20,
                    );
                    unlockChannelService(channel_ids)
                        .then((fb) => {
                            api.message?.success(
                                t('confirm_unlock_channel_success'),
                            );
                            onSuccess?.();
                        })
                        .catch((error) => {
                            api.message?.error(
                                t('confirm_unlock_channel_error'),
                            );
                        })
                        .finally(() => {
                            loadingApiClose?.();
                        });
                },
                centered: true,
            }),
    },

    post: {
        block: (post_ids, onSuccess) =>
            api.modal?.confirm({
                title: t('confirm_block_post_title'),
                icon: null,
                content: t('confirm_block_post_content'),
                okText: t('btn_block'),
                cancelText: t('btn_cancel'),
                onOk: () => {
                    const loadingApiClose = api.message?.loading(
                        t('confirm_block_post_loading'),
                        20,
                    );
                    blockPostService(post_ids)
                        .then((fb) => {
                            api.message?.success(
                                t('confirm_block_post_success'),
                            );
                            onSuccess?.();
                        })
                        .catch((error) => {
                            api.message?.error(t('confirm_block_post_error'));
                        })
                        .finally(() => {
                            loadingApiClose?.();
                        });
                },
                centered: true,
            }),
        unblock: (post_ids, onSuccess) =>
            api.modal?.confirm({
                title: t('confirm_unlock_post_title'),
                icon: null,
                content: t('confirm_unlock_post_content'),
                okText: t('btn_unlock'),
                cancelText: t('btn_cancel'),
                onOk: () => {
                    const loadingApiClose = api.message?.loading(
                        t('confirm_unlock_post_loading'),
                        20,
                    );
                    unlockPostService(post_ids)
                        .then((fb) => {
                            api.message?.success(
                                t('confirm_unlock_post_success'),
                            );
                            onSuccess?.();
                        })
                        .catch((error) => {
                            api.message?.error(t('confirm_unlock_post_error'));
                        })
                        .finally(() => {
                            loadingApiClose?.();
                        });
                },
                centered: true,
            }),
    },
};
