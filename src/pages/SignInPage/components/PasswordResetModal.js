import { Button, Input, Modal } from 'antd';
import React, { useCallback, useContext, useState } from 'react';
import * as yup from 'yup';

import * as i18n from '_i18n';
import SignInPageContext from '../SignInPageContext';

const emailValidator = yup.string().email().required();

function PasswordResetModal({ visible, toggleVisibility }) {
  const { onForgotPassword } = useContext(SignInPageContext);
  const [email, setEmail] = useState('');
  const [isEmailErroneous, setIsEmailErroneous] = useState(false);

  const onOk = useCallback(() => {
    const isValid = emailValidator.validateSync(email);
    if (isValid) onForgotPassword(email);
    else setIsEmailErroneous(true);
  }, [email, setIsEmailErroneous, onForgotPassword]);

  return (
    <Modal visible={visible} onOk={onOk} onCancel={toggleVisibility} footer={null}>
      <div>
        <h2>Forgot Your Password!</h2>
        <p>
          No need to worry. Enter your email below and confirm. We will send a link to reset your password in no time.
          Please check spam folder if the email in not in the regular inbox.
        </p>
        <Input
          type="email"
          onChange={(event) => {
            setEmail(event.target.value);
            if (isEmailErroneous) setIsEmailErroneous(emailValidator.validateSync(email));
          }}
          value={email}
          placeholder={i18n.t('Email')}
        />
        {isEmailErroneous && i18n.t('Please enter an valid email.')}
        <Button onClick={onOk}>Send Password Reset Link</Button>
      </div>
    </Modal>
  );
}

export default PasswordResetModal;
