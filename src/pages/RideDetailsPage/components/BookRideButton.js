import { Button } from 'antd';
import SaveBookingContainer from 'components/SaveBooking/SaveBookingContainer';
import useModalToggle from 'hooks/useModalToggle';
import React from 'react';

function BookRideButton() {
  const [visible, toggleBookingModal] = useModalToggle();

  return (
    <>
      <Button type="primary" style={{ backgroundColor: '#008ace' }} onClick={toggleBookingModal}>
        Request A Ride
      </Button>

      <SaveBookingContainer visible={visible} toggleModal={toggleBookingModal} />
    </>
  );
}

export default BookRideButton;
