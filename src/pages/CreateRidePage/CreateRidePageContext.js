import React from 'react';

const CreateRidePageContext = React.createContext({
  onCreateRide: () => {},
  isCreatingRide: false,
});

export const CreateRidePageContextProvider = CreateRidePageContext.Provider;

export default CreateRidePageContext;
