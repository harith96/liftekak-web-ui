import React from 'react';

const RidesListPageContext = React.createContext({
  ridesList: [],
  isRidesFetching: true,
  onNextPage: () => {},
  onPreviousPage: () => {},
});

export const RidesListPageContextProvider = RidesListPageContext.Provider;

export default RidesListPageContext;
