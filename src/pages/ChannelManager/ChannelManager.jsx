import { Avatar, Button, Image, Space, Tag } from 'antd';
import DataTable from '../../components/DataTable/DataTable';
import {
    getAllChannelBlockService,
    getAllChannelService,
} from '../../services/channelService.service';
import { useTranslation } from 'react-i18next';
import { AiOutlineLock, AiOutlineUnlock } from 'react-icons/ai';
import { useState } from 'react';
import { _app } from '../../utils/_app';

const SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;

const fetchChannelData = async (offset, limit, search = '') => {
    try {
        const [all, blocked] = await Promise.all([
            getAllChannelService(offset, limit, search),
            getAllChannelBlockService(0, 999999999, search),
        ]);

        const blockedIds = new Set(blocked?.data?.map((channel) => channel.id));

        const updatedData =
            all?.data?.map((channel) => {
                if (blockedIds.has(channel.id)) {
                    return { ...channel, status: true };
                }
                return { ...channel, status: false };
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

function ChannelManager() {
    const { t } = useTranslation();
    const [refreshIds, setRefreshIds] = useState([]);

    const handleLockChannel = async (record) => {
        if (record?.status) {
            _app.channel.unblock([record?.id], () => {
                setRefreshIds([record?.id]);
            });
        } else {
            _app.channel.block([record?.id], () => {
                setRefreshIds([record?.id]);
            });
        }
    };

    const handleMultipleAction = (action, ids) => {
        if (action === 'block_multiple') {
            _app.channel.block(ids, () => {
                setRefreshIds(ids);
            });
        } else if (action === 'unblock_multiple') {
            _app.channel.unblock(ids, () => {
                setRefreshIds(ids);
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
            title: 'Nickname',
            dataIndex: 'username',
            key: 'username',
            width: 150,
        },
        {
            title: t('table_phone'),
            dataIndex: 'phone',
            key: 'phone',
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
            title: t('table_number_of_posts'),
            dataIndex: 'number_post',
            key: 'number_post',
            width: 150,
        },
        {
            title: t('table_status'),
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status ? 'red' : 'green'}>
                    {status ? t('table_status_lock') : t('table_status_unlock')}
                </Tag>
            ),
            width: 150,
            filters: [
                {
                    text: t('table_status_lock'),
                    value: true,
                },
                {
                    text: t('table_status_unlock'),
                    value: false,
                },
            ],
            onFilter: (value, record) => record.status === value,
        },
        {
            title: t('table_channel_avatar'),
            dataIndex: 'photo',
            key: 'photo',
            render: (photo) =>
                photo ? (
                    <Image
                        src={`${SERVER_DOMAIN}/${photo}`}
                        alt="Post Photo"
                        style={{ width: 50, height: 50, objectFit: 'cover' }}
                    />
                ) : (
                    t('table_none', {
                        field: t('table_avatar_post'),
                    })
                ),
            width: 150,
        },
        {
            title: t('table_action'),
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        onClick={() => handleLockChannel(record)}
                        type="default"
                    >
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
            fetchData={fetchChannelData}
            initialPageSize={5}
            totalItems={0}
            searchPlaceholder={t('table_search_channel')}
            refreshIds={refreshIds}
            setRefreshIds={setRefreshIds}
            handleMultipleAction={handleMultipleAction}
        />
    );
}

export default ChannelManager;
