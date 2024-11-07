import React from 'react';
import { Menu } from 'antd';
import { useTranslation } from 'react-i18next';
import IconLightDark from './IconLightDark';
import { SettingOutlined } from '@ant-design/icons';
import { setTheme } from '../../../features/theme/themeSlice';
import { store } from '../../../app/store';
import { useSelector } from 'react-redux';
import { IoLanguage } from 'react-icons/io5';
import storage from '../../../utils/storage';

const items = [
    {
        type: 'divider',
    },
    {
        key: '1',
        label: 'setting_account',
        icon: <SettingOutlined />,
    },
    {
        key: '2',
        icon: <IconLightDark />,
    },
    {
        key: '3',
        icon: <IoLanguage />,
        label: 'language',
        children: [
            {
                key: 'vi',
                label: 'Tiếng việt',
            },
            {
                key: 'en',
                label: 'English',
            },
        ],
    },
    {
        type: 'divider',
    },

    {
        key: '4',
        label: 'btn_logout',
    },
];
const MenuSettings = ({ handleLogout }) => {
    const { t, i18n } = useTranslation();
    const { theme } = useSelector((state) => state.theme);

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
        storage.setItem('lng', language);
    };

    const onClick = (e) => {
        switch (e.key) {
            case '2': {
                const dispatch = store.dispatch;
                dispatch(setTheme(theme === 'dark' ? 'light' : 'dark'));
                break;
            }
            case '4': {
                handleLogout();
                break;
            }
            case 'vi':
            case 'en': {
                changeLanguage(e.key);
                break;
            }
        }
    };
    return (
        <Menu
            onClick={onClick}
            style={{
                width: 256,
            }}
            mode="vertical"
            items={items?.map((item, index) => ({
                ...item,
                label:
                    index === 2
                        ? t(`${theme === 'light' ? 'dark' : 'light'}_mode`)
                        : t(item.label),
            }))}
        />
    );
};
export default MenuSettings;
