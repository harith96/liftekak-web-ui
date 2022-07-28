import React from 'react';

const CreateRidePageContext = React.createContext({
  onCreateRide: () => {},
  isRideCreating: false,
});

export const CreateRidePageContextProvider = CreateRidePageContext.Provider;

export default CreateRidePageContext;
