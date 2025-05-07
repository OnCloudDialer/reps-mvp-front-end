import { useEffect } from 'react';
import { useLazyGetStoreByIdQuery } from '../../services/store';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Loading from '../common/Loading';
import PageLayout from '../common/PageLayout';
import { buildUrl } from '../../helpers';
import Link from 'antd/es/typography/Link';
import { Col, Row, Tabs, TabsProps, Typography } from 'antd';
import { BookOutlined, ContactsOutlined } from '@ant-design/icons';
import StoreContacts from './StoreContacts';

const ViewStore = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [fetchStore, { isLoading, isFetching, data }] = useLazyGetStoreByIdQuery();


    useEffect(() => {
        if (id) {
            fetchStore(id);
        }
    }, [id, fetchStore]);


    if (isLoading) {
        return <Loading />
    }

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Contacts',
            icon: <ContactsOutlined />,
            children: <StoreContacts storeId={data?.id || ''} />,
        },
        {
            key: '2',
            label: 'Notes',
            icon: <BookOutlined />,
            children: 'Content of Tab Pane 2',
        },

        {
            key: '3',
            label: 'Activities',
            children: 'Content of Tab Pane 2',
        },
    ];

    return (
        <PageLayout breadCrumbItems={[
            {
                title: <Link> Manage Stores</Link>,
                onClick: () => navigate(buildUrl('manageStores'))
            }
        ]}>
            {/* Display Store Detail */}
            <Row gutter={12} className='flex-col gap-6'>
                <Row gutter={12}>
                    <Col span={24}>
                        <Typography className='font-semibold text-2xl'>{data?.name}</Typography>
                    </Col>
                </Row>
                <Row gutter={[12, 12]}>
                    <Col span={6}>
                        <Typography className='font-semibold text-base'>Address</Typography>
                        <Typography>{data?.address}</Typography>
                    </Col>
                    <Col span={6}>
                        <Typography className='font-semibold text-base'>Region</Typography>
                        <Typography>{data?.region}</Typography>
                    </Col>
                    <Col span={6}>
                        <Typography className='font-semibold text-base'>City</Typography>
                        <Typography>{data?.city}</Typography>
                    </Col>
                    <Col span={6}>
                        <Typography className='font-semibold text-base'>Latitude</Typography>
                        <Typography>{data?.latitude}</Typography>
                    </Col>
                    <Col span={6}>
                        <Typography className='font-semibold text-base'>Longitude</Typography>
                        <Typography>{data?.longitude}</Typography>
                    </Col>
                </Row>

                <Row gutter={[12, 12]}>
                    <Col span={24}>
                        <Tabs defaultActiveKey="1" items={items} />
                    </Col>
                </Row>

            </Row>
        </PageLayout>
    )
}

export default ViewStore