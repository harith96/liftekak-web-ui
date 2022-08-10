import { Button } from 'antd';
import React, { useContext } from 'react';
import RideDetailsPageContext from '../RidesDetailsPageContext';

function BookRideButton() {
  const { bookRide } = useContext(RideDetailsPageContext);
  return (
    <Button type="link" onClick={bookRide} style={{ color: 'red' }}>
      Book ride
    </Button>
  );
}

export default BookRideButton;
