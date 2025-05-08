import { ContactsOutlined, HddOutlined, ProductOutlined, TagOutlined } from '@ant-design/icons'
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
                    icon: <ProductOutlined />,
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
                    label: 'Contacts',
                    icon: <ContactsOutlined />,
                    onClick: () => {
                        navigate(AppRouteSlugs.manageContacts)
                    }
                },
            ]}
        />
    )
}

export default SideBarMenuItems