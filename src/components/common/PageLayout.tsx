import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd'
import { BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { buildUrl } from '../../helpers';
import Link from 'antd/es/typography/Link';


interface PageLayoutProps {
    children: React.ReactNode;
    breadCrumbItems: BreadcrumbItemType[]
}

const PageLayout: React.FC<PageLayoutProps> = ({ breadCrumbItems, children }) => {

    const navigate = useNavigate();


    return (
        <div className='p-4 space-y-4'>
            <Breadcrumb
                items={[
                    {
                        title: <Link>
                            <HomeOutlined /> Dashboard
                        </Link>,
                        onClick: () => navigate(buildUrl('home'))
                    },
                    ...breadCrumbItems
                ]}
            />
            <div >
                {children}
            </div>
        </div>
    )
}

export default PageLayout