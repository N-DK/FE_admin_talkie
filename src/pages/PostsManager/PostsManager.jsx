import { Avatar, Image, Menu, Tag, Tooltip } from 'antd';
import DataTable from '../../components/DataTable/DataTable';
import { getAllPostService } from '../../services/postService.service';
import { createStyles } from 'antd-style';
import PopoverC from './components/PopoverC';
import { FaCaretDown } from 'react-icons/fa6';
import { MdBlock } from 'react-icons/md';
import { CiFlag1 } from 'react-icons/ci';
import WaveSound from './components/Wavesound';
import { useTranslation } from 'react-i18next';

const SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;

const fetchPostData = async (offset, limit, search = '') => {
    try {
        const response = await getAllPostService(offset, limit, search);
        return { data: response?.data || [], total: response?.total || 30 };
    } catch (error) {
        console.error(error);
        return { data: [], total: 0 };
    }
};

function PostsManager() {
    const { t } = useTranslation();
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
            dataIndex: 'visible',
            key: 'visible',
            render: (visible) => (
                <Tag color={visible ? 'green' : 'red'}>
                    {visible
                        ? t('table_status_visible')
                        : t('table_status_in_visible')}
                </Tag>
            ),
            width: 150,
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
            title: t('table_audio'),
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
            width: 100,
            render: () => (
                <PopoverC
                    title=""
                    content={
                        <>
                            <Menu.Item key="1">
                                <MdBlock className="mr-2" />
                                {t('table_lock_post')}
                            </Menu.Item>
                            <Menu.Item key="2">
                                <CiFlag1 className="mr-2" />
                                {t('table_report_post')}
                            </Menu.Item>
                        </>
                    }
                    trigger="click"
                    placement="bottom"
                >
                    <p className="flex items-center gap-1 text-[#69b1ff] cursor-pointer">
                        {t('table_add')}
                        <FaCaretDown />
                    </p>
                </PopoverC>
            ),
        },
    ];
    return (
        <DataTable
            scroll={{ x: 'max-content' }}
            columns={columns}
            fetchData={fetchPostData}
            initialPageSize={5}
            totalItems={30}
            searchPlaceholder={t('table_search_post')}
        />
    );
}

export default PostsManager;
