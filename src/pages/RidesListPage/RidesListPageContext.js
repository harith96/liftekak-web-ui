import React from 'react';
import { RidesTabs } from 'util/constants';

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
  activeTabKey: RidesTabs.ALL_RIDES,
  setActiveTabKey: () => {},
});

export const RidesListPageContextProvider = RidesListPageContext.Provider;

export default RidesListPageContext;
