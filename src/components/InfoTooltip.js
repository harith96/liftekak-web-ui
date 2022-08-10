import { Icon, Tooltip } from 'antd';
import React from 'react';

function InfoTooltip({ title }) {
  return (
    <Tooltip title={title} className="info-tootltip">
      <Icon type="info-circle" style={{ margin: '0 0.3rem' }} />
    </Tooltip>
  );
}

export default InfoTooltip;
