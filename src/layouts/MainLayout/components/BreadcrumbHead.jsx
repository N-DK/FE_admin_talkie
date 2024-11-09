import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import { NavLink } from 'react-router-dom';
import { useBreadcrumb } from '../../../hooks/useBreadcrumb';
import { useTranslation } from 'react-i18next';

function BreadcrumbHead() {
    const hisArr = useBreadcrumb();
    const { t } = useTranslation();
    const items = hisArr?.flatMap((menu) =>
        menu?.title?.split('/')?.map((item) => ({
            title: t(item),
        })),
    );

    return (
        <Breadcrumb
            style={{ margin: '16px 0' }}
            items={[
                {
                    title: (
                        <NavLink to={'/'}>
                            <HomeOutlined />
                        </NavLink>
                    ),
                },
                ...items,
            ]}
        />
    );
}

export default BreadcrumbHead;
