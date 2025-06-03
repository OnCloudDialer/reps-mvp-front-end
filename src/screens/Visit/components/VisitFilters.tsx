
import { Form, Select, Button, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { VisitQueryParams } from '../../../services/visits/type';
import { VisitTypesArray } from '../../../config';


interface VisitFiltersProps {
    onSearch: (data: VisitQueryParams) => void;
    loading?: boolean;
    onReset: () => void;
}

const VisitFilters = ({ onSearch, loading }: VisitFiltersProps) => {
    const [form] = Form.useForm<VisitQueryParams>();

    const handleFinish = (values: VisitQueryParams) => {
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

                <Col span={6}>
                    <Form.Item name="type">
                        <Select
                            mode="multiple"
                            allowClear
                            placeholder="Filter by Type"
                            options={VisitTypesArray?.map((item) => ({
                                label: item,
                                value: item
                            }))}
                        />
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

export default VisitFilters;
