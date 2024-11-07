import React from 'react';
import { Avatar, Button, Space, Tag } from 'antd';
import { getAllUserService } from '../../services/userService.service';
import DataTable from '../../components/DataTable/DataTable';
import { useTranslation } from 'react-i18next';

const SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;

const fetchUserData = async (offset, limit, search = '') => {
    try {
        const response = await getAllUserService(offset, limit, search);
        return { data: response?.data || [], total: response?.total || 30 };
    } catch (error) {
        console.error(error);
        return { data: [], total: 0 };
    }
};

const UserManager = () => {
    const { t } = useTranslation();
    console.log('re-render');

    const columns = [
        {
            title: t('table_user_name'),
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: t('table_phone'),
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: t('table_bio'),
            dataIndex: 'bio',
            key: 'bio',
        },
        {
            title: t('table_website'),
            dataIndex: 'website',
            key: 'website',
            render: (text) =>
                text ? (
                    <a href={text} target="_blank" rel="noopener noreferrer">
                        {text}
                    </a>
                ) : (
                    t('table_none', { field: t('table_website') })
                ),
        },
        {
            title: t('table_avatar'),
            dataIndex: 'avatar',
            key: 'avatar',
            render: (avatar) => (
                <Avatar
                    src={`${SERVER_DOMAIN}/${avatar}`}
                    alt="avatar"
                    style={{ width: 50, height: 50, borderRadius: '50%' }}
                />
            ),
        },
        {
            title: t('table_created_at'),
            dataIndex: 'create_at',
            key: 'create_at',
            render: (timestamp) =>
                new Date(parseInt(timestamp) * 1000).toLocaleDateString(
                    'vi-VN',
                ),
        },
        {
            title: t('table_status'),
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'khóa' ? 'red' : 'green'}>
                    {status === 'khóa'
                        ? t('table_status_locked')
                        : t('table_status_active')}
                </Tag>
            ),
        },
        {
            title: t('table_action'),
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="default">
                        {record.status === 'khóa'
                            ? t('table_status_unlock')
                            : t('table_status_lock')}
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <DataTable
            columns={columns}
            fetchData={fetchUserData}
            initialPageSize={5}
            totalItems={30}
            searchPlaceholder={t('table_search_user')}
        />
    );
};

export default UserManager;
