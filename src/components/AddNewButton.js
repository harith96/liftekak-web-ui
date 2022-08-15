import { Icon } from 'antd';
import React from 'react';

function AddNewButton({ onClick, entityName }) {
  return (
    <button
      id="batch-merchandiser-approve"
      type="button"
      className="ant-btn btn blue-action-btn ant-btn-primary"
      onClick={onClick}
    >
      <div className="horizontal-container">
        <Icon type="plus-circle" />
        {`Add New ${entityName || ''}`}
      </div>
    </button>
  );
}

export default AddNewButton;
