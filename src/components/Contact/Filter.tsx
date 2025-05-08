import { SearchOutlined } from '@ant-design/icons';
import { Form, Row, Col, Input, Select, Button } from 'antd';
import { contactRole } from '../../config';
import { ContactQueryParams } from '../../services/contact/type';
import React from 'react';


interface ContactFilterProps {
    onSearch: (data: ContactQueryParams) => void;
    onReset: () => void;
    loading: boolean;
}

const ContactFilter: React.FC<ContactFilterProps> = ({ onSearch, onReset, loading }) => {
    const [form] = Form.useForm<ContactQueryParams>();


    return (
        <Form
            form={form}
            layout="inline"
            disabled={loading}
            onFinish={onSearch}
            className='w-full'
        >
            <Row className='w-full' gutter={2}>
                <Col span={6}>
                    <Form.Item name="name" >
                        <Input placeholder="Search by name" />
                    </Form.Item>
                </Col>

                <Col span={6}>
                    <Form.Item name="role">
                        <Select
                            mode="multiple"
                            allowClear
                            placeholder="Filter Role"
                            options={contactRole.map((role) => ({
                                label: role.replace('_', ' '),
                                value: role
                            }))}
                        />
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

export default ContactFilter