import { PlusOutlined } from '@ant-design/icons';
import { GetProp, Upload, Image, UploadFile, UploadProps } from 'antd'
import React, { useEffect, useState } from 'react'
import { Config } from '../../../config';


type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];


const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });


interface UploadProductImagesProps {
    data?: string[];
    onFinish: (media: string[]) => void;
}

const UploadProductImages: React.FC<UploadProductImagesProps> = ({ onFinish, data }) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([
    ]);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        const updatedFileList = newFileList.map((f) => {
            if (f.response && f.response.fileName) {
                return {
                    ...f,
                    url: f.response.fileName,
                    thumbUrl: f.response.fileName
                };
            }
            return f;
        });
        if (updatedFileList) {
            onFinish(updatedFileList.map(({ url }) => url))
        }
        setFileList(updatedFileList);
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    useEffect(() => {
        if (data) {
            setFileList(data.map((url) => ({
                uid: url,
                name: url,
                url: `http://localhost:3000/files/${url}`
            })))
        } else {
            setFileList([]);
        }
    }, [data])


    return (
        <>
            <Upload
                action={`${Config.baseApiUrl}/media`}
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onRemove={(data) => {
                    if (data !== undefined) {
                        const values = fileList.filter(({ uid }) => uid !== data.uid).map(({ url }) => url);
                        // @ts-ignore
                        onFinish(values);
                    }

                }}
                onChange={handleChange}
            >
                {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            {previewImage && (
                <Image
                    wrapperStyle={{ display: 'none' }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                />
            )}
        </>
    );
}

export default UploadProductImages