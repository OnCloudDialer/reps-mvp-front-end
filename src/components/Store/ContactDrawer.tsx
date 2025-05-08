import { ContactsOutlined } from '@ant-design/icons';
import { Button, Drawer } from 'antd';
import React from 'react';
import ContactForm from './ContactForm';
import { useCreateStoreContactMutation, useUpdateStoreContactMutation } from '../../services/store';
import { Contact } from '../../services/contact';


interface ContactDrawerProps {
    storeId: string;
    data?: Contact | undefined;
    onFinish: () => void;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ContactDrawer: React.FC<ContactDrawerProps> = ({ storeId, onFinish, data, open, setOpen }) => {
    const [createStoreContact, { isLoading: isCreating }] = useCreateStoreContactMutation()
    const [updateStoreContact, { isLoading: isUpdating }] = useUpdateStoreContactMutation()

    const onClose = () => {
        onFinish();
        setOpen(false);
    }

    return (
        <>
            <Button onClick={() => {
                setOpen(true);
            }} icon={<ContactsOutlined />} type='primary'>
                Add Contact
            </Button>
            <Drawer title="Add Contact" onClose={onClose} open={open}>
                <ContactForm data={data} loading={isCreating || isUpdating} onSubmit={(values) => {
                    const formValues = {
                        ...values,
                        storeId
                    }
                    if (data) {
                        updateStoreContact(formValues).then(onClose);
                    } else {
                        createStoreContact(formValues).then(onClose);
                    }

                }} />
            </Drawer>
        </>
    )
}

export default ContactDrawer