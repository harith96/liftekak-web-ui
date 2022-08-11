import React, { useState } from 'react';
import { Upload, Icon, message } from 'antd';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

export default function ImageUpload({ imageURL, handleImageUpload }) {
  const [loading, setLoading] = useState(false);

  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    getBase64(file, (imageUrl) => {
      setLoading(false);
      if (handleImageUpload) handleImageUpload(imageUrl);
    });

    return false;
  }

  const uploadButton = (
    <div>
      <Icon type={loading ? 'loading' : 'plus'} />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <Upload name="avatar" listType="picture-card" showUploadList={false} beforeUpload={beforeUpload}>
      {imageURL ? <img src={imageURL} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
    </Upload>
  );
}
