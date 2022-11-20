import React from 'react';

function StatusTag({ buttonClass, title, desc }) {
  return (
    <span className={`ant-tag state ${buttonClass}`} title={desc}>
      {title}
    </span>
  );
}

export default StatusTag;
