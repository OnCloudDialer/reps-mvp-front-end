import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';

import moment from 'moment';
import { useCreateVisitNoteMutation, useLazyGetVisitNotesQuery } from '../../../services/visits';
import { VisitNoteForm } from '../../../services/visits/type';

interface VisitNotesProps {
    id: string;
}

const VisitNotes: React.FC<VisitNotesProps> = ({ id, }) => {
    const [form] = useForm<VisitNoteForm>();
    const [open, setOpen] = useState<boolean>(false);
    const [createVisitNote, { isLoading: isCreating }] = useCreateVisitNoteMutation()
    const [fetchVisitNotes, { data: storeNotes, }] = useLazyGetVisitNotesQuery();

    const onSubmit = (data: VisitNoteForm) => {
        const values = {
            ...data,
            visitId: id
        }
        createVisitNote(values).finally(() => {
            fetchVisitNotes({
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
            fetchVisitNotes({
                visitId: id
            });
        }
    }, [fetchVisitNotes, id])

    return (
        <div className='space-y-4'>
            <div className='w-full flex items-center justify-end'>
                {/* <NotesFilter loading={isSearching} onReset={() => { }} onSearch={() => {
                    fetchstoreNotes(data);
                }} /> */}
                <Button type='primary' onClick={() => {
                    setOpen(true);
                    form.resetFields();
                }} icon={<PlusOutlined />}>
                    New
                </Button>
            </div>

            <div className="w-100 flex flex-wrap items-start justify-start gap-4">
                {
                    storeNotes?.map((item) => {
                        return <Card className='min-w-72 drop-shadow-md' title={moment(item.createdAt).format('MMM Do YY')} key={item.id}>
                            {item.content}
                        </Card>
                    })
                }
            </div>
            <Modal onOk={() => form.submit()} onCancel={onClose} open={open}>
                <Form disabled={isCreating} onFinish={onSubmit} layout='vertical' form={form}>
                    <Form.Item
                        label="Note"
                        name="content"
                        rules={[{ required: true, message: 'Please enter the Note' }]}
                    >
                        <TextArea placeholder="John Doe" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default VisitNotes