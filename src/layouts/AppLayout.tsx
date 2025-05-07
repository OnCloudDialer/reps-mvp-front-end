import { Layout, Menu, theme } from 'antd'
import { Header, Footer, Content } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AppRouteSlugs } from '../services/routes'
import { HddOutlined, MailOutlined, TagOutlined } from '@ant-design/icons'

const AppLayout = ({ children }: { children: React.ReactNode }) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const navigate = useNavigate()
    return (
        <Layout className='min-h-screen'>
            <Header>
            </Header>
            <Layout
                className='py-6'
                style={{ background: colorBgContainer, borderRadius: borderRadiusLG }}
            >
                <Sider style={{ background: colorBgContainer }} width={200}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['1']}
                        className='h-full'
                        items={[
                            {
                                key: '1',
                                icon: <HddOutlined />,
                                label: 'Dashboard',
                                onClick: () => {
                                    navigate(AppRouteSlugs.home)
                                }
                            },
                            {
                                key: '2',
                                label: 'Manage Stores',
                                icon: <MailOutlined />,
                                onClick: () => {
                                    navigate(AppRouteSlugs.manageStores)
                                }
                            },
                            {
                                key: '3',
                                label: 'Manage Tags',
                                icon: <TagOutlined />,
                                onClick: () => {
                                    navigate(AppRouteSlugs.manageTags)
                                }
                            },
                        ]}
                    />
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