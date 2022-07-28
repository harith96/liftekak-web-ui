import React from 'react';

const SaveVehicleContext = React.createContext({
  vehicle: {},
  isSavingVehicle: false,
  saveVehicle: () => {},
  modal: { visible: false, toggleModal: () => {} },
});

export const SaveVehicleContextProvider = SaveVehicleContext.Provider;

export default SaveVehicleContext;
