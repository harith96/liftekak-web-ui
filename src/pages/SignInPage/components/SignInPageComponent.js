import useModalToggle from 'hooks/useModalToggle';
import React from 'react';
import PasswordResetModal from './PasswordResetModal';

import SignInForm from './SignInForm';
import './styles/index.scss';

function SignInPageComponent() {
  const [visible, togglePasswordRestModal] = useModalToggle();

  return (
    <div id="login-container" className="login-container">
      <SignInForm togglePasswordRestModal={togglePasswordRestModal} />
      <PasswordResetModal visible={visible} toggleVisibility={togglePasswordRestModal} />
    </div>
  );
}

export default SignInPageComponent;
