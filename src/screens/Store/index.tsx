import { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, Tag, Space, Popconfirm, Row, Col, Typography } from 'antd';
import { useGetTagsQuery } from '../../services/tag';
import { useCreateStoreMutation, useDeleteStoreMutation, useLazyGetStoreQuery, useUpdateStoreMutation } from '../../services/store';
import StoreSearchFilter from './components/Filter';
import Link from 'antd/es/typography/Link';
import { useNavigate } from 'react-router-dom';
import { buildUrl } from '../../helpers';
import { Store as StoreType, StoreForm, TagElement } from '../../services/store/type';
import { useGetAreaTagsQuery } from '../../services/areaTag';
import ChooseLocationMap from '../../components/common/Maps/ChooseLocationMap';
import PageLayout from '../../components/common/PageLayout';


export default function Store() {
    const [form] = Form.useForm<StoreForm>();
    const [stores, setStores] = useState<StoreType[]>([]);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: tags = [], } = useGetTagsQuery()
    const { data: areaTags, isLoading: isGettingAreaTags, } = useGetAreaTagsQuery()
    const [trigger, { data: storeData, isSuccess: isStoreFetched, isLoading }] = useLazyGetStoreQuery();

    const [createStore, { isLoading: isCreating }] = useCreateStoreMutation()
    const [updateStore, { isLoading: isUpdating }] = useUpdateStoreMutation()
    const [deleteStore, { isLoading: isDeleting }] = useDeleteStoreMutation()


    const [editingStore, setEditingStore] = useState<StoreType | null>(null);

    const handleOpenModal = (store: StoreType | null = null) => {
        setEditingStore(store);
        if (store) {
            form.setFieldsValue({ ...store, tagIds: store.tags.map(({ tagId }) => tagId) })
        } else {
            form.setFieldsValue({ name: '', latitude: 0, longitude: 0, tagIds: [], address: '', city: '', region: '' });
        }
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        deleteStore(id);
    };

    const handleSubmit = () => {
        form.validateFields().then(values => {
            if (editingStore && values.id) {
                updateStore(values);
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
            render: (val: string, record: StoreType) => <Link onClick={() => navigate(buildUrl('viewStore', { id: record.id }))} >{val}</Link>
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
            render: (_: string, record: StoreType) => `${record.latitude}, ${record.longitude}`
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
            render: (_: string, record: StoreType) => (
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
        if (isStoreFetched) {
            setStores(storeData);
        }
    }, [isStoreFetched, storeData]);


    useEffect(() => {
        trigger(undefined);
    }, [])

    return (
        <PageLayout breadCrumbItems={[{
            title: 'Stores'
        }]}>

            <div className="bg-white p-4 px-0 flex items-center justify-between rounded-md w-100">
                <StoreSearchFilter onReset={() => {
                    trigger({
                    })
                }} onSearch={(data) => {
                    trigger(data)
                }} />
                <Button type="primary" onClick={() => handleOpenModal()}>+ Add Store</Button>
            </div>
            <Table loading={isLoading} className="mt-4" rowKey="id" dataSource={stores} columns={columns} />
            <Modal
                title={editingStore ? 'Edit Store' : 'Add Store'}
                open={isModalOpen}
                onOk={handleSubmit}
                className='min-w-[700px]'
                onCancel={() => {
                    setIsModalOpen(false);
                    setEditingStore(null);
                }}
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
                        <Col span={24}>
                            <Form.Item
                                name="areaTagId"
                                label="Area Tag"
                            >
                                <Select
                                    loading={isGettingAreaTags}
                                    style={{ width: '100%' }}
                                    options={(areaTags || []).map(({ id, name }) => ({
                                        label: name,
                                        value: id
                                    }))}
                                    placeholder="Select the Area Tag"
                                />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item hidden name={'latitude'} />
                            <Form.Item hidden name={'longitude'} />
                            <Form.Item label={<Typography className='font-semibold mb-2'>
                                Choose Store Location
                            </Typography>} name={'location'}>
                                <ChooseLocationMap currentLocation={editingStore ? {
                                    lat: editingStore.latitude,
                                    lng: editingStore.longitude,
                                } : undefined} onFinish={(data) => {
                                    if (data.lat && data.lng) {
                                        form.setFieldsValue({
                                            latitude: data.lat,
                                            longitude: data.lng,
                                        })
                                    }
                                }} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </PageLayout>
    );
}
