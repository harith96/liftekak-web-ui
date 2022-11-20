import BookingStatus from 'components/BookingStatus';
import _ from 'lodash';
import React from 'react';
import { BookingStatusClassNameMap } from 'util/constants';

function BookingStatusBadge({ bookingStatus, title }) {
  return (
    <BookingStatus
      buttonClass={BookingStatusClassNameMap[bookingStatus]}
      title={title}
      desc={`Your booking request is ${_.lowerCase(bookingStatus)}.`}
    />
  );
}

export default BookingStatusBadge;
