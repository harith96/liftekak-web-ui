import { QuestionCircleFilled } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import React from 'react';

import * as i18n from '_i18n';

function DangerModal({ visible, onOk, onCancel, data, confirmationQuestion }) {
  return (
    <Modal
      visible={visible}
      onOk={() => {
        onOk(data);
      }}
      onCancel={onCancel}
      footer={[
        <div className="modal-btn-row" key="row-1">
          <Button id="danger-modal-no-btn" key="No" onClick={onCancel} className="btn">
            {i18n.t('liftEkak.no')}
          </Button>
          <div className="dotted-connector" />
          <Button
            id="danger-modal-yes-btn"
            key="Yes"
            onClick={() => onOk(data)}
            className="btn red-action-btn ant-btn-primary"
          >
            {i18n.t('liftEkak.yes')}
          </Button>
        </div>,
      ]}
    >
      <div className="modal-confirm-label">
        <QuestionCircleFilled className="icon" />
        <div className="sub">{confirmationQuestion}</div>
      </div>
    </Modal>
  );
}

export default DangerModal;
