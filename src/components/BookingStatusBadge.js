import StatusTag from 'components/StatusTag';
import _ from 'lodash';
import React from 'react';
import { BookingStatusClassNameMap } from 'util/constants';

function BookingStatusBadge({ bookingStatus, title }) {
  return (
    <StatusTag
      buttonClass={BookingStatusClassNameMap[bookingStatus]}
      title={title}
      desc={`Your booking request is ${_.lowerCase(bookingStatus)}.`}
    />
  );
}

export default BookingStatusBadge;
