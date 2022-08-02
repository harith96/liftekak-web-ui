import React from 'react';

const RidesListPageContext = React.createContext({
  ridesList: [],
  isRidesFetching: true,
  onNextPage: () => {},
  onPreviousPage: () => {},
  onRideSelected: () => {},
  gotToSaveRideView: () => {},
  onSearch: () => {},
});

export const RidesListPageContextProvider = RidesListPageContext.Provider;

export default RidesListPageContext;
