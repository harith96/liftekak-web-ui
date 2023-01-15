import { Modal, Avatar, Card, Space } from 'antd';
import { PhoneOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';
import getFullName from 'util/getFullName';
import { simulateCall, getFullPhoneNumber } from 'util/phoneUtil';

const { Meta } = Card;

function UserDetailsModal({ userDetails, visible, toggleModal }) {
  const fullMobileNo = getFullPhoneNumber(userDetails?.countryCode, userDetails?.mobileNo);
  return (
    <Modal visible={visible} onCancel={toggleModal} footer={null}>
      <div style={{ width: '100%', margin: '1rem' }}>
        <Meta
          avatar={
            userDetails?.userPhoto ? (
              <Avatar className="user-avatar" size="large" src={userDetails?.userPhoto} />
            ) : (
              <Avatar className="user-avatar" size="large" icon={<UserOutlined />} />
            )
          }
          title={getFullName(userDetails?.firstName, userDetails?.lastName)}
          description={
            <Space onClick={() => simulateCall(fullMobileNo)} className="clickable">
              <PhoneOutlined />
              {fullMobileNo}
            </Space>
          }
        />
      </div>
    </Modal>
  );
}

export default UserDetailsModal;
