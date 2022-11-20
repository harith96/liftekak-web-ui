import { Modal } from 'antd';
import React from 'react';
import { useContext } from 'react';
import SaveBookingContext from '../SaveBookingContext';
import SaveBookingForm from './SaveBookingForm';

function SaveBookingComponent() {
  const { modal: { visible, toggleModal } = {}, isSavingBooking } = useContext(SaveBookingContext);
  return (
    <Modal visible={visible} footer={null} onCancel={toggleModal} closable={!isSavingBooking} className="booking-modal">
      <h2>Add new booking</h2>
      <SaveBookingForm />
    </Modal>
  );
}

export default SaveBookingComponent;
