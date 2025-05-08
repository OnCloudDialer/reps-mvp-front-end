import { Form, Input, Select, Button, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { StoreQueryParams } from '../../services/store/type';
import { useGetTagsQuery } from '../../services/tag';


interface StoreSearchFilterProps {
    onSearch: (data: StoreQueryParams) => void;
    loading?: boolean;
    onReset: () => void;
}

const StoreSearchFilter = ({ onSearch, loading }: StoreSearchFilterProps) => {
    const [form] = Form.useForm<StoreQueryParams>();
    const { data: tags, isLoading } = useGetTagsQuery()

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
            disabled={loading}
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
                            loading={isLoading}
                            mode="multiple"
                            allowClear
                            placeholder="Filter by tags"
                            options={tags?.map(({ id, name }) => ({
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
