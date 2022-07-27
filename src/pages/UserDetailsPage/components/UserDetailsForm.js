import { Button, Col, Form as AntdForm, Icon, Row, Tooltip } from 'antd';
import { Formik } from 'formik';
import { Form, Input, Select } from 'formik-antd';
import React, { useContext } from 'react';
import * as yup from 'yup';
import * as _ from 'lodash';

import * as i18n from '_i18n';
import { Gender } from 'enums';
import ImageUpload from 'components/ImageUpload';
import UserDetailsPageContext from '../UserDetailsPageContext';

const { Option } = Select;

const genders = _.map(Gender, (value, key) => ({ key, value }));

const renderGenders = _.map(genders, ({ key, value }) => (
  <Option value={key} key={key} id={key}>
    {value}
  </Option>
));

const validationSchema = yup.object().shape({
  firstName: yup.string().required('First name is required.'),
  lastName: yup.string().required('Last name is required.'),
  mobileNo: yup
    .string()
    .required('Mobile number is required.')
    .matches(/7[0-9]{8}/, { excludeEmptyString: true, message: 'Please enter a valid mobile number.' })
    .max(9, 'Enter mobile number without leading zero.'),
  gender: yup.string().required('Gender selection is required.').oneOf(_.keys(Gender)),
  passengerPreference: yup
    .array()
    .of(yup.string().oneOf(_.keys(Gender)))
    .min(1, 'Passenger preference selection is required.'),
  nic: yup.object().shape({
    idNo: yup
      .string()
      .matches(/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/, { excludeEmptyString: true, message: 'Enter a valid NIC number' })
      .required('NIC number is required'),
    front: yup.string().required('NIC front image is required.'),
    back: yup.string().required('NIC back image is required.'),
  }),
});

function UserDetailsForm() {
  const {
    onSubmit,
    isSaving,
    user: { firstName, lastName, mobileNo, gender, passengerPreference, nic: { idNo, front, back } = {} } = {},
  } = useContext(UserDetailsPageContext);
  return (
    <Formik
      id="user-details-form"
      onSubmit={(values, { setSubmitting, resetForm }) => {
        onSubmit(values);
        setSubmitting(false);
        resetForm({ values });
      }}
      initialValues={{
        firstName,
        lastName,
        mobileNo,
        gender,
        passengerPreference: passengerPreference || genders,
        nic: { idNo, front, back },
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize
    >
      {({ values: { isSignUp }, submitForm, setFieldValue }) => (
        <div className="user-details-form-container">
          <Form className="user-details-form">
            <Row className="form-elements">
              <Col span={12} className="left-column">
                <div className="left-column">
                  <label id="user-first-name-label" className="user-input">
                    {i18n.t(`First Name`)}
                  </label>

                  <Form.Item name="firstName">
                    <Input
                      id="user-first-name-input"
                      name="firstName"
                      size="default"
                      placeholder={i18n.t('Ex: John')}
                    />
                  </Form.Item>
                </div>
              </Col>
              <Col span={12}>
                <div className="right-column">
                  <label id="user-last-name-label" className="user-input">
                    {i18n.t(`Last Name`)}
                  </label>
                  <Form.Item name="lastName">
                    <Input id="user-last-name-input" name="lastName" size="default" placeholder={i18n.t('Ex: Doe')} />
                  </Form.Item>
                </div>
              </Col>
            </Row>
            <Row className="form-elements">
              <label id="user-mobile-no-label" className="user-input">
                {i18n.t(`Mobile Number`)}
              </label>
              <Form.Item name="mobileNo">
                <Input
                  id="user-first-name-input"
                  name="mobileNo"
                  addonBefore="+94"
                  size="default"
                  placeholder={i18n.t('Ex: 711234567')}
                />
              </Form.Item>
            </Row>
            <Row className="form-elements">
              <Col span={12}>
                <div className="left-column">
                  <label id="user-gender-label" className="user-input">
                    {i18n.t(`Gender`)}
                  </label>
                  <Form.Item name="gender">
                    <Select id="user-gender-input" name="gender" size="default">
                      {renderGenders}
                    </Select>
                  </Form.Item>
                </div>
              </Col>
              <Col span={12}>
                <div className="right-column">
                  <label id="user-passenger-preference-label" className="user-input">
                    {i18n.t(`Passenger Preference`)}
                    <Tooltip title={i18n.t('Gender preference for your fellow passengers.')}>
                      <Icon type="info-circle" />
                    </Tooltip>
                  </label>
                  <Form.Item name="passengerPreference">
                    <Select id="user-gender-input" name="passengerPreference" size="default" mode="multiple" allowClear>
                      {renderGenders}
                    </Select>
                  </Form.Item>
                </div>
              </Col>
            </Row>
            <Row className="form-elements">
              <label id="user-nic-no-label" className="user-input">
                {i18n.t(`NIC Number`)}
              </label>
              <Form.Item name="nic.idNo">
                <Input
                  id="user-first-name-input"
                  name="nic.idNo"
                  size="default"
                  placeholder={i18n.t('Ex: 123456789V')}
                />
              </Form.Item>
            </Row>
            <Row className="form-elements">
              <Col span={12}>
                <label id="user-nic-front-img-label" className="user-input">
                  {i18n.t(`NIC Front Image`)}
                </label>
                <Form.Item name="nic.front">
                  <ImageUpload
                    id="user-nic-front-input"
                    handleImageUpload={(imageBase64) => setFieldValue('nic.front', imageBase64)}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <label id="user-nic-back-img-label" className="user-input">
                  {i18n.t(`NIC Back Image`)}
                </label>
                <Form.Item name="nic.back">
                  <ImageUpload
                    id="user-nic-back-input"
                    handleImageUpload={(imageBase64) => setFieldValue('nic.back', imageBase64)}
                  />
                </Form.Item>
              </Col>
            </Row>
            <AntdForm.Item>
              <AntdForm.Item>
                <Button loading={isSaving} onClick={submitForm} type="primary" className="submit-button">
                  {isSignUp ? i18n.t('Sign Up') : i18n.t('Save Details')}
                </Button>
              </AntdForm.Item>
            </AntdForm.Item>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default UserDetailsForm;
