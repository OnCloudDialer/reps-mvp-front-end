import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../common/Loading';
import PageLayout from '../common/PageLayout';
import { buildUrl } from '../../helpers';
import Link from 'antd/es/typography/Link';
import { Col, Row, Tabs, TabsProps, Typography, Image } from 'antd';
import { useLazyGetProductByIdQuery } from '../../services/product';
import { CameraTwoTone } from '@ant-design/icons';

const ViewProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [fetchProduct, { isLoading, data }] = useLazyGetProductByIdQuery();


    useEffect(() => {
        if (id) {
            fetchProduct(id);
        }
    }, [id, fetchProduct]);


    if (isLoading) {
        return <Loading />
    }

    const items: TabsProps['items'] = [

    ];

    return (
        <PageLayout breadCrumbItems={[
            {
                title: <Link>Products</Link>,
                onClick: () => navigate(buildUrl('manageProducts'))
            }
        ]}>
            {/* Display Store Detail */}
            <Row className='flex-col gap-4'>
                <Row >
                    <Col span={24}>
                        <Typography className='font-semibold text-2xl'>{data?.name}</Typography>
                        <Typography className='font-normal text-base mt-4'>{data?.description}</Typography>
                    </Col>
                </Row>
                <Row className='flex-row justify-between'>
                    <Col span={12}>
                        <Row className='gap-4'>
                            <Col className='!px-0' span={8}>
                                <Typography className='font-semibold text-base mb-2'>Unit Of Measure</Typography>
                                <Typography>{data?.unit_of_measure}</Typography>
                            </Col>
                            <Col span={8}>
                                <Typography className='font-semibold text-base mb-2'>Regular Price</Typography>
                                <Typography>{data?.regular_price}</Typography>
                            </Col>
                            <Col span={8}>
                                <Typography className='font-semibold text-base mb-2'>Special Price</Typography>
                                <Typography>{data?.special_price}</Typography>
                            </Col>
                            <Col span={8}>
                                <Typography className='font-semibold text-base mb-2'>Default Price</Typography>
                                <Typography>{data?.default_price}</Typography>
                            </Col>
                            <Col span={8}>
                                <Typography className='font-semibold text-base mb-2'>Shareable Info</Typography>
                                <Typography>{data?.shareable_info}</Typography>
                            </Col>
                            <Col span={8}>
                                <Typography className='font-semibold text-base mb-2'>Announcements</Typography>
                                <Typography>{data?.announcements}</Typography>
                            </Col>

                        </Row>
                    </Col>
                    <Col className='overflow-auto max-h-72 ' span={12}>
                        <Typography className='font-semibold text-base mb-2'>Images <CameraTwoTone className='ml-2' /></Typography>
                        <div className='flex flex-wrap items-start justify-start gap-2'>

                            {
                                data?.imageUrls.map(({ id, url }) =>

                                    <Image
                                        key={id}
                                        width={200}
                                        src={`http://localhost:3000/files/${url}`}
                                    />

                                )
                            }

                        </div>
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

export default ViewProduct