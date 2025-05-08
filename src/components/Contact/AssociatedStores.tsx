import { Table, Tag } from 'antd';
import React, { useEffect } from 'react';
import { useLazyGetStoreQuery } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { buildUrl } from '../../helpers';
import { Store, TagElement } from '../../services/store/type';
import Link from 'antd/es/typography/Link';
import StoreSearchFilter from '../Store/Filter';


interface AssociatedStoresProps {
    id: string;
}

const AssociatedStores: React.FC<AssociatedStoresProps> = ({
    id
}) => {
    const [fetchStores, { isLoading, data }] = useLazyGetStoreQuery()
    const navigate = useNavigate()


    useEffect(() => {
        if (id) {
            fetchStores({
                contactId: id
            });
        }
    }, [id])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (val: string, record: Store) => <Link onClick={() => navigate(buildUrl('viewStore', { id: record.id }))} >{val}</Link>
        },
        {
            title: 'Region',
            dataIndex: 'region'
        },
        {
            title: 'City',
            dataIndex: 'city'
        },
        {
            title: 'Address',
            dataIndex: 'address'
        },
        {
            title: 'Location',
            render: (_: string, record: Store) => `${record.latitude}, ${record.longitude}`
        },
        {
            title: 'Tags',
            dataIndex: 'tags',
            render: (tags: TagElement[]) => (
                <>
                    {tags.map(({ tag }) => (
                        <Tag color="blue" key={tag.id}>{tag.name}</Tag>
                    ))}
                </>
            )
        },
    ];


    return (
        <div className='space-y-4'>
            <div className='w-full flex items-center justify-between'>
                <StoreSearchFilter loading={isLoading} onReset={() => fetchStores(undefined)} onSearch={fetchStores} />
            </div>
            <Table
                columns={columns}
                loading={isLoading}
                dataSource={data || []}
                rowKey="id"
                pagination={{ pageSize: 10 }}
            />
        </div>
    )
}

export default AssociatedStores