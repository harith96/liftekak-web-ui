import { Icon as LegacyIcon } from '@ant-design/compatible';
import { SearchOutlined } from '@ant-design/icons';
import { Col } from 'antd';
import _ from 'lodash';
import React, { useState } from 'react';

import './styles/_detailsCard.scss';

function RideDetailsCard({
  title,
  icon,
  value,
  onClick,
  lgColSpan = 6,
  clickToShowContent,
  extraCallbackOnContentReveal,
}) {
  const [showContent, setShowContent] = useState(!clickToShowContent);

  return (
    <Col lg={{ span: lgColSpan }} xs={{ span: 24 }}>
      <div
        className={`details-card ${onClick ? 'clickable-card clickable' : ''}`}
        onClick={
          showContent
            ? onClick
            : () => {
                if (extraCallbackOnContentReveal) extraCallbackOnContentReveal();
                setShowContent(true);
              }
        }
        role="button"
        onKeyDown={() => {}}
        tabIndex={0}
      >
        <div className="card-title">{title}</div>

        <div className="card-content">
          {showContent && (
            <>
              {React.isValidElement(icon) ? icon : <LegacyIcon type={icon} style={{ marginRight: '0.5rem' }} />}
              {value}
            </>
          )}
          {!showContent && (
            <>
              <SearchOutlined style={{ marginRight: '0.5rem' }} />
              <div>
                <i>Click to view</i>
              </div>
            </>
          )}
        </div>
      </div>
    </Col>
  );
}

export default RideDetailsCard;
