import { Button } from 'antd';
import React from 'react';

function CancelRideButton({ onClick }) {
  return (
    <Button type="link" danger onClick={onClick}>
      Cancel Ride
    </Button>
  );
}

export default CancelRideButton;
