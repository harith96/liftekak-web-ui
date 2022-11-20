import React from 'react';

const RideDetailsPageContext = React.createContext({
  isRidesDetailsFetching: {},
  rideDetails: {},
  fetchRideDetails: () => {},
  bookRide: () => {},
  cancelRide: () => {},
  userBooking: null,
  shouldAllowBookings: false,
  shouldAllowBookingCancellation: false,
  cancelBooking: () => {},
});

export const RideDetailsPageContextProvider = RideDetailsPageContext.Provider;

export default RideDetailsPageContext;
