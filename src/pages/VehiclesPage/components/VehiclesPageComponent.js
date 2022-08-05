import SaveVehicleContainer from 'components/SaveVehicle/SaveVehicleContainer';
import React, { useContext } from 'react';
import VehiclesPageContext from '../VehiclesPageContext';
import VehiclesList from './VehiclesList';

function VehiclesPageComponent() {
  const { selectedVehicle, isEditVehicleModalVisible, toggleModal } = useContext(VehiclesPageContext);
  return (
    <>
      <SaveVehicleContainer vehicle={selectedVehicle} visible={isEditVehicleModalVisible} toggleModal={toggleModal} />
      <VehiclesList />
    </>
  );
}

export default VehiclesPageComponent;
