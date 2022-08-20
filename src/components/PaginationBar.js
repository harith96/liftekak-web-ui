import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import './styles/_paginationBar.scss';

function PaginationBar({ onPreviousPage, onNextPage, isNextButtonDisabled }) {
  return (
    <div className="horizontal-container pagination-container">
      <Button type="button" id="go-back" onClick={onPreviousPage} className="previous-button">
        <LeftOutlined />
      </Button>
      <Button id="go-next" type="button" onClick={onNextPage} disabled={isNextButtonDisabled}>
        <RightOutlined />
      </Button>
    </div>
  );
}

export default PaginationBar;
