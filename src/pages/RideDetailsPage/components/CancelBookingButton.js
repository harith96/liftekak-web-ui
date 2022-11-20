import { Button } from 'antd';
import DangerModal from 'components/DangerModal';
import useModalToggle from 'hooks/useModalToggle';
import React, { useCallback } from 'react';

function CancelBookingButton({ cancelBooking }) {
  const [cancelModalVisible, toggleModal] = useModalToggle();
  const onOkDangerModal = useCallback(() => {
    cancelBooking();
    toggleModal();
  }, [cancelBooking, toggleModal]);
  return (
    <>
      <Button danger type="primary" onClick={toggleModal}>
        Cancel Booking
      </Button>

      <DangerModal
        visible={cancelModalVisible}
        onOk={onOkDangerModal}
        onCancel={toggleModal}
        confirmationQuestion="Are you sure that you want to cancel your booking?"
      />
    </>
  );
}

export default CancelBookingButton;
