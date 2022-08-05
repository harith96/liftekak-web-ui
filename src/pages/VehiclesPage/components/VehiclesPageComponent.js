import { Row } from 'antd';
import AddNewButton from 'components/AddNewButton';
import SaveVehicleContainer from 'components/SaveVehicle/SaveVehicleContainer';
import React, { useContext } from 'react';
import VehiclesPageContext from '../VehiclesPageContext';
import VehiclesList from './VehiclesList';

function VehiclesPageComponent() {
  const { selectedVehicle, isEditVehicleModalVisible, toggleModal } = useContext(VehiclesPageContext);
  return (
    <>
      <Row type="flex" justify="space-between" align="middle">
        <h1>Vehicles</h1>
        <AddNewButton onClick={toggleModal} entityName="Vehicle" />
      </Row>
      <SaveVehicleContainer vehicle={selectedVehicle} visible={isEditVehicleModalVisible} toggleModal={toggleModal} />
      <VehiclesList />
    </>
  );
}

export default VehiclesPageComponent;
