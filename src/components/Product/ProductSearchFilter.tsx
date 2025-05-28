import { Form, Input, Button, Row, Col, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { ProductQueryParam } from '../../services/product/type';
import { UnitOfMeasureArray } from '../../config';


interface StoreSearchFilterProps {
    onSearch: (data: ProductQueryParam) => void;
    loading?: boolean;
    onReset: () => void;
}

const ProductSearchFilter = ({ onSearch, loading }: StoreSearchFilterProps) => {
    const [form] = Form.useForm<ProductQueryParam>();

    const handleFinish = (values: ProductQueryParam) => {
        onSearch(values);
    };

    const handleReset = () => {
        form.resetFields();
        onSearch({});
    };

    return (
        <Form
            form={form}
            layout="inline"
            disabled={loading}
            onFinish={handleFinish}
            className='w-full'
        >
            <Row className='w-full' gutter={[2, 2]}>
                <Col span={4}>
                    <Form.Item name="name" >
                        <Input placeholder="Search by name" />
                    </Form.Item>

                </Col>
                <Col span={4}>
                    <Form.Item name="unit" >
                        <Select placeholder="Search By Unit" options={UnitOfMeasureArray.map((value) => ({
                            value,
                            label: value
                        }))} />
                    </Form.Item>
                </Col>


                <Col span={12} className='space-x-2'>
                    <Button type="primary" htmlType="submit" icon={<SearchOutlined />} />
                    <Button onClick={handleReset}>Reset</Button>
                </Col>
            </Row>
        </Form>
    );
};

export default ProductSearchFilter;
