import { Button } from 'antd';
import React, { useContext } from 'react';
import RideDetailsPageContext from '../RidesDetailsPageContext';

function BookRideButton() {
  const { bookRide } = useContext(RideDetailsPageContext);
  return (
    <Button type="primary" style={{ backgroundColor: '#008ace' }} onClick={bookRide}>
      Book ride
    </Button>
  );
}

export default BookRideButton;
