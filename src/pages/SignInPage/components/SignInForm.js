import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form as AntdForm } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Row } from 'antd';
import SignInPageContext from 'pages/SignInPage/SignInPageContext';
import { Formik } from 'formik';
import { Checkbox, Form, Input, Switch } from 'formik-antd';
import React, { useContext } from 'react';
import * as yup from 'yup';

import * as i18n from '_i18n';
import googleLogo from './styles/google.svg';

const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email!').required('Email is required'),
  password: yup.string().required('Password is required'),
  rePassword: yup
    .string()
    .when(
      'isSignUp',
      (isSignUp, schema) => (isSignUp ? schema.oneOf([yup.ref('password')], 'Passwords must match') : schema),
      i18n.t('Passwords must match')
    ),
  rememberMe: yup.boolean().optional(),
  isSignUp: yup.boolean().optional(),
});

const renderFormError = (error) => <p style={{ color: 'red' }}>{error}</p>;

const getFieldError = (errors, touched, fieldName) =>
  errors[fieldName] && touched[fieldName] && renderFormError(errors[fieldName]);

function SignInForm({ togglePasswordRestModal }) {
  const { onSignInWithEmailCustom, isSigningIn, onSignInWithGoogle, onSignUpWithEmailCustom } =
    useContext(SignInPageContext);
  return (
    <Formik
      id="sign-in-form"
      onSubmit={(values, { setSubmitting, resetForm }) => {
        if (values.isSignUp) onSignUpWithEmailCustom(values);
        else onSignInWithEmailCustom(values);
        setSubmitting(false);
        resetForm({ values });
      }}
      initialValues={{ email: '', password: '', rePassword: '', rememberMe: false, isSignUp: false }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize
    >
      {({ errors, touched, values: { isSignUp }, submitForm }) => (
        <Form className="login-form">
          <AntdForm.Item>
            <Switch
              name="isSignUp"
              id="is-sign-up-switch"
              checkedChildren="Sign Up"
              unCheckedChildren="Sign In"
              className="is-sign-up-switch"
            />
          </AntdForm.Item>
          <AntdForm.Item>
            <Input name="email" prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
            {getFieldError(errors, touched, 'email')}
          </AntdForm.Item>
          <AntdForm.Item>
            <Input
              name="password"
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
            {getFieldError(errors, touched, 'password')}
          </AntdForm.Item>
          {isSignUp && (
            <AntdForm.Item>
              <Input
                name="rePassword"
                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder={i18n.t('Re-enter password')}
              />
              {getFieldError(errors, touched, 'rePassword')}
            </AntdForm.Item>
          )}
          <AntdForm.Item>
            <Checkbox name="rememberMe">Remember me</Checkbox>
            {!isSignUp && (
              <Button type="link" className="sign-in-form-forgot" onClick={togglePasswordRestModal}>
                {i18n.t('Forgot password')}
              </Button>
            )}
            <AntdForm.Item>
              <Button loading={isSigningIn} onClick={submitForm} type="primary" className="login-form-button">
                {isSignUp ? i18n.t('Sign Up') : i18n.t('Sign In')}
              </Button>
            </AntdForm.Item>
            <Row>
              <div className="or-container">
                <div className="horizontal-line" />
                <span className="or-text">or</span>
                <div className="horizontal-line" />
              </div>
            </Row>
            <AntdForm.Item>
              <Button onClick={onSignInWithGoogle} disabled={isSigningIn}>
                <img src={googleLogo} alt="Google Logo" className="google-logo" />
                <span>{i18n.t('Sign in with Google')}</span>
              </Button>
            </AntdForm.Item>
          </AntdForm.Item>
        </Form>
      )}
    </Formik>
  );
}

export default SignInForm;
