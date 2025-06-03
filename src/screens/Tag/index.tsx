import { useState } from 'react';
import { Table, Button, Modal, Form, Input, Space, Popconfirm, Tag } from 'antd';
import PageLayout from '../../components/common/PageLayout';
import { useGetTagsQuery, useCreateTagMutation, useDeleteTagMutation, useUpdateTagMutation } from '../../services/tag';
import { TagForm, TagStore, Tag as TagType } from '../../services/tag/type';




export default function Tags() {
    const [form] = Form.useForm<TagForm>();
    const { data, isLoading, } = useGetTagsQuery()
    const [createTag, { isLoading: isCreating }] = useCreateTagMutation()
    const [deleteTag, { isLoading: isDeleting }] = useDeleteTagMutation()
    const [updateTag, { isLoading: isUpdating }] = useUpdateTagMutation()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTag, setEditingTag] = useState<TagType | null>(null);

    const handleOpenModal = (tag: TagType | null) => {
        setEditingTag(tag);
        form.setFieldsValue(tag || { name: '', id: '' });
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        deleteTag(id);
    };

    const handleSubmit = () => {
        form.validateFields().then(values => {
            if (editingTag) {
                updateTag(values)
            } else {
                createTag({
                    name: values.name
                })
            }
            setIsModalOpen(false);
            form.resetFields();
        });
    };


    const columns = [
        {
            title: 'Tag Name',
            dataIndex: 'name',
        },
        {
            title: 'Associated Stores',
            dataIndex: 'stores',
            render: (value: TagStore[]) => {
                return <Space>
                    {value.map(({ store }) => (
                        <Tag color="blue" key={store.id}>{store.name}</Tag>
                    ))}
                </Space>
            },
        },
        {
            title: 'Actions',
            render: (_: string, record: TagType) => (
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
        <PageLayout breadCrumbItems={[{
            title: 'Tags'
        }]}>
            <Button type="primary" loading={isLoading} onClick={() => handleOpenModal(null)}>+ Add Tag</Button>
            <Table loading={isLoading || isDeleting} className="mt-4" rowKey="id" dataSource={data} columns={columns} />

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
                </Form>
            </Modal>
        </PageLayout>
    );
}
