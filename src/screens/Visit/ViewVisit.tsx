import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLazyGetVisitByIdQuery } from '../../services/visits';
import Link from 'antd/es/typography/Link';
import { buildUrl } from '../../helpers';
import { Row, Col, Typography, Tabs, TabsProps, Badge, Tag } from 'antd';
import { AreaChartOutlined, BookOutlined } from '@ant-design/icons';
import VisitNotes from './components/VisitNotes';
import VisitActivity from './components/VisitActivity';
import { getVisitBadgeColor } from './utils';
import { VisitType } from '../../services/visits/type';
import moment from 'moment';
import { dateFormat } from '../../config';
import Loading from '../../components/common/Loading';
import PageLayout from '../../components/common/PageLayout';


const ViewVisit: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [fetchVisit, { isLoading, data }] = useLazyGetVisitByIdQuery();


    useEffect(() => {
        if (id) {
            fetchVisit(id);
        }
    }, [id, fetchVisit]);


    if (isLoading) {
        return <Loading />
    }

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Notes',
            icon: <BookOutlined />,
            children: <VisitNotes id={data?.id || ''} />,
        },
        {
            key: '2',
            label: 'Activity',
            icon: <AreaChartOutlined />,
            children: <VisitActivity id={data?.id || ''} />,
        },
    ];

    return (
        <PageLayout breadCrumbItems={[
            {
                title: <Link>Visit Planner</Link>,
                onClick: () => navigate(buildUrl('visitDashboard'))
            }
        ]}>
            <Row gutter={12} className='flex-col gap-6'>
                <Row gutter={12}>
                    <Col span={24}>
                        <Typography className='font-semibold text-2xl'><Badge className='mr-2' status={getVisitBadgeColor(data?.visitType || VisitType.SALES)} /> Visiting {data?.contact.name}</Typography>
                    </Col>
                </Row>
                <Row gutter={[12, 12]}>
                    <Col span={8}>
                        <Typography className='font-semibold text-base'>Store</Typography>
                        <Link href={buildUrl('viewStore', { id: data?.storeId })}>{data?.store.name}</Link>
                    </Col>
                    <Col span={8}>
                        <Typography className='font-semibold text-base'>Scheduled At</Typography>
                        <Tag color='blue'>{moment(data?.scheduledAt).format(dateFormat)}</Tag>
                    </Col>
                    <Col span={8}>
                        <Typography className='font-semibold text-base'>Contact</Typography>
                        <Link href={buildUrl('viewContact', { id: data?.contactId })}>{data?.contact.name}</Link>
                    </Col>
                </Row>

                <Row gutter={[12, 12]}>
                    <Col className='flex items-start justify-between gap-4' span={24}>
                        <Tabs defaultActiveKey="1" className='flex-1' items={items} />
                    </Col>
                </Row>

            </Row>
        </PageLayout>
    )
}

export default ViewVisit