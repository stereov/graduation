import React from 'react';
import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';


const { Dragger } = Upload;

interface BatchAddData {
  name: string;
  action: string;
  method: 'POST' | 'PUT' | 'PATCH' | 'post' | 'put' | 'patch' | undefined;
  beforeUpload?: (file: any) => boolean;
  onChange?: (info: any) => void;
  hintMessage: string;
  listType?: "picture" | "text" | "picture-card" | undefined;
}

const BatchAdd: React.FC<BatchAddData> = (props) => {
  const { name, action, method, beforeUpload, onChange, hintMessage, listType } = props;

  return (
    <Dragger
      name={name}
      action={action}
      method={method}
      beforeUpload={beforeUpload}
      onChange={onChange}
      listType={listType}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">{hintMessage}</p>
    </Dragger>
  );
};

export default BatchAdd;
