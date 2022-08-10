import React, { useContext } from 'react';
import RideDetailsPageContext from '../RidesDetailsPageContext';
import BookRideButton from './BookRideButton';
import GoToRidesButton from './GoToRidesButton';
import RefreshRideButton from './RefreshRideButton';
import RideDetails from './RideDetails';

import './styles/index.scss';

function RideDetailsPageComponent() {
  const { rideDetails: { rideId } = {} } = useContext(RideDetailsPageContext);
  return (
    <div>
      <div className="horizontal-container action-bar">
        <div className="horizontal-container ">
          <h1>
            <span>Ride </span>
            <span>#</span>
            <span>{rideId}</span>
          </h1>
        </div>
        <div className="horizontal-container">
          <GoToRidesButton />
          <RefreshRideButton />
          <BookRideButton />
        </div>
      </div>
      <RideDetails />
    </div>
  );
}

export default RideDetailsPageComponent;
