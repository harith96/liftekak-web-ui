import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form as AntdForm } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Col, Divider, Row, Typography } from 'antd';
import SignInPageContext from 'pages/SignInPage/SignInPageContext';
import { Formik } from 'formik';
import { Checkbox, Form, Input, Switch } from 'formik-antd';
import React, { useContext } from 'react';
import * as yup from 'yup';

import * as i18n from '_i18n';
import AppLogo from 'components/AppLogo';
import googleLogo from './styles/google.svg';

const { Text } = Typography;

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
  const { onSignInWithEmailCustom, isSigningIn, onSignInWithGoogle, onSignUpWithEmailCustom, isSigningUp } =
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
      initialValues={{ email: '', password: '', rePassword: '', rememberMe: false, isSignUp: true }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize
    >
      {({ errors, touched, values: { isSignUp }, submitForm, setFieldValue }) => (
        <Form className="login-form">
          <Row justify="space-between" align="middle" gutter={16}>
            <Col span={12}>
              <AppLogo />
            </Col>
            <Col span={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={() => setFieldValue('isSignUp', !isSignUp)}>{isSignUp ? 'Sign In' : 'Sign Up'}</Button>
            </Col>
          </Row>
          <h1 className="form-heading">{i18n.t(isSignUp ? 'Sign Up' : 'Sign In')}</h1>
          <AntdForm.Item>
            <Input name="email" prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
            {getFieldError(errors, touched, 'email')}
          </AntdForm.Item>
          <AntdForm.Item>
            <Input.Password
              name="password"
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
            {getFieldError(errors, touched, 'password')}
          </AntdForm.Item>
          {isSignUp && (
            <AntdForm.Item>
              <Input.Password
                name="rePassword"
                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder={i18n.t('Re-enter password')}
              />
              {getFieldError(errors, touched, 'rePassword')}
            </AntdForm.Item>
          )}
          <Row align="middle" justify="space-between">
            <Col>
              <Checkbox name="rememberMe">Remember me</Checkbox>
            </Col>
            <Col>
              {!isSignUp && (
                <Button type="link" className="sign-in-form-forgot" onClick={togglePasswordRestModal}>
                  {i18n.t('Forgot password')}
                </Button>
              )}
            </Col>
          </Row>
          <Button
            loading={isSigningIn || isSigningUp}
            onClick={submitForm}
            type="primary"
            className="login-form-button"
          >
            {isSignUp ? i18n.t('Sign Up') : i18n.t('Sign In')}
          </Button>
          <Divider>Or</Divider>
          <Button onClick={onSignInWithGoogle} disabled={isSigningIn} loading={isSigningIn}>
            <img src={googleLogo} alt="Google Logo" className="google-logo" />
            <Text ellipsis>{i18n.t('Sign in with Google')}</Text>
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default SignInForm;
