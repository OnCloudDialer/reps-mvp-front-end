import { useEffect } from 'react';
import { useLazyGetStoreByIdQuery } from '../../services/store';
import { useNavigate, useParams } from 'react-router-dom';
import { buildUrl } from '../../helpers';
import Link from 'antd/es/typography/Link';
import { Col, Row, Tabs, TabsProps, Typography } from 'antd';
import { BookOutlined, ContactsOutlined, EnvironmentOutlined } from '@ant-design/icons';
import StoreContacts from './components/StoreContacts';
import StoreNotes from './components/StoreNotes';
import Loading from '../../components/common/Loading';
import ViewLocation from '../../components/common/Maps/ViewLocation';
import PageLayout from '../../components/common/PageLayout';

const ViewStore = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [fetchStore, { isLoading, data }] = useLazyGetStoreByIdQuery();


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
            children: <StoreNotes id={data?.id || ''} storeName={data?.name || ''} />,
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
            <Row className='flex-col gap-4'>
                <Row >
                    <Col span={24}>
                        <Typography className='font-semibold text-2xl'>{data?.name}</Typography>
                    </Col>
                </Row>
                <Row className='flex-row justify-between'>
                    <Col span={10}>
                        <Row className='gap-4'>
                            <Col className='!px-0' span={20}>
                                <Typography className='font-semibold text-base mb-2'>Address</Typography>
                                <Typography>{data?.address}</Typography>
                            </Col>
                            <Row className='w-full'>
                                <Col span={8}>
                                    <Typography className='font-semibold text-base mb-2'>Region</Typography>
                                    <Typography>{data?.region}</Typography>
                                </Col>
                                <Col span={8}>
                                    <Typography className='font-semibold text-base mb-2'>City</Typography>
                                    <Typography>{data?.city}</Typography>
                                </Col>
                            </Row>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Typography className='font-semibold text-base mb-2'>Location <EnvironmentOutlined /></Typography>
                        <ViewLocation currentLocation={data ? {
                            lat: data?.latitude,
                            lng: data?.longitude,
                        } : undefined} />
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