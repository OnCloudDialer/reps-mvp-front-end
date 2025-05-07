import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Select, Tag, Space, Popconfirm, Row, Col } from 'antd';
import { Tag as TagType } from '../../services/tag/type';
import { useGetTagsQuery } from '../../services/tag';
import { useCreateStoreMutation, useDeleteStoreMutation, useLazyGetStoreQuery, useUpdateStoreMutation } from '../../services/store';
import StoreSearchFilter from './Filter';
import Link from 'antd/es/typography/Link';
import { useNavigate } from 'react-router-dom';
import { buildUrl } from '../../helpers';
import { Store, TagElement } from '../../services/store/type';
import PageLayout from '../common/PageLayout';


export default function ManageStore() {
    const [form] = Form.useForm();
    const [stores, setStores] = useState<Store[]>([]);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tags, setTags] = useState<TagType[]>([]);
    const { data, isSuccess, } = useGetTagsQuery({})
    const [trigger, { data: storeData, isSuccess: isStoreFetched, isLoading }] = useLazyGetStoreQuery();

    const [createStore, { isLoading: isCreating }] = useCreateStoreMutation()
    const [updateStore, { isLoading: isUpdating }] = useUpdateStoreMutation()
    const [deleteStore, { isLoading: isDeleting }] = useDeleteStoreMutation()


    const [editingStore, setEditingStore] = useState<Store | null>(null);

    const handleOpenModal = (store: Store | null = null) => {
        setEditingStore(store);
        if (store) {
            form.setFieldsValue({ ...store, tagIds: store.tags.map(({ tagId }) => tagId) })
        } else {
            form.setFieldsValue({ name: '', latitude: '', longitude: '', tags: [] });
        }
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        deleteStore(id);
    };

    const handleSubmit = () => {
        form.validateFields().then(values => {
            if (editingStore) {
                updateStore({ id: values.id, data: values });
            } else {
                createStore(values)
            }
            setIsModalOpen(false);
            form.resetFields();
        });
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (val: string, record: Store) => <Link onClick={() => navigate(buildUrl('viewStore', { id: record.id }))} >{val}</Link>
        },
        {
            title: 'Region',
            dataIndex: 'region'
        },
        {
            title: 'City',
            dataIndex: 'city'
        },
        {
            title: 'Address',
            dataIndex: 'address'
        },
        {
            title: 'Location',
            render: (_, record: Store) => `${record.latitude}, ${record.longitude}`
        },
        {
            title: 'Tags',
            dataIndex: 'tags',
            render: (tags: TagElement[]) => (
                <>
                    {tags.map(({ tag }) => (
                        <Tag color="blue" key={tag.id}>{tag.name}</Tag>
                    ))}
                </>
            )
        },
        {
            title: 'Actions',
            render: (_, record: Store) => (
                <Space>
                    <Button onClick={() => handleOpenModal(record)}>Edit</Button>
                    <Popconfirm title="Are you sure?" onConfirm={() => handleDelete(record.id)}>
                        <Button loading={isDeleting} danger>Delete</Button>
                    </Popconfirm>
                </Space>
            )
        }
    ];

    useEffect(() => {
        if (isSuccess) {
            setTags(data);
        }
    }, [isSuccess, data]);

    useEffect(() => {
        if (isStoreFetched) {
            setStores(storeData.data);
        }
    }, [isStoreFetched, storeData]);


    useEffect(() => {
        trigger({});
    }, [])

    return (
        <PageLayout breadCrumbItems={[]}>

            <div className="bg-white p-4 px-0 flex items-center justify-between rounded-md w-100">
                <StoreSearchFilter onSearch={(data) => {
                    trigger(data)
                }} tags={tags} />
                <Button type="primary" onClick={() => handleOpenModal()}>+ Add Store</Button>
            </div>
            <Table loading={isLoading} className="mt-4" rowKey="id" dataSource={stores} columns={columns} />
            <Modal
                title={editingStore ? 'Edit Store' : 'Add Store'}
                open={isModalOpen}
                onOk={handleSubmit}
                onCancel={() => setIsModalOpen(false)}
            >
                <Form disabled={isCreating || isUpdating} form={form} layout="vertical">
                    <Form.Item name='id' hidden />

                    <Row gutter={12}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Store Name"
                                rules={[{ required: true, message: 'Please enter a name' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="address"
                                label="Address"
                                rules={[{ required: true, message: 'Please enter an address' }]}
                            >
                                <Input />
                            </Form.Item>

                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="city"
                                label="City"
                                rules={[{ required: true, message: 'Please enter a city' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="region"
                                label="Region"
                                rules={[{ required: true, message: 'Please enter a region' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="latitude"
                                label="Latitude"
                                rules={[{ required: true, message: 'Enter latitude' }]}
                            >
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="longitude"
                                label="Longitude"
                                rules={[{ required: true, message: 'Enter longitude' }]}
                            >
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                name="tagIds"
                                label="Tags"
                            >
                                <Select
                                    mode="tags"
                                    style={{ width: '100%' }}
                                    options={tags.map(({ id, name }) => ({
                                        label: name,
                                        value: id
                                    }))}
                                    placeholder="Enter or select tags"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </PageLayout>
    );
}
