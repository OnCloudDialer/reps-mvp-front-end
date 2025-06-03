
import { Form, Select, Button, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { StoreQueryParams } from '../../../services/store/type';
import { useGetTagsQuery } from '../../../services/tag';
import { VisitQueryParams } from '../../../services/visits/type';


interface VisitFiltersProps {
    onSearch: (data: VisitQueryParams) => void;
    loading?: boolean;
    onReset: () => void;
}

const VisitFilters = ({ onSearch, loading }: VisitFiltersProps) => {
    const [form] = Form.useForm<VisitQueryParams>();
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
            <Row className='w-full' gutter={[2, 2]}>

                <Col span={4}>
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

export default VisitFilters;
