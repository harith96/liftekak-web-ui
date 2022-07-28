import { Button } from 'antd';
import React, { useContext } from 'react';
import SaveVehicleModal from './SaveVehicleModal';
import SaveVehicleContext from '../context/SaveVehicleContext';

function SaveVehicleComponent() {
  const {
    modal: { toggleModal },
  } = useContext(SaveVehicleContext);
  return (
    <div>
      <Button type="link" onClick={toggleModal}>
        Add new vehicle
      </Button>
      <SaveVehicleModal />
    </div>
  );
}

export default SaveVehicleComponent;
