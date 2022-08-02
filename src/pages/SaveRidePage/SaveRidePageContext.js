import React from 'react';

const SaveRidePageContext = React.createContext({
  onSaveRide: () => {},
  isRideCreating: false,
});

export const SaveRidePageContextProvider = SaveRidePageContext.Provider;

export default SaveRidePageContext;
