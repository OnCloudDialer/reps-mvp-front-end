import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import { useCreateContactNoteMutation, useLazyGetContactNotesQuery } from '../../../services/contact';
import { NoteForm } from '../../../services/note/type';

import moment from 'moment';
import NotesFilter from './NotesFilter';

interface ContactNotesProps {
    id: string;
    contactName: string;
}

const ContactNotes: React.FC<ContactNotesProps> = ({ id, contactName }) => {
    const [form] = useForm<NoteForm>();
    const [open, setOpen] = useState<boolean>(false);
    const [createContactNote, { isLoading: isCreating }] = useCreateContactNoteMutation()
    const [fetchContactNotes, { data: contactNotes, isLoading: isSearching }] = useLazyGetContactNotesQuery();

    const onSubmit = (data: NoteForm) => {
        const values = {
            ...data,
            contactId: id
        }
        createContactNote(values).finally(() => {
            fetchContactNotes({
                contactId: id
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
            fetchContactNotes({
                contactId: id
            });
        }
    }, [fetchContactNotes, id])

    return (
        <div className='space-y-4'>
            <div className='w-full flex items-center justify-between'>
                <NotesFilter loading={isSearching} onReset={() => { }} onSearch={() => {
                    // fetchContactNotes(data);
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
                    contactNotes?.map((item) => {
                        return <Card className='min-w-72 drop-shadow-md' title={moment(item.createdAt).format('MMM Do YY')} key={item.id}>
                            {item.content}
                        </Card>
                    })
                }
            </div>
            <Modal onOk={() => form.submit()} onCancel={onClose} title={`Note For ${contactName}`} open={open}>
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

export default ContactNotes