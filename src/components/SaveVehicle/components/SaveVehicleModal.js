import { Modal } from 'antd';
import React, { useContext } from 'react';
import SaveVehicleContext from '../context/SaveVehicleContext';
import SaveVehicleForm from './SaveVehicleForm';

function SaveVehicleModal() {
  const { modal: { visible, toggleModal } = {} } = useContext(SaveVehicleContext);
  return (
    <Modal visible={visible} footer={null} onCancel={toggleModal} className="vehicle-modal">
      <h2>Add new vehicle</h2>
      <SaveVehicleForm />
    </Modal>
  );
}

export default SaveVehicleModal;
