import React from 'react';

const SaveRidePageContext = React.createContext({
  onSaveRide: () => {},
  isRideCreating: false,
  vehicles: [],
  isVehiclesLoading: false,
  user: {},
  rideDetails: {},
  isRidesDetailsFetching: false,
  isRideUpdate: false,
  cancelRide: () => {},
});

export const SaveRidePageContextProvider = SaveRidePageContext.Provider;

export default SaveRidePageContext;
