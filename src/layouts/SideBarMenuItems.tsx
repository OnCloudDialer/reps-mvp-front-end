import { ApartmentOutlined, CalendarOutlined, ContactsOutlined, FundOutlined, HddOutlined, ProductOutlined, ShopOutlined, TagOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import { AppRouteSlugs } from '../services/routes'
import { useNavigate } from 'react-router-dom'

const SideBarMenuItems = () => {
    const navigate = useNavigate()

    return (
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
                    label: 'Stores',
                    icon: <ShopOutlined />,
                    onClick: () => {
                        navigate(AppRouteSlugs.manageStores)
                    }
                },
                {
                    key: '3',
                    label: 'Tags',
                    icon: <TagOutlined />,
                    onClick: () => {
                        navigate(AppRouteSlugs.manageTags)
                    }
                },
                {
                    key: '4',
                    label: 'Area Tags',
                    icon: <ApartmentOutlined />,
                    onClick: () => {
                        navigate(AppRouteSlugs.manageAreaTags)
                    }
                },
                {
                    key: '5',
                    label: 'Contacts',
                    icon: <ContactsOutlined />,
                    onClick: () => {
                        navigate(AppRouteSlugs.manageContacts)
                    }
                },
                {
                    key: '6',
                    label: 'Products',
                    icon: <ProductOutlined />,
                    onClick: () => {
                        navigate(AppRouteSlugs.manageProducts)
                    }
                },
                {
                    key: '7',
                    label: 'Visit Planner',
                    icon: <CalendarOutlined />,
                    onClick: () => {
                        navigate(AppRouteSlugs.visitDashboard)
                    }
                },
                {
                    key: '8',
                    label: 'Promotion',
                    icon: <FundOutlined />,
                    onClick: () => {
                        navigate(AppRouteSlugs.managePromotion)
                    }
                },
            ]}
        />
    )
}

export default SideBarMenuItems