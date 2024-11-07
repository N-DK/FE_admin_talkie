import React, { useState } from 'react';
import { Logo } from '../../../components/Logo';
import MenuHead from './MenuHead';
import { useSelector } from 'react-redux';
import { Layout } from 'antd';

const { Sider } = Layout;

const SidebarMenu = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { theme } = useSelector((state) => state.theme);

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            width={250}
            theme={theme}
        >
            <Logo />
            <MenuHead theme={theme} />
        </Sider>
    );
};

export default SidebarMenu;
