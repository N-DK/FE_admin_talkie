const VITE_SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;

export const API_URL = {
    SERVER_DOMAIN: VITE_SERVER_DOMAIN,

    // AUTH
    login: '/login-admin',

    // POSTS
    unreport_post: '/unreport-post',
    get_all_post: '/get-all-post',
    block_post: '/block-post',
    get_all_post_block: '/get-all-post-block',
    unlock_post: '/unlock-post',

    // SYSTEM
    update_infor: '/update-infor',
    infor_system: '/infor-system',

    // USER
    get_all_user: '/get-all-user',
    block_user: '/block-user',
    get_all_user_block: '/get-all-user-block',
    unlock_user: '/unlock-user',
    get_user_info: '/get-profile',
    logout: '/logout',

    // CHANNEL
    get_all_channel: '/get-all-channel',
    get_all_channel_block: '/get-all-channel-block',
    block_channel: '/block-channel',
    unlock_channel: '/unlock-channel',

    // REPORT
    list_report: '/list-report',

    // ACTION
    admin_send_email: '/admin-sendEmail',
};
