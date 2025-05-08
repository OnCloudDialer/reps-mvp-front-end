import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar, Tag, Popconfirm, Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Contact } from '../../services/contact/type';
import { useNavigate } from 'react-router-dom';
import { buildUrl } from '../../helpers';


interface ContactTableColumnsProps {
    onDelete: (id: string) => void;
    onEdit: (record: Contact) => void;
}

const ContactTableColumns = ({ onDelete, onEdit }: ContactTableColumnsProps) => {
    const navigate = useNavigate();
    const columns: ColumnsType<Contact> = [
        {
            title: 'Picture',
            dataIndex: 'profilePicture',
            key: 'profilePicture',
            render: (pic, record: Contact) =>
                pic ? <Avatar src={pic} /> : <Avatar icon={record.name} />,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            render: (_, record: Contact) => {
                return <Button key={record.id} onClick={() => {
                    navigate(buildUrl('viewContact', { id: record.id }))
                }} type='link'>
                    {record.name}
                </Button>
            },
            key: 'name',
        },

        {
            title: 'Role',
            dataIndex: 'role',
            render: (_, record: Contact) => {
                return <Tag color='blue'>
                    {record.role}
                </Tag>
            },
            key: 'role',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            render: (_, record: Contact) => {
                return record.email
            },
            key: 'email',
        },

        {
            title: 'Phone',
            dataIndex: 'phone',
            render: (_, record: Contact) => {
                return record.phone
            },
            key: 'phone',
        },

        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record: Contact) => {
                return <>
                    <Popconfirm onConfirm={() => {
                        onDelete(record.id)
                    }} title="Are you sure you want to Delete this Contact?">
                        <Button type='text' danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                    <Button type='text' onClick={() => {
                        onEdit(record);
                    }} icon={<EditOutlined />} />
                </>
            },
            key: 'action',
        },
    ];
    return columns;
}

export default ContactTableColumns 