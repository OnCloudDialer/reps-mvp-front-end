import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import { readString } from 'react-papaparse';
import { useCreateBulkProductsMutation } from '../../../services/product';

const ProductBulkUpload = () => {
    const [uploadBulkProducts, { isLoading }] = useCreateBulkProductsMutation()
    const beforeUpload = (file: any) => {
        const isCSV = file.type === 'text/csv' || file.name.endsWith('.csv');
        if (!isCSV) {
            message.error('You can only upload CSV files!');
            return Upload.LIST_IGNORE;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e?.target?.result;
            if (content) {

                // @ts-ignore
                readString(content, {
                    complete: (results) => {
                        uploadBulkProducts({
                            entities: results.data
                        });
                    }
                });
            }
        };
        reader.onerror = () => {
            message.error('Failed to read file!');
        };
        reader.readAsText(file);
        // Prevent upload to server
        return false;
    };
    return (
        <>
            <Upload beforeUpload={beforeUpload} showUploadList={false} >

                <Button loading={isLoading} icon={<UploadOutlined />}>
                    CSV Upload Products
                </Button>
            </Upload>
        </>
    )
}

export default ProductBulkUpload