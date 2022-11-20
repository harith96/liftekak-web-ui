import { InfoCircleFilled } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import React from 'react';

import * as i18n from '_i18n';

function InfoModal({ visible, toggleModal, message }) {
  return (
    <Modal
      visible={visible}
      onOk={toggleModal}
      onCancel={toggleModal}
      footer={[
        <div className="modal-btn-row" key="row-1">
          <Button
            id="danger-modal-yes-btn"
            key="Yes"
            onClick={toggleModal}
            className="btn blue-action-btn ant-btn-primary"
          >
            {i18n.t('liftEkak.ok')}
          </Button>
        </div>,
      ]}
    >
      <div className="modal-confirm-label">
        <InfoCircleFilled className="icon" />
        <div className="sub">{message}</div>
      </div>
    </Modal>
  );
}

export default InfoModal;
