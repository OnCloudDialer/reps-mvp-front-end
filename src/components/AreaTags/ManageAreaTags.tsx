import { useState } from 'react';
import { Table, Button, Modal, Form, Input, Space, Popconfirm } from 'antd';
import PageLayout from '../common/PageLayout';
import { AreaTagForm, AreaTagType } from '../../services/areaTag/type';
import { useCreateAreaTagMutation, useDeleteAreaTagMutation, useGetAreaTagsQuery, useUpdateAreaTagMutation } from '../../services/areaTag';




export default function AreaTagManagement() {
    const [form] = Form.useForm<AreaTagForm>();
    const { data, isLoading, } = useGetAreaTagsQuery()
    const [createTag, { isLoading: isCreating }] = useCreateAreaTagMutation()
    const [deleteTag, { isLoading: isDeleting }] = useDeleteAreaTagMutation()
    const [updateTag, { isLoading: isUpdating }] = useUpdateAreaTagMutation()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTag, setEditingTag] = useState<AreaTagType | null>(null);

    const handleOpenModal = (tag: AreaTagType | null) => {
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
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Actions',
            render: (_: string, record: AreaTagType) => (
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
            title: 'Area tags'
        }]}>
            <Button type="primary" loading={isLoading} onClick={() => handleOpenModal(null)}>+ Add Area Tag</Button>
            <Table loading={isLoading || isDeleting} className="mt-4" rowKey="id" dataSource={data} columns={columns} />

            <Modal
                title={editingTag ? 'Edit Area Tag' : 'Add Area Tag'}
                open={isModalOpen}
                onOk={handleSubmit}
                onCancel={() => setIsModalOpen(false)}
            >
                <Form disabled={isCreating || isUpdating} form={form} layout="vertical">
                    <Form.Item hidden name={'id'} />
                    <Form.Item name="name" label="Area Tag Name" rules={[{ required: true, message: 'Please enter a area tag name' }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </PageLayout>
    );
}
