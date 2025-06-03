import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import { NoteForm } from '../../../services/note/type';

import moment from 'moment';
import { useCreateStoreNoteMutation, useLazyGetStoreNotesQuery } from '../../../services/store';
import NotesFilter from '../../Contact/components/NotesFilter';

interface StoreNotesProps {
    id: string;
    storeName: string;
}

const StoreNotes: React.FC<StoreNotesProps> = ({ id, storeName }) => {
    const [form] = useForm<NoteForm>();
    const [open, setOpen] = useState<boolean>(false);
    const [createStoreNote, { isLoading: isCreating }] = useCreateStoreNoteMutation()
    const [fetchStoreNotes, { data: storeNotes, isLoading: isSearching }] = useLazyGetStoreNotesQuery();

    const onSubmit = (data: NoteForm) => {
        const values = {
            ...data,
            storeId: id
        }
        createStoreNote(values).finally(() => {
            fetchStoreNotes({
                storeId: id
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
            fetchStoreNotes({
                storeId: id
            });
        }
    }, [fetchStoreNotes, id])

    return (
        <div className='space-y-4'>
            <div className='w-full flex items-center justify-between'>
                <NotesFilter loading={isSearching} onReset={() => { }} onSearch={() => {
                    // fetchstoreNotes(data);
                }} />
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
            <Modal onOk={() => form.submit()} onCancel={onClose} title={`Note For ${storeName}`} open={open}>
                <Form disabled={isCreating} onFinish={onSubmit} layout='vertical' form={form}>
                    <Form.Item
                        label="Note"
                        name="note"
                        rules={[{ required: true, message: 'Please enter the Note' }]}
                    >
                        <TextArea placeholder="John Doe" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default StoreNotes