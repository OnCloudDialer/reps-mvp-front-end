import { Avatar, Button, Col, Form, Input, Popconfirm, Row, Select, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { useDeleteStoreContactMutation, useLazyGetStoreContactsByIdQuery } from '../../services/store';
import ContactDrawer from './ContactDrawer';
import { StoreContact } from '../../services/store/type';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { contactRole } from '../../config';
import { Contact } from '../../services/contact';



interface StoreContactsProps {
    storeId: string;
}

const StoreContacts: React.FC<StoreContactsProps> = ({ storeId }) => {
    const [form] = Form.useForm<{
        name: string;
        role: string
    }>();
    const [fetchContacts, { data: storeContacts, isLoading }] = useLazyGetStoreContactsByIdQuery();
    const [deleteStoreContact] = useDeleteStoreContactMutation();
    const [open, setOpen] = useState<boolean>(false);
    const [editContact, setEditContact] = useState<Contact | undefined>(undefined);


    const deleteContact = (contactId: string) => {
        deleteStoreContact(contactId);
    }

    const columns: ColumnsType<StoreContact> = [
        {
            title: 'Picture',
            dataIndex: 'profilePicture',
            key: 'profilePicture',
            render: (pic, record: StoreContact) =>
                pic ? <Avatar src={pic} /> : <Avatar icon={record.contact.name} />,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            render: (_, record: StoreContact) => {
                return record.contact.name
            },
            key: 'name',
        },

        {
            title: 'Role',
            dataIndex: 'role',
            render: (_, record: StoreContact) => {
                return <Tag color='blue'>
                    {record.contact.role}
                </Tag>
            },
            key: 'role',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            render: (_, record: StoreContact) => {
                return record.contact.email
            },
            key: 'email',
        },

        {
            title: 'Phone',
            dataIndex: 'phone',
            render: (_, record: StoreContact) => {
                return record.contact.phone
            },
            key: 'phone',
        },

        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record: StoreContact) => {
                return <>
                    <Popconfirm onConfirm={() => {
                        deleteContact(record.contactId)
                    }} title="Are you sure you want to Delete this Contact?">
                        <Button type='text' danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                    <Button type='text' onClick={() => {
                        setEditContact(record.contact);
                        setOpen(true);
                    }} icon={<EditOutlined />} />
                </>
            },
            key: 'action',
        },
    ];

    useEffect(() => {
        if (storeId) {
            fetchContacts({
                id: storeId
            });
        }
    }, [storeId])

    return (
        <div className='space-y-4'>
            <div className='w-full flex items-center justify-between'>
                <Form
                    form={form}
                    layout="inline"
                    onFinish={(values) => {
                        fetchContacts({
                            id: storeId,
                            roles: values.role,
                            name: values.name,
                        })
                    }}
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
                                fetchContacts({
                                    id: storeId
                                })
                            }} >Reset</Button>
                        </Col>
                    </Row>
                </Form>

                <ContactDrawer setOpen={setOpen} open={open} data={editContact} onFinish={() => {
                    // 
                }} storeId={storeId} />
            </div>
            <Table
                columns={columns}
                loading={isLoading}
                dataSource={storeContacts?.data || []}
                rowKey="id"
                pagination={{ pageSize: 10 }}
            />
        </div>
    )
}

export default StoreContacts