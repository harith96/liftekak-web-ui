import { Grid, Row, Space } from 'antd';
import AddNewButton from 'components/AddNewButton';
import SaveVehicleContainer from 'components/SaveVehicle/SaveVehicleContainer';
import GoToRidesButton from 'pages/RideDetailsPage/components/GoToRidesButton';
import React, { useContext } from 'react';
import VehiclesPageContext from '../VehiclesPageContext';
import VehiclesList from './VehiclesList';
import VehiclesListMobileView from './VehiclesListMobileView';

const { useBreakpoint } = Grid;

function VehiclesPageComponent() {
  const { xs } = useBreakpoint();
  const { selectedVehicle, isEditVehicleModalVisible, toggleModal } = useContext(VehiclesPageContext);
  return (
    <>
      <Row type="flex" justify="space-between" align="middle">
        <Space>
          <GoToRidesButton />
          <h1>Vehicles</h1>
        </Space>
        <AddNewButton onClick={toggleModal} entityName="Vehicle" />
      </Row>
      <SaveVehicleContainer vehicle={selectedVehicle} visible={isEditVehicleModalVisible} toggleModal={toggleModal} />
      {!xs && <VehiclesList />}
      {xs && <VehiclesListMobileView />}
    </>
  );
}

export default VehiclesPageComponent;
