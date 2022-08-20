import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Col } from 'antd';
import React from 'react';

import './styles/_detailsCard.scss';

function RideDetailsCard({ title, icon, value, onClick, lgColSpan = 6 }) {
  return (
    <Col lg={{ span: lgColSpan }} xs={{ span: 24 }}>
      <div
        className={`details-card ${onClick ? 'clickable-card clickable' : ''}`}
        onClick={onClick}
        role="button"
        onKeyDown={() => {}}
        tabIndex={0}
      >
        <div className="card-title">{title}</div>

        <div className="card-content">
          {React.isValidElement(icon) ? icon : <LegacyIcon type={icon} style={{ marginRight: '0.5rem' }} />}
          {value}
        </div>
      </div>
    </Col>
  );
}

export default RideDetailsCard;
