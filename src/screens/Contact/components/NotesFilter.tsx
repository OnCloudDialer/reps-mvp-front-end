import { SearchOutlined } from '@ant-design/icons';
import { Form, Row, Col, Button, DatePicker } from 'antd';
import { ContactNoteQueryParams } from '../../../services/contact/type';
import React from 'react';
const { RangePicker } = DatePicker;

interface ContactFilterProps {
    onSearch: (data: ContactNoteQueryParams) => void;
    onReset: () => void;
    loading: boolean;
}

const NotesFilter: React.FC<ContactFilterProps> = ({ onSearch, onReset, loading }) => {
    const [form] = Form.useForm<ContactNoteQueryParams>();


    return (
        <Form
            form={form}
            layout="inline"
            disabled={loading}
            onFinish={(values) => {

                onSearch({
                    ...values,
                })
            }}
            className='w-full'
        >
            <Row className='w-full' gutter={[4, 4]}>
                <Col span={8}>
                    <Form.Item className='w-full' name="name" >
                        <RangePicker className='w-full' placeholder={['Choose Date Range', 'Choose Date Range']} />
                    </Form.Item>
                </Col>
                <Col span={12} className='space-x-2'>
                    <Button type="primary" htmlType="submit" icon={<SearchOutlined />} />
                    <Button onClick={() => {
                        form.resetFields();
                        onReset()
                    }} >Reset</Button>
                </Col>
            </Row>
        </Form>
    )
}

export default NotesFilter