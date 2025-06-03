import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Link from 'antd/es/typography/Link';
import { Col, Row, Tabs, TabsProps, Typography } from 'antd';
import { BookOutlined, ProductOutlined } from '@ant-design/icons';
import Loading from '../../components/common/Loading';
import PageLayout from '../../components/common/PageLayout';
import { buildUrl } from '../../helpers';
import { useLazyGetSingleContactQuery } from '../../services/contact';
import AssociatedStores from './components/AssociatedStores';
import ContactNotes from './components/ContactNotes';

const ViewContact = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [fetchContact, { isLoading, data }] = useLazyGetSingleContactQuery();


    useEffect(() => {
        if (id) {
            fetchContact(id);
        }
    }, [id, fetchContact]);


    if (isLoading) {
        return <Loading />
    }

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Notes',
            icon: <BookOutlined />,
            children: <ContactNotes contactName={data?.name || ''} id={data?.id || ''} />,
        },
        {
            key: '2',
            label: 'Associated Stores',
            icon: <ProductOutlined />,
            children: <AssociatedStores id={data?.id || ''} />,
        },
    ];

    return (
        <PageLayout breadCrumbItems={[
            {
                title: <Link>Contacts</Link>,
                onClick: () => navigate(buildUrl('manageContacts'))
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
                        <Typography className='font-semibold text-base'>Email</Typography>
                        <Typography>{data?.email}</Typography>
                    </Col>
                    <Col span={6}>
                        <Typography className='font-semibold text-base'>Phone</Typography>
                        <Typography>{data?.phone}</Typography>
                    </Col>
                    <Col span={6}>
                        <Typography className='font-semibold text-base'>Role</Typography>
                        <Typography>{data?.role}</Typography>
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

export default ViewContact