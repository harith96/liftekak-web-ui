import React from 'react';

const VehiclesPageContext = React.createContext({
  vehicles: [],
  isVehiclesFetching: false,
  selectedVehicle: null,
  setSelectedVehicle: () => {},
  isEditVehicleModalVisible: false,
  toggleModal: () => {},
  onVehicleSelected: () => {},
});

export const VehiclesPageContextProvider = VehiclesPageContext.Provider;

export default VehiclesPageContext;
