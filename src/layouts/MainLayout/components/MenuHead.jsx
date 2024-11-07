import { Menu } from 'antd';
import { HEADER_ITEMS } from '../../../items/ITEMS';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SlArrowRight } from 'react-icons/sl';

function MenuHead({ theme }) {
    const { t } = useTranslation();
    const location = useLocation();

    return (
        <Menu
            expandIcon={<SlArrowRight />}
            theme={theme}
            defaultSelectedKeys={['/']}
            mode="vertical"
            selectedKeys={[location.pathname]}
            items={HEADER_ITEMS(t)}
            style={{ border: 'none' }}
        />
    );
}

export default MenuHead;
