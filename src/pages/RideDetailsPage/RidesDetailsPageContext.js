import React from 'react';

const RideDetailsPageContext = React.createContext({
  isRidesDetailsFetching: {},
  rideDetails: {},
  fetchRideDetails: () => {},
  bookRide: () => {},
});

export const RideDetailsPageContextProvider = RideDetailsPageContext.Provider;

export default RideDetailsPageContext;
