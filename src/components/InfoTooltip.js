import { InfoCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import React from 'react';

function InfoTooltip({ title }) {
  return (
    <Tooltip title={title} className="info-tootltip">
      <InfoCircleOutlined style={{ margin: '0 0.3rem' }} />
    </Tooltip>
  );
}

export default InfoTooltip;
