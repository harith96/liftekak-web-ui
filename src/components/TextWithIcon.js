import _ from 'lodash';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import React from 'react';
import { Space } from 'antd';

function TextWithIcon({ icon, text, textClassName, ...rest }) {
  let IconComponent = _.isString(icon) ? <LegacyIcon type={icon} /> : null;

  if (React.isValidElement(icon)) IconComponent = icon;
  return (
    <Space size="small" align="center" {...rest}>
      {IconComponent}
      <div className={textClassName}>{text}</div>
    </Space>
  );
}

export default TextWithIcon;
