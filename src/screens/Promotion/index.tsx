import { useState } from 'react';
import { Table, Button, Modal, Form, Input, Space, Popconfirm, Select, DatePicker, Switch, Tag } from 'antd';
import PageLayout from '../../components/common/PageLayout';
import { Promotion as PromotionType, PromotionForm } from '../../services/product/type';
import { useCreatePromotionMutation, useDeletePromotionMutation, useGetPromotionQuery, useUpdatePromotionMutation } from '../../services/product';
import { dateFormat, PromotionTypeArray } from '../../config';
import { formatEnumLabel } from '../../helpers';
import dayjs from 'dayjs';
import moment from 'moment';
const { TextArea } = Input;



export default function Promotion() {
    const [form] = Form.useForm<PromotionForm>();
    const { data, isLoading, } = useGetPromotionQuery()
    const [createPromotion, { isLoading: isCreating }] = useCreatePromotionMutation()
    const [deletePromotion, { isLoading: isDeleting }] = useDeletePromotionMutation()
    const [updatePromotion, { isLoading: isUpdating }] = useUpdatePromotionMutation()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPromotion, setEditingPromotion] = useState<PromotionType | null>(null);

    const handleOpenModal = (promotion: PromotionType | null) => {
        setEditingPromotion(promotion);
        form.setFieldsValue({
            ...promotion,
            valid_from: dayjs(promotion?.valid_from),
            valid_to: dayjs(promotion?.valid_to),
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        deletePromotion(id);
    };

    const handleSubmit = () => {
        form.validateFields().then(values => {
            if (editingPromotion) {
                updatePromotion(values)
            } else {
                createPromotion({
                    name: values.name,
                    description: values.description,
                    is_active: values.is_active,
                    notes_for_rep: values.notes_for_rep,
                    valid_from: values.valid_from,
                    type: values.type,
                    valid_to: values.valid_to,
                    value: values.value
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
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Status',
            dataIndex: 'is_active',
            render(value: boolean) {
                return value ? <Tag color='blue'>Active</Tag> : <Tag color='red'>In-Active</Tag>
            }
        },

        {
            title: 'Type',
            dataIndex: 'type',
            render(value: string) {
                return <Tag color='blue'>{formatEnumLabel(value)}</Tag>
            }
        },
        {
            title: 'Valid To',
            dataIndex: 'valid_to',
            render(value: string) {
                return <Tag color='orange'>{moment(value).format(dateFormat)}</Tag>
            }
        },
        {
            title: 'Valid From',
            dataIndex: 'valid_from',
            render(value: string) {
                return <Tag color='green'>{moment(value).format(dateFormat)}</Tag>
            }
        },
        {
            title: 'Actions',
            render: (_: string, record: PromotionType) => (
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
            title: 'Promotions'
        }]}>
            <Button type="primary" loading={isLoading} onClick={() => handleOpenModal(null)}>+ Create Promotion</Button>
            <Table loading={isLoading || isDeleting} className="mt-4" rowKey="id" dataSource={data} columns={columns} />

            <Modal
                title={editingPromotion ? 'Edit Promotion' : 'Add Promotion'}
                open={isModalOpen}
                onOk={handleSubmit}
                onCancel={() => setIsModalOpen(false)}
            >
                <Form
                    disabled={isCreating || isUpdating}
                    form={form}
                    layout="vertical"
                >
                    <Form.Item hidden name="id" />

                    <Form.Item
                        name="name"
                        label="Promotion Name"
                        rules={[{ required: true, message: 'Please enter a promotion name' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item name="description" label="Description">
                        <TextArea rows={3} />
                    </Form.Item>

                    <Form.Item
                        name="type"
                        label="Promotion Type"
                        rules={[{ required: true, message: 'Please select a promotion type' }]}
                    >
                        <Select options={PromotionTypeArray.map((item) => ({ label: formatEnumLabel(item), value: item }))} />
                    </Form.Item>

                    <Form.Item
                        name="value"
                        label="Value (JSON)"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter a valid JSON object',
                            },
                            {
                                validator(_, val) {
                                    try {
                                        JSON.parse(val);
                                        return Promise.resolve();
                                    } catch {
                                        return Promise.reject('Invalid JSON format');
                                    }
                                },
                            },
                        ]}
                    >
                        <TextArea
                            rows={4}
                        />
                    </Form.Item>

                    <Form.Item
                        name="valid_from"
                        label="Valid From"
                        className='w-full'
                        rules={[{ required: true, message: 'Please select a valid From' }]}
                    >
                        <DatePicker
                            className='w-full'
                        />
                    </Form.Item>
                    <Form.Item
                        name="valid_to"
                        label="Valid To"
                        className='w-full'
                        rules={[{ required: true, message: 'Please select a valid To' }]}
                    >
                        <DatePicker
                            className='w-full'
                        />
                    </Form.Item>

                    <Form.Item
                        name="is_active"
                        label="Is Promotion Active?"
                        valuePropName="checked"
                        className='flex-row flex items-center justify-start gap-2'
                    >
                        <Switch checkedChildren="Enabled" unCheckedChildren="Disabled" />
                    </Form.Item>

                    <Form.Item name="notes_for_rep" label="Notes for Rep">
                        <TextArea rows={2} />
                    </Form.Item>
                </Form>
            </Modal>
        </PageLayout>
    );
}
