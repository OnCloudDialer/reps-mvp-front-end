import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDeleteStoreContactMutation } from '../../../services/store';
import ContactDrawer from './ContactDrawer';
import { Contact } from '../../../services/contact/type';
import { useLazyGetContactsQuery } from '../../../services/contact';
import ContactFilter from '../../Contact/components/Filter';
import ContactTableColumns from '../../Contact/components/TableColumns';



interface StoreContactsProps {
    storeId: string;
}

const StoreContacts: React.FC<StoreContactsProps> = ({ storeId }) => {
    const [fetchContacts, { data: storeContacts, isLoading }] = useLazyGetContactsQuery();
    const [deleteStoreContact] = useDeleteStoreContactMutation();
    const [open, setOpen] = useState<boolean>(false);
    const [editContact, setEditContact] = useState<Contact | undefined>(undefined);

    const deleteContact = (contactId: string) => {
        deleteStoreContact(contactId);
    }

    const columns = ContactTableColumns({
        onDelete: (contactId) => {
            deleteContact(contactId)
        },
        onEdit: (record) => {
            setEditContact({
                ...record,
                // @ts-ignore
                storeIds: record.StoreContact?.map(({ storeId }) => storeId) || []
            });
            setOpen(true);
        }
    });

    useEffect(() => {
        if (storeId) {
            fetchContacts({
            });
        }
    }, [storeId])

    return (
        <div className='space-y-4'>
            <div className='w-full flex items-center justify-between'>
                <ContactFilter loading={isLoading} onReset={() => fetchContacts(undefined)} onSearch={fetchContacts} />

                <ContactDrawer setOpen={setOpen} open={open} data={editContact} onFinish={() => {
                    // 
                    setOpen(false);
                }} storeId={storeId} />
            </div>
            <Table
                columns={columns}
                loading={isLoading}
                dataSource={storeContacts || []}
                rowKey="id"
                pagination={{ pageSize: 10 }}
            />
        </div>
    )
}

export default StoreContacts