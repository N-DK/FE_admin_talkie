import React, { useState } from 'react';
import { Avatar, Button, Space, Tag } from 'antd';
import {
    getAllUserBlockService,
    getAllUserService,
} from '../../services/userService.service';
import DataTable from '../../components/DataTable/DataTable';
import { useTranslation } from 'react-i18next';
import { AiOutlineLock, AiOutlineUnlock } from 'react-icons/ai';
import { _app } from '../../utils/_app';

const SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;

const fetchUserData = async (offset, limit, search = '') => {
    try {
        const [all, blocked] = await Promise.all([
            getAllUserService(offset, limit, search),
            getAllUserBlockService(0, 999999999, search),
        ]);

        const blockedIds = new Set(blocked?.data?.map((user) => user.id));

        const updatedData =
            all?.data?.map((user) => {
                if (blockedIds.has(user.id)) {
                    return { ...user, status: true };
                }
                return { ...user, status: false };
            }) || [];

        return {
            data: updatedData,
            total: all?.total_record?.total || 1,
        };
    } catch (error) {
        console.error(error);
        return { data: [], total: 0 };
    }
};

const UserManager = () => {
    const { t } = useTranslation();
    const [ids, setIds] = useState([]);
    const [action, setAction] = useState(null);

    const handleBlock = (record) => {
        if (record.status) {
            _app.user.unblock([record.id], () => {
                setIds([record.id]);
                setAction(true);
            });
        } else {
            _app.user.block([record.id], () => {
                setIds([record.id]);
                setAction(false);
            });
        }
    };

    const handleMultipleAction = (action, ids) => {
        if (action === 'block_multiple') {
            _app.user.block(ids, () => {
                setIds(ids);
                setAction(false);
            });
        } else if (action === 'unblock_multiple') {
            _app.user.unblock(ids, () => {
                setIds(ids);
                setAction(true);
            });
        }
    };

    const columns = [
        {
            title: t('table_user_name'),
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
            width: 150,
        },
        {
            title: t('table_phone'),
            dataIndex: 'phone',
            key: 'phone',
            width: 150,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 150,
        },
        {
            title: t('table_bio'),
            dataIndex: 'bio',
            key: 'bio',
            width: 150,
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
            width: 150,
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
            width: 150,
        },
        {
            title: t('table_created_at'),
            dataIndex: 'create_at',
            key: 'create_at',
            render: (timestamp) =>
                new Date(parseInt(timestamp) * 1000).toLocaleDateString(
                    'vi-VN',
                ),
            width: 150,
        },
        {
            title: t('table_status'),
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status ? 'red' : 'green'}>
                    {status
                        ? t('table_status_locked')
                        : t('table_status_active')}
                </Tag>
            ),
            width: 150,
            filters: [
                {
                    text: t('table_status_active'),
                    value: false,
                },
                {
                    text: t('table_status_locked'),
                    value: true,
                },
            ],
            onFilter: (value, record) => record.status === value,
        },
        {
            title: t('table_action'),
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => handleBlock(record)} type="default">
                        {record.status ? (
                            <AiOutlineUnlock />
                        ) : (
                            <AiOutlineLock />
                        )}
                        {record.status
                            ? t('table_status_unlock')
                            : t('table_status_lock')}
                    </Button>
                </Space>
            ),
            width: 150,
            fixed: 'right',
        },
    ];

    return (
        <DataTable
            columns={columns}
            fetchData={fetchUserData}
            initialPageSize={5}
            totalItems={0}
            searchPlaceholder={t('table_search_user')}
            refreshIds={ids}
            setRefreshIds={setIds}
            handleMultipleAction={handleMultipleAction}
            action={action}
            setAction={setAction}
        />
    );
};

export default UserManager;
