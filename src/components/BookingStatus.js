import React from 'react';

function BookingStatus({ buttonClass, title, desc }) {
  return (
    <span className={`ant-tag state ${buttonClass}`} title={desc}>
      {title}
    </span>
  );
}

export default BookingStatus;
