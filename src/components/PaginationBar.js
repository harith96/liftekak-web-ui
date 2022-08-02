import { Button, Icon } from 'antd';
import React from 'react';
import './styles/_paginationBar.scss';

function PaginationBar({ onPreviousPage, onNextPage, isNextButtonDisabled }) {
  return (
    <div className="horizontal-container pagination-container">
      <Button type="button" id="go-back" onClick={onPreviousPage} className="previous-button">
        <Icon type="left" />
      </Button>
      <Button id="go-next" type="button" onClick={onNextPage} disabled={isNextButtonDisabled}>
        <Icon type="right" />
      </Button>
    </div>
  );
}

export default PaginationBar;
