import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Select, Timeline, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';

import { useCreateVisitActivityMutation, useLazyGetVisitActivitiesQuery } from '../../../services/visits';
import { VisitActivityForm } from '../../../services/visits/type';
import { VisitActivityArray } from '../../../config';
import { getActivityColor, getActivityLabel } from '../utils';
import { formatEnumLabel } from '../../../helpers';

interface VisitActivityProps {
    id: string;
}

const VisitActivity: React.FC<VisitActivityProps> = ({ id, }) => {
    const [form] = useForm<VisitActivityForm>();
    const [open, setOpen] = useState<boolean>(false);
    const [createVisitActivity, { isLoading: isCreating }] = useCreateVisitActivityMutation()
    const [fetchVisitActivities, { data: activities }] = useLazyGetVisitActivitiesQuery();

    const onSubmit = (data: VisitActivityForm) => {
        const values = {
            ...data,
            visitId: id
        }
        createVisitActivity(values).finally(() => {
            fetchVisitActivities({
                visitId: id
            });
            onClose();
        });
    }

    const onClose = () => {
        form.resetFields();
        setOpen(false);
    }

    useEffect(() => {
        if (id) {
            fetchVisitActivities({
                visitId: id
            });
        }
    }, [fetchVisitActivities, id])

    return (
        <div className='space-y-4'>
            <div className='w-full flex items-center justify-end'>
                <Button type='primary' onClick={() => {
                    setOpen(true);
                    form.resetFields();
                }} icon={<PlusOutlined />}>
                    Add
                </Button>
            </div>

            <div className="w-100 flex flex-wrap items-start justify-center gap-4">
                <Timeline
                    mode="alternate"
                    className='w-full'
                    items={activities?.map(({ type, details }) => ({
                        color: getActivityColor(type),
                        children: details,
                        label: <Typography className='text-base font-semibold'>
                            {getActivityLabel(type)}
                        </Typography>
                    }))}
                />
            </div>
            <Modal onOk={() => form.submit()} onCancel={onClose} open={open}>
                <Form disabled={isCreating} onFinish={onSubmit} layout='vertical' form={form}>
                    <Form.Item
                        label="Type"
                        name="type"
                        rules={[{ required: true, message: 'Please enter the Detail' }]}
                    >
                        <Select
                            options={VisitActivityArray?.map((type) => ({
                                value: type,
                                label: formatEnumLabel(type)
                            }))}
                            placeholder="Select Activity Type" />
                    </Form.Item>
                    <Form.Item
                        label="Detail"
                        name="details"
                        rules={[{ required: true, message: 'Please enter the Detail' }]}
                    >
                        <TextArea placeholder="something..." />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default VisitActivity