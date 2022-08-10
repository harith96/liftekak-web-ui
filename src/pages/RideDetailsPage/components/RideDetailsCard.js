import { Icon } from 'antd';
import React from 'react';

import './styles/_detailsCard.scss';

function RideDetailsCard({ title, icon, value, onClick }) {
  return (
    <div
      className={`details-card ${onClick ? 'clickable-card clickable' : ''}`}
      onClick={onClick}
      role="button"
      onKeyDown={() => {}}
      tabIndex={0}
    >
      <div className="card-title">{title}</div>
      <div className="card-content">
        <Icon type={icon} style={{ marginRight: '0.5rem' }} />
        <p>{value}</p>
      </div>
    </div>
  );
}

export default RideDetailsCard;
