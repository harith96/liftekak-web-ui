import { Button } from 'antd';
import React, { useContext } from 'react';
import RideDetailsPageContext from '../RidesDetailsPageContext';

function RefreshRideButton() {
  const { fetchRideDetails } = useContext(RideDetailsPageContext);

  return (
    <Button type="link" onClick={fetchRideDetails}>
      Refresh
    </Button>
  );
}

export default RefreshRideButton;
