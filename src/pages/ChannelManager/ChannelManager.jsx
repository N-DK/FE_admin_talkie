import { Avatar, Button, Image, Space, Tag } from 'antd';
import DataTable from '../../components/DataTable/DataTable';
import { getAllChannelService } from '../../services/channelService.service';
import { useTranslation } from 'react-i18next';

const SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;

const fetchChannelData = async (offset, limit, search = '') => {
    try {
        const response = await getAllChannelService(offset, limit, search);
        return {
            data: response?.data || [],
            total: response?.total_record?.total || 30,
        };
    } catch (error) {
        console.error(error);
        return { data: [], total: 0 };
    }
};

function ChannelManager() {
    const { t } = useTranslation();

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
            dataIndex: 'visible',
            key: 'visible',
            render: (visible) => (
                <Tag color={visible === 0 ? 'red' : 'green'}>
                    {visible === 0
                        ? t('table_status_in_visible')
                        : t('table_status_visible')}
                </Tag>
            ),
            width: 150,
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
                    <Button type="default">
                        {record.status === 'khóa'
                            ? t('table_status_unlock')
                            : t('table_status_lock')}
                    </Button>
                </Space>
            ),
            width: 150,
        },
    ];

    return (
        <DataTable
            columns={columns}
            fetchData={fetchChannelData}
            initialPageSize={5}
            totalItems={30}
            searchPlaceholder={t('table_search_channel')}
        />
    );
}

export default ChannelManager;
