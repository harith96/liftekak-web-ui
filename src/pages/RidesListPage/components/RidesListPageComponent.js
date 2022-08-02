import React from 'react';

import CreateRideButton from './CreateRideButton';
import RideSearchBar from './RideSearchBar';
import RidesList from './RidesList';
import './styles/index.scss';

function RidesListPageComponent() {
  return (
    <>
      <CreateRideButton />
      <RideSearchBar />
      <RidesList />
    </>
  );
}

export default RidesListPageComponent;
