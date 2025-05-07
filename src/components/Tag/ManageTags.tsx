import { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Space, Popconfirm, Tag } from 'antd';
import { useCreateTagMutation, useDeleteTagMutation, useGetTagsQuery, useUpdateTagMutation } from '../../services/tag';
import { Tag as TagType } from '../../services/tag/type';
import PageLayout from '../common/PageLayout';




export default function TagManagementUI() {
    const [form] = Form.useForm();
    const [tags, setTags] = useState<TagType[]>([]);
    const { data, isLoading, isSuccess, } = useGetTagsQuery({})
    const [createTag, { isLoading: isCreating }] = useCreateTagMutation()
    const [deleteTag, { isLoading: isDeleting }] = useDeleteTagMutation()
    const [updateTag, { isLoading: isUpdating }] = useUpdateTagMutation()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTag, setEditingTag] = useState<TagType | null>(null);

    const handleOpenModal = (tag: TagType | null) => {
        setEditingTag(tag);
        form.setFieldsValue(tag || { name: '', associatedStores: [] });
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        deleteTag(id);
    };

    const handleSubmit = () => {
        form.validateFields().then(values => {
            if (editingTag) {
                updateTag({
                    id: values.id, data: {
                        name: values.name
                    }
                })
            } else {
                createTag({
                    name: values.name
                })
            }
            setIsModalOpen(false);
            form.resetFields();
        });
    };

    useEffect(() => {
        if (isSuccess) {
            setTags(data);
        }
    }, [isSuccess, data]);

    const columns = [
        {
            title: 'Tag Name',
            dataIndex: 'name',
        },
        {
            title: 'Associated Stores',
            dataIndex: 'stores',
            render: (value: any) => {
                return <Space>
                    {value.map(({ store }) => (
                        <Tag color="blue" key={store.id}>{store.name}</Tag>
                    ))}
                </Space>
            },
        },
        {
            title: 'Actions',
            render: (_, record: TagType) => (
                <Space>
                    <Button loading={isDeleting} onClick={() => handleOpenModal(record)}>Edit</Button>
                    <Popconfirm title="Are you sure?" onConfirm={() => handleDelete(record.id)}>
                        <Button loading={isDeleting} danger>Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];



    return (
        <PageLayout breadCrumbItems={[]}>
            <Button type="primary" loading={isLoading} onClick={() => handleOpenModal(null)}>+ Add Tag</Button>
            <Table loading={isLoading || isDeleting} className="mt-4" rowKey="id" dataSource={tags} columns={columns} />

            <Modal
                title={editingTag ? 'Edit Tag' : 'Add Tag'}
                open={isModalOpen}
                onOk={handleSubmit}
                onCancel={() => setIsModalOpen(false)}
            >
                <Form disabled={isCreating || isUpdating} form={form} layout="vertical">
                    <Form.Item hidden name={'id'} />
                    <Form.Item name="name" label="Tag Name" rules={[{ required: true, message: 'Please enter a tag name' }]}>
                        <Input />
                    </Form.Item>
                    {/* <Form.Item name="stores" label="Associated Stores">
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Select associated stores"
                        >
                            {initialStores.map(store => (
                                <Option key={store} value={store}>{store}</Option>
                            ))}
                        </Select>
                    </Form.Item> */}
                </Form>
            </Modal>
        </PageLayout>
    );
}
