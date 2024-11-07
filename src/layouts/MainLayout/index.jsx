import React, { useState } from 'react';
import { Layout, theme } from 'antd';

import BreadcrumbHead from './components/BreadcrumbHead';
import SidebarMenu from './components/SidebarMenu';
import HeaderC from './components/HeaderC';
import { AuthHoc } from '../../hocs/AuthHoc';
const { Content } = Layout;

function MainLayout({ children }) {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <AuthHoc>
            <Layout className="h-screen">
                <SidebarMenu />
                <Layout className="h-[100%] overflow-hidden">
                    <HeaderC />
                    <Content
                        style={{
                            padding: '24px 16px 0',
                        }}
                    >
                        <BreadcrumbHead />
                        <div
                            style={{
                                padding: 24,
                                // height: '90%',
                                background: colorBgContainer,
                                borderRadius: borderRadiusLG,
                                overflow: 'auto',
                            }}
                        >
                            {children}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </AuthHoc>
    );
}

export default MainLayout;
