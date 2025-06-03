import { useEffect } from 'react';
import {
    Form,
    Input,
    Button,
    Select,
    Upload,
    message,
    Tabs,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Contact, ContactForm } from '../../../services/contact/type';
import { contactRole } from '../../../config';
import { useGetStoreQuery } from '../../../services/store';

const { Option } = Select;
const { TabPane } = Tabs;


interface ContactFormFormProps {
    onSubmit: (values: ContactForm) => void;
    data?: Contact | undefined;
    loading: boolean;
}

const ContactFormForm = ({ onSubmit, loading, data }: ContactFormFormProps) => {
    const [form] = Form.useForm<ContactForm>();
    const { data: stores } = useGetStoreQuery({})

    const onFinish = (values: ContactForm) => {
        const finalValues = {
            ...values,
        };
        form.resetFields();
        onSubmit(finalValues);
    };

    const handleUpload = (info: any) => {
        if (info.file.status === 'done') {
            const url = URL.createObjectURL(info.file.originFileObj);
            console.log("🚀 ~ handleUpload ~ url:", url)
            message.success(`${info.file.name} uploaded successfully!`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} upload failed.`);
        }
    };

    useEffect(() => {
        if (data) {
            form.setFieldsValue(data);
        }
        return () => {
            form.resetFields();
        }
    }, [data])

    return (
        <Form
            form={form}
            disabled={loading}
            layout="vertical"
            onFinish={onFinish}
        >
            <Form.Item name='id' hidden />
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please enter the name' }]}
            >
                <Input placeholder="John Doe" />
            </Form.Item>

            <Form.Item
                label="Phone"
                name="phone"
                rules={[
                    { required: true, message: 'Please enter a phone number' },
                    { pattern: /^\+?\d{7,15}$/, message: 'Invalid phone number format' },
                ]}
            >
                <Input placeholder="+1234567890" />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[
                    { required: true, message: 'Please enter an email' },
                    { type: 'email', message: 'Invalid email format' },
                ]}
            >
                <Input placeholder="email@example.com" />
            </Form.Item>

            <Form.Item
                label="Role"
                name="role"
                rules={[{ required: true, message: 'Please select a role' }]}
            >
                <Select placeholder="Select a role">
                    {contactRole.map((role) => (
                        <Option key={role} value={role}>
                            {role.replace('_', ' ').toUpperCase()}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                label="Associated Stores"
                name="storeIds"
                rules={[{ required: true, message: 'Please select a Store' }]}
            >
                <Select mode='multiple' placeholder="Select a Store"
                    options={stores?.map(({ id, name }) => ({
                        value: id,
                        label: name
                    }))}
                />
            </Form.Item>

            <Form.Item label="Profile Picture">
                <Tabs defaultActiveKey="upload" >
                    <TabPane tab="Upload File" key="upload">
                        <Upload
                            name="profile"
                            showUploadList={false}
                            customRequest={({ file, onSuccess }) => {
                                setTimeout(() => {
                                    onSuccess && onSuccess('ok');
                                }, 1000);
                            }}
                            onChange={handleUpload}
                        >
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </TabPane>

                    <TabPane tab="Use Image URL" key="url">
                        <Input
                            placeholder="https://example.com/image.jpg"
                        />
                    </TabPane>
                </Tabs>
            </Form.Item>

            <Form.Item>
                <Button loading={loading} type="primary" htmlType="submit">
                    Save
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ContactFormForm;
