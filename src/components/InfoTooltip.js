import { Icon, Tooltip } from 'antd';
import React from 'react';

function InfoTooltip({ title }) {
  return (
    <Tooltip title={title} className="info-tootltip">
      <Icon type="info-circle" />
    </Tooltip>
  );
}

export default InfoTooltip;
