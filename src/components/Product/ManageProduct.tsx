import { Form, Space, Button, Popconfirm, Table, Modal, Row, Col, Input, InputNumber, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, } from 'react-router-dom';
import { buildUrl } from '../../helpers';
import PageLayout from '../common/PageLayout';
import Link from 'antd/es/typography/Link';
import { useCreateProductMutation, useDeleteProductMutation, useLazyGetProductQuery, useUpdateProductMutation } from '../../services/product';
import { Product, ProductForm } from '../../services/product/type';
import ProductSearchFilter from './ProductSearchFilter';
import { UnitOfMeasureArray } from '../../config';
import UploadProductImages from './UploadProductImages';
import ProductBulkUpload from './ProductBulkUpload';

export default function ManageProduct() {
    const [form] = Form.useForm<ProductForm>();
    const [products, setProducts] = useState<Product[]>([]);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [trigger, { data: productsData, isSuccess: isProductsFetched, isLoading }] = useLazyGetProductQuery();
    const [createProduct, { isLoading: isCreating }] = useCreateProductMutation()
    const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation()
    const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation()


    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const handleOpenModal = (product: Product | null = null) => {
        setEditingProduct(product);
        if (product) {
            form.setFieldsValue({
                id: product.id,
                announcements: product.announcements,
                name: product.name,
                description: product.description,
                default_price: product.default_price,
                special_price: product.special_price,
                regular_price: product.regular_price,
                unit_of_measure: product.unit_of_measure,
                shareable_info: product.shareable_info
            })
        } else {
            form.resetFields();
        }
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        deleteProduct(id);
    };

    const handleSubmit = () => {
        form.validateFields().then(values => {
            const mappedValues: ProductForm = {
                announcements: values.announcements,
                name: values.name,
                description: values.description,
                // @ts-ignore
                default_price: parseInt(values.default_price),
                // @ts-ignore
                special_price: parseInt(values.special_price),
                // @ts-ignore
                regular_price: parseInt(values.regular_price),
                unit_of_measure: values.unit_of_measure,
                shareable_info: values.shareable_info,
                imageUrls: values.imageUrls
            }


            if (editingProduct && values.id) {
                updateProduct({
                    ...mappedValues,
                    id: values.id
                });
            } else {
                createProduct(values)
            }
            setIsModalOpen(false);
            form.resetFields();
        });
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (val: string, record: Product) => (
                <Link onClick={() => navigate(buildUrl('viewProduct', { id: record.id }))}>
                    {val}
                </Link>
            ),
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Default Price',
            dataIndex: 'default_price',
            render: (val: number) => `$${val.toFixed(2)}`
        },
        {
            title: 'Regular Price',
            dataIndex: 'regular_price',
            render: (val: number) => `$${val.toFixed(2)}`
        },
        {
            title: 'Special Price',
            dataIndex: 'special_price',
            render: (val: number | undefined) => val !== undefined ? `$${val.toFixed(2)}` : '-'
        },
        {
            title: 'Unit',
            dataIndex: 'unit_of_measure',
        },
        {
            title: 'Shareable Info',
            dataIndex: 'shareable_info',
        },
        {
            title: 'Actions',
            render: (_: any, record: Product) => (
                <Space>
                    <Button onClick={() => handleOpenModal(record)}>Edit</Button>
                    <Popconfirm title="Are you sure?" onConfirm={() => handleDelete(record.id)}>
                        <Button loading={isDeleting} danger>Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];



    useEffect(() => {
        if (isProductsFetched) {
            setProducts(productsData);
        }
    }, [isProductsFetched, productsData]);


    useEffect(() => {
        trigger(undefined);
    }, [])

    return (
        <PageLayout breadCrumbItems={[{
            title: 'Products'
        }]}>

            <div className="bg-white p-4 px-0 flex items-center justify-between gap-2 rounded-md w-100">
                <ProductSearchFilter onReset={() => {
                    trigger({
                    })
                }} onSearch={(data) => {
                    trigger(data)
                }} />
                <ProductBulkUpload />
                <Button type="primary" onClick={() => handleOpenModal()}>+ Add Product</Button>
            </div>
            <Table loading={isLoading} className="mt-4" rowKey="id" dataSource={products} columns={columns} />
            <Modal
                title={editingProduct ? 'Edit Product' : 'Add Product'}
                centered
                open={isModalOpen}
                onOk={handleSubmit}
                className='min-w-[700px]'
                onCancel={() => {
                    setIsModalOpen(false);
                    setEditingProduct(null);
                    form.resetFields();
                }}
            >
                <Form disabled={isCreating || isUpdating} form={form} layout="vertical">
                    <Form.Item name="id" hidden />

                    <Row gutter={12}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[{ required: true, message: 'Please enter a name' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="unit_of_measure"
                                label="Unit of Measure"
                                rules={[{ required: true, message: 'Please enter the unit of measure' }]}
                            >
                                <Select options={UnitOfMeasureArray.map((value) => ({
                                    value,
                                    label: value
                                }))} />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="default_price"
                                label="Default Price"
                                rules={[{ required: true, message: 'Please enter the default price' }]}
                            >
                                <InputNumber min={0} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="regular_price"
                                label="Regular Price"
                                rules={[{ required: true, message: 'Please enter the regular price' }]}
                            >
                                <InputNumber min={0} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="special_price"
                                label="Special Price"
                                rules={[{ required: false }]}
                            >
                                <InputNumber min={0} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                name="description"
                                label="Description"
                                rules={[{ required: false }]}
                            >
                                <Input.TextArea rows={3} />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                name="announcements"
                                label="Announcements"
                                rules={[{ required: false }]}
                            >
                                <Input.TextArea rows={3} />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                name="shareable_info"
                                label="Shareable Info"
                                rules={[{ required: false }]}
                            >
                                <Input.TextArea rows={3} />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                name="imageUrls"
                                label="Images"
                                rules={[{ required: false }]}
                            >
                                <UploadProductImages data={editingProduct?.imageUrls.map(({ url }) => (url))} onFinish={(data) => {
                                    form.setFieldValue('imageUrls', data)
                                }} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>

            </Modal>
        </PageLayout>
    );
}