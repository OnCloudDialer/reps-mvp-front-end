import { Col, DatePicker, Form, Row, Select } from 'antd';
import { VisitForm as VisitFormType } from '../../../services/visits/type';
import { VisitTypesArray } from '../../../config';
import React from 'react';
import { useLazyGetContactsQuery } from '../../../services/contact';
import { useGetStoreQuery } from '../../../services/store';
import { FormInstance } from 'antd/es/form/Form';


interface VisitFormProps {
    isLoading: boolean;
    form: FormInstance<VisitFormType>
}

const VisitForm: React.FC<VisitFormProps> = ({ isLoading, form }) => {
    const { data: stores, isLoading: fetchingStores } = useGetStoreQuery({});
    const [fetchContacts, { data: storeContacts, isLoading: fetchingContacts }] = useLazyGetContactsQuery();

    return (
        <Form disabled={isLoading} form={form} layout="vertical">
            {/* Hidden visit ID if editing an existing visit */}
            <Form.Item name="id" hidden />

            <Row gutter={12}>
                {/* Visit Type */}
                <Col span={24}>
                    <Form.Item
                        name="visitType"
                        label="Visit Type"
                        rules={[{ required: true, message: 'Please select a Visit Type' }]}
                    >
                        <Select
                            loading={fetchingContacts}
                            options={VisitTypesArray?.map((item) => ({
                                value: item,
                                label: item
                            }))}
                            placeholder="Select a Visit Type" />
                    </Form.Item>
                </Col>

                {/* Store Selection */}
                <Col span={24}>
                    <Form.Item
                        name="storeId"
                        label="Store"
                        rules={[{ required: true, message: 'Please select a store' }]}
                    >
                        <Select onSelect={(value) => {
                            fetchContacts({
                                storeId: value
                            })
                        }} loading={fetchingStores} options={stores?.map(({ id, name }) => ({
                            value: id,
                            label: name
                        }))} placeholder="Select a store" />
                    </Form.Item>
                </Col>

                {/* Contact Selection */}
                <Col span={24}>
                    <Form.Item
                        name="contactId"
                        label="Contact"
                        rules={[{ required: true, message: 'Please select a contact' }]}
                    >
                        <Select
                            loading={fetchingContacts}
                            options={storeContacts?.map(({ id, name }) => ({
                                value: id,
                                label: name
                            }))}
                            notFoundContent="No Contacts Founds For This Store."
                            placeholder="Select a contact" />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                {/* Visit Scheduled Date/Time */}
                <Col span={24}>
                    <Form.Item
                        name="scheduledAt"
                        label="Choose Date & Time"
                        rules={[{ required: true, message: 'Please select a date/time' }]}
                    >
                        <DatePicker showTime className='w-full' />
                    </Form.Item>
                </Col>
            </Row>

        </Form>
    )
}

export default VisitForm