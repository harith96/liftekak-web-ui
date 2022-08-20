import { PlusCircleOutlined } from '@ant-design/icons';
import React from 'react';
import TextWithIcon from './TextWithIcon';

function AddNewButton({ onClick, entityName }) {
  return (
    <button
      id="batch-merchandiser-approve"
      type="button"
      className="ant-btn btn blue-action-btn ant-btn-primary"
      onClick={onClick}
    >
      <TextWithIcon icon={<PlusCircleOutlined />} text={`Add New ${entityName || ''}`} />
    </button>
  );
}

export default AddNewButton;
