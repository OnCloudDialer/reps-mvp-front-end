import { Button, Modal, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useCreateVisitMutation, useLazyGetVisitsQuery } from '../../services/visits';
import { useForm } from 'antd/es/form/Form';
import { VisitForm as VisitFormType } from '../../services/visits/type';
import VisitForm from './components/VisitForm';
import VisitCalendar from './components/VisitCalendar';
import VisitFilters from './components/VisitFilters';
import { useNavigate } from 'react-router-dom';
import { buildUrl } from '../../helpers';
import PageLayout from '../../components/common/PageLayout';


const Visit: React.FC = () => {
    const navigate = useNavigate()
    const [form] = useForm<VisitFormType>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [getVisits, { data: visits, }] = useLazyGetVisitsQuery();
    const [createVisit, { isLoading: isCreating }] = useCreateVisitMutation()

    const handleSubmit = () => {
        form.validateFields().then(values => {
            createVisit(values)
            setIsModalOpen(false);
            form.resetFields();
        });
    };


    useEffect(() => {
        getVisits({});
    }, [])

    return (
        <PageLayout breadCrumbItems={[{
            title: 'Visit Planner'
        }]}>
            <div className="w-full justify-between flex items-center mb-2">
                <Typography className='text-2xl'>Team Visit Calendar</Typography>
                <Button onClick={() => {
                    setIsModalOpen(true);
                    form.resetFields()
                }} type='primary'>Create New</Button>

            </div>

            <div className="w-full justify-between flex items-center">
                <VisitFilters onSearch={(params) => getVisits(params)} onReset={() => getVisits({})} />
            </div>
            <VisitCalendar onViewVisit={({ id }) => {
                navigate(buildUrl('viewVisit', {
                    id
                }))
            }} visits={visits || []} onDateSelect={(date) => {
                form.setFieldValue('scheduledAt', date)
                setIsModalOpen(true);
            }} />

            <Modal
                title={"Schedule a Visit"}
                open={isModalOpen}
                onOk={handleSubmit}
                onCancel={() => {
                    setIsModalOpen(false);
                    form.resetFields()
                }}
            >
                <VisitForm isLoading={isCreating} form={form} />
            </Modal>
        </PageLayout>
    )
}

export default Visit