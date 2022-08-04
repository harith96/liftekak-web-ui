import React from 'react';

const RidesListPageContext = React.createContext({
  ridesList: [],
  isRidesFetching: true,
  rideFilters: {},
  onNextPage: () => {},
  onPreviousPage: () => {},
  onRideSelected: () => {},
  gotToSaveRideView: () => {},
  onSearch: () => {},
  myRides: [],
  isMyRidesFetching: false,
});

export const RidesListPageContextProvider = RidesListPageContext.Provider;

export default RidesListPageContext;
