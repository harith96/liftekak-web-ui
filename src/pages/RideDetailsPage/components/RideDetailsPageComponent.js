import React from 'react';
import BookRideButton from './BookRideButton';
import GoToRidesButton from './GoToRidesButton';
import RefreshRideButton from './RefreshRideButton';
import RideDetails from './RideDetails';

import './styles/index.scss';

function RideDetailsPageComponent() {
  return (
    <div>
      <GoToRidesButton />
      <RefreshRideButton />
      <RideDetails />
      <BookRideButton />
    </div>
  );
}

export default RideDetailsPageComponent;
