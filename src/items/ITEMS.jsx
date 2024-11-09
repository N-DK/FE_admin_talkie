import { NavLink } from 'react-router-dom';
import { IconC } from '../components/IconC';
import { t } from 'i18next';

const menus = [
    {
        icon: 'FaUsers',
        link: `/user-manager`,
        name: 'menu_user_manager',
        key: '/user-manager',
    },
    {
        icon: 'FaFileAlt',
        link: `/posts-manager`,
        name: 'menu_posts_manager',
        key: '/posts-manager',
    },
    {
        icon: 'FaTv',
        link: `/channel-manager`,
        name: 'menu_channel_manager',
        key: '/channel-manager',
    },
    {
        child: [
            {
                icon: 'FaEnvelope',
                link: `/otp-email-configuration`,
                name: 'menu_system_config/menu_OTP_config',
                key: '/otp-email-configuration',
            },
            {
                icon: 'FaPaperPlane',
                link: `/send-mail-configuration`,
                name: 'menu_system_config/menu_email_config_info',
                key: '/send-mail-configuration',
            },
            {
                icon: 'FaSlidersH',
                link: `/basic-configuration`,
                name: 'menu_system_config/menu_base_config_info',
                key: '/basic-configuration',
            },
        ],
        icon: 'FaCog',
        name: 'menu_system_config',
        key: '/system-configuration',
    },
];

function getItem(label, key, icon, children, onClick) {
    return {
        key,
        icon,
        children,
        label,
        onClick,
    };
}

export const HEADER = () => {
    const serverMenu = menus;

    const getMenu = (menu) => {
        const Icon = <IconC name={menu?.icon} />;

        return {
            path: menu?.link,
            title: menu?.name,
            icon: Icon,
            key: `${menu?.link}`,
            children: menu?.child?.length
                ? menu?.child?.map?.((m) => getMenu(m))
                : undefined,
        };
    };

    return serverMenu?.map?.((menu, index) => {
        return getMenu(menu);
    });
};

export const HEADER_ITEMS = (t) => {
    return HEADER()?.map?.((header, _) => {
        const getHeader = (header) => {
            const title = <NavLink to={header.path}>{t(header.title)}</NavLink>;
            const icon = header?.icon;
            return getItem(
                title,
                header?.key,
                icon,
                header?.children?.map?.((child) => getHeader(child)),
            );
        };

        return getHeader(header);
    });
};
