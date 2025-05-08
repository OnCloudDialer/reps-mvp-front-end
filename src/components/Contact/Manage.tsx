import { useEffect, useState } from 'react';
import PageLayout from '../common/PageLayout';
import { Button, Table, Modal } from 'antd';
import { Contact } from '../../services/contact/type';
import ContactForm from '../Store/ContactForm';
import { useCreateContactMutation, useLazyDeleteContactQuery, useLazyGetContactsQuery, useUpdateContactMutation } from '../../services/contact';
import ContactFilter from './Filter';
import ContactTableColumns from './TableColumns';

const ManageContacts = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingContact, setEditingContact] = useState<Contact | undefined>(undefined);
    const [createContact, { isLoading: isCreating }] = useCreateContactMutation()
    const [updateContact, { isLoading: isUpdating }] = useUpdateContactMutation()
    const [deleteContact, { isLoading: isDeleting }] = useLazyDeleteContactQuery()
    const [fetchContacts, { data: contacts, isLoading: isSearching }] = useLazyGetContactsQuery({})

    const handleOpenModal = (data: Contact | undefined) => {
        setEditingContact(data);
        setIsModalOpen(true);
    };


    const handleSubmit = () => {
        setIsModalOpen(false);
    };


    const columns = ContactTableColumns({
        onDelete: (id) => {
            deleteContact(id).then(() => {
                fetchContacts({})
            })
        },
        onEdit: (record) => {
            setEditingContact({
                ...record,
                // @ts-ignore
                storeIds: record.StoreContact?.map(({ storeId }) => storeId) || []
            });
            setIsModalOpen(true);
        }
    })

    useEffect(() => {
        fetchContacts({})
    }, [])


    return (
        <PageLayout breadCrumbItems={[
            {
                title: 'Contacts'
            }
        ]}>
            <div className='w-full flex items-center justify-between'>
                <ContactFilter onReset={() => fetchContacts({})} onSearch={fetchContacts} loading={isSearching} />
                <Button type="primary" loading={isCreating || isUpdating} onClick={() => handleOpenModal(undefined)}>+ Create Contact</Button>
            </div>

            <Table loading={isDeleting || isUpdating || isCreating || isSearching} className="mt-4" rowKey="id" dataSource={contacts} columns={columns} />

            <Modal
                footer={<></>}
                title={editingContact ? 'Edit Contact' : 'Add Contact'}
                open={isModalOpen}
                onOk={handleSubmit}
                onCancel={() => setIsModalOpen(false)}
            >
                <ContactForm
                    loading={isCreating || isUpdating}
                    onSubmit={(data) => {
                        if (data.id) {
                            updateContact(data);
                        } else {
                            createContact(data);
                        }
                        setIsModalOpen(false);
                    }}
                    data={editingContact}
                />

            </Modal>
        </PageLayout>
    );
}

export default ManageContacts