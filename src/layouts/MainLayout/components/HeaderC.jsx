import React, { useState, useTransition } from 'react';
import { Layout, Space, Avatar, Popover } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { theme } from 'antd';
import { BiLogOut } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { api } from '../../../helper';
import { _app } from '../../../utils/_app';
import MenuSettings from './MenuSettings';
import { useTranslation } from 'react-i18next';

const { Header } = Layout;

const SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;

const HeaderC = () => {
    const { userInfo } = useSelector((state) => state.user.access);
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();

    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const handleLogout = () => {
        api.modal?.confirm({
            title: t('confirm_logout_title'),
            icon: null,
            content: t('confirm_logout_content'),
            okText: t('btn_logout'),
            cancelText: t('btn_cancel'),
            onOk: _app.logout,
            centered: true,
        });
    };

    return (
        <Header
            style={{
                background: colorBgContainer,
            }}
            className="p-0 flex justify-end items-center"
        >
            <div className="flex items-center">
                <Popover
                    title={
                        <Space
                            className="flex items-center justify-between p-3"
                            style={{ width: '100%' }}
                        >
                            <Space className="flex items-center">
                                <Avatar
                                    src={`${SERVER_DOMAIN}/${userInfo?.image}`}
                                />
                                <span className="">{userInfo?.name}</span>
                            </Space>
                            <BiLogOut
                                onClick={handleLogout}
                                className="cursor-pointer"
                            />
                        </Space>
                    }
                    content={<MenuSettings handleLogout={handleLogout} />}
                    trigger="click"
                    placement="bottom"
                    open={open}
                    onOpenChange={handleOpenChange}
                >
                    <SettingOutlined className="mx-6 cursor-pointer text-xl" />
                </Popover>
            </div>
        </Header>
    );
};

export default HeaderC;
