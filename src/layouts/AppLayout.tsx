import { Layout, theme } from 'antd'
import { Header, Footer, Content } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import React from 'react'
import SideBarMenuItems from './SideBarMenuItems'
import { Toaster } from 'sonner'


const AppLayout = ({ children }: { children: React.ReactNode }) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout className='min-h-screen'>
            <Toaster richColors />
            <Header>
            </Header>
            <Layout
                className='py-6'
                style={{ background: colorBgContainer, borderRadius: borderRadiusLG }}
            >
                <Sider style={{ background: colorBgContainer }} width={200}>
                    <SideBarMenuItems />
                </Sider>
                <Content className='px-6'>
                    {children}
                </Content>
            </Layout>
            <Footer style={{ textAlign: 'center' }}>
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
        </Layout>
    )
}

export default AppLayout