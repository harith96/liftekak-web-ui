import { Col, Row } from 'antd';
import useModalToggle from 'hooks/useModalToggle';
import React from 'react';
import PasswordResetModal from './PasswordResetModal';

import SignInForm from './SignInForm';
import './styles/index.scss';

function SignInPageComponent() {
  const [visible, togglePasswordRestModal] = useModalToggle();

  return (
    <Row align="middle" style={{ height: '100%', width: '100%' }}>
      <Col
        xs={{ span: 20, offset: 2 }}
        lg={{ span: 18, offset: 3 }}
        xl={{ span: 14, offset: 5 }}
        xxl={{ span: 12, offset: 6 }}
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Row className="login-screen">
          <Col
            lg={12}
            md={24}
            sm={24}
            xs={24}
            style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}
          >
            <div id="login-container" className="login-container">
              <SignInForm togglePasswordRestModal={togglePasswordRestModal} />
              <PasswordResetModal visible={visible} toggleVisibility={togglePasswordRestModal} />
            </div>
          </Col>
          <Col lg={12} sm={0}>
            <div className="login-right-image" />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default SignInPageComponent;
