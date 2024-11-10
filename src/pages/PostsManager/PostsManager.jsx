import { Avatar, Button, Image, Menu, Space, Tag, Tooltip } from 'antd';
import DataTable from '../../components/DataTable/DataTable';
import {
    getAllPostBlockService,
    getAllPostService,
    getAllReportPostService,
} from '../../services/postService.service';
import { createStyles } from 'antd-style';
import PopoverC from './components/PopoverC';
import { FaCaretDown } from 'react-icons/fa6';
import { MdBlock } from 'react-icons/md';
import { CiFlag1 } from 'react-icons/ci';
import WaveSound from './components/Wavesound';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { _app } from '../../utils/_app';
import { AiOutlineLock, AiOutlineUnlock } from 'react-icons/ai';

const SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;

const fetchPostData = async (offset, limit, search = '') => {
    try {
        const [all, blocked] = await Promise.all([
            getAllPostService(offset, limit, search),
            getAllPostBlockService(0, 999999999, search),
        ]);

        const blockedIds = new Set(blocked?.data?.map((post) => post.id));

        const updatedData =
            all?.data?.map((post) => {
                if (blockedIds.has(post.id)) {
                    return { ...post, status: true };
                }
                return { ...post, status: false };
            }) || [];

        return {
            data: updatedData,
            total: all?.total_record?.total || 0,
        };
    } catch (error) {
        console.error(error);
        return { data: [], total: 0 };
    }
};

const fetchReportPostData = async (offset, limit, search = '') => {
    try {
        const response = await getAllReportPostService(offset, limit, search);
        return {
            data: response?.data || [],
            total: response?.total_record?.total || 0,
        };
    } catch (error) {
        console.error(error);
        return { data: [], total: 0 };
    }
};

function PostsManager() {
    const { t } = useTranslation();
    const [refreshIds, setRefreshIds] = useState([]);
    const [indexSelected, setIndexSelected] = useState(1);

    const handleLock = (record) => {
        if (record.status) {
            _app.post.unblock([record.id], () => {
                setRefreshIds([record.id]);
            });
        } else {
            _app.post.block([record.id], () => {
                setRefreshIds([record.id]);
            });
        }
    };

    const handleMultipleAction = (action, ids) => {
        if (action === 'block_multiple') {
            _app.post.block(ids, () => {
                setRefreshIds(ids);
            });
        } else if (action === 'unblock_multiple') {
            _app.post.unblock(ids, () => {
                setRefreshIds(ids);
            });
        }
    };

    const columns = [
        {
            title: t('table_avatar'),
            dataIndex: 'avatar',
            key: 'avatar',
            fixed: 'left',
            render: (avatar) =>
                avatar ? (
                    <Avatar
                        src={`${SERVER_DOMAIN}/${avatar}`}
                        alt={t('table_avatar')}
                        className="w-14 h-14"
                    />
                ) : (
                    'No Avatar'
                ),
            width: 150,
        },
        {
            title: t('table_user_name'),
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
            render: (name) => <p className="font-semibold">{name}</p>,
            width: 150,
        },

        {
            title: t('table_content'),
            dataIndex: 'content',
            key: 'content',
            width: 300,
            render: (text) => (
                <Tooltip title={text}>
                    <div className="line-clamp-3">{text}</div>
                </Tooltip>
            ),
        },

        {
            title: t('table_channel_name'),
            dataIndex: 'name_channel',
            key: 'name_channel',
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
            title: t('table_number_of_shares'),
            dataIndex: 'number_share',
            key: 'number_share',
            width: 150,
        },
        {
            title: t('table_number_of_likes'),
            dataIndex: 'number_heart',
            key: 'number_heart',
            width: 180,
        },
        {
            title: t('table_number_of_views'),
            dataIndex: 'number_view',
            key: 'number_view',
            width: 150,
        },
        {
            title: t('table_tag'),
            dataIndex: 'tag_user',
            key: 'tag_user',
            render: (tagUser) =>
                tagUser
                    ? tagUser
                    : t('table_none', {
                          field: t('table_tag'),
                      }),
            width: 150,
        },
        {
            title: 'Audio',
            dataIndex: 'audio',
            key: 'audio',
            width: 200,
            render: (audio) =>
                audio ? (
                    <WaveSound audio={`${SERVER_DOMAIN}/${audio}`} />
                ) : (
                    t('table_none', {
                        field: 'Audio',
                    })
                ),
        },
        {
            title: t('table_image'),
            dataIndex: 'img',
            key: 'img',
            render: (img) =>
                img ? (
                    <Image
                        width={60}
                        height={60}
                        src={`${SERVER_DOMAIN}/${img}`}
                        alt="Post Image"
                        className="object-cover rounded-md"
                    />
                ) : (
                    t('table_none', {
                        field: t('table_image'),
                    })
                ),
            width: 150,
        },
        {
            title: 'URL',
            dataIndex: 'url',
            key: 'url',
            render: (url) =>
                url ? (
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        {url}
                    </a>
                ) : (
                    t('table_none', {
                        field: 'URL',
                    })
                ),
            width: 150,
        },
        {
            title: t('table_action'),
            key: 'operation',
            fixed: 'right',
            width: 150,
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => handleLock(record)} type="default">
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
        },
    ];
    return (
        <DataTable
            scroll={{ x: 'max-content' }}
            columns={columns}
            fetchData={
                indexSelected === 1 ? fetchPostData : fetchReportPostData
            }
            initialPageSize={5}
            totalItems={0}
            searchPlaceholder={t('table_search_post')}
            refreshIds={refreshIds}
            setRefreshIds={setRefreshIds}
            setIndexSelected={setIndexSelected}
            handleMultipleAction={handleMultipleAction}
        />
    );
}

export default PostsManager;
