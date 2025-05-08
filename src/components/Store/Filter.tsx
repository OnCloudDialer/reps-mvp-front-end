import { Form, Input, Select, Button, Row, Col } from 'antd';
import { Tag } from '../../services/tag/type';
import { SearchOutlined } from '@ant-design/icons';
import { StoreQueryParams } from '../../services/store/type';


interface StoreSearchFilterProps {
    tags: Tag[];
    onSearch: (data: StoreQueryParams) => void;
}

const StoreSearchFilter = ({ tags = [], onSearch }: StoreSearchFilterProps) => {
    const [form] = Form.useForm<StoreQueryParams>();

    const handleFinish = (values: StoreQueryParams) => {
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
            onFinish={handleFinish}
            className='w-full'
        >
            <Row className='w-full' gutter={2}>
                <Col span={6}>
                    <Form.Item name="name" >
                        <Input placeholder="Search by name" />
                    </Form.Item>
                </Col>

                <Col span={6}>
                    <Form.Item name="tags">
                        <Select
                            mode="multiple"
                            allowClear
                            placeholder="Filter by tags"
                            options={tags.map(({ id, name }) => ({
                                label: name,
                                value: id
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

export default StoreSearchFilter;
