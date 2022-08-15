import { Form as AntdForm } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Col, Row } from 'antd';
import { Formik } from 'formik';
import { Form, Input } from 'formik-antd';
import React, { useContext } from 'react';
import * as yup from 'yup';
import * as _ from 'lodash';

import * as i18n from '_i18n';
import { Gender } from 'enums';
import ImageUpload from 'components/ImageUpload';
import GenderSelect from 'components/GenderSelect';
import PassengerPreferenceFormikInput from 'components/PassengerPreferenceInput';
import UserDetailsPageContext from '../UserDetailsPageContext';

const validGenders = _.keys(Gender);

const validationSchema = yup.object().shape({
  firstName: yup.string().required('First name is required.'),
  lastName: yup.string().required('Last name is required.'),
  mobileNo: yup
    .string()
    .required('Mobile number is required.')
    .matches(/7[0-9]{8}/, { excludeEmptyString: true, message: 'Please enter a valid mobile number.' })
    .max(9, 'Enter mobile number without leading zero.'),
  gender: yup.string().required('Gender selection is required.').oneOf(validGenders),
  passengerPreference: yup
    .array()
    .of(yup.string().oneOf(validGenders))
    .min(1, 'Passenger preference selection is required.'),
  nic: yup.object().shape({
    idNo: yup
      .string()
      .matches(/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/, { excludeEmptyString: true, message: 'Enter a valid NIC number' })
      .required('NIC number is required'),
    // front: yup.string().required('NIC front image is required.'),
    // back: yup.string().required('NIC back image is required.'),
  }),
  bio: yup.string().required('Add a few sentences about yourself.'),
});

function UserDetailsForm() {
  const {
    onSubmit,
    isSaving,
    user: {
      firstName,
      lastName,
      mobileNo,
      gender,
      passengerPreference,
      nic: { idNo, front, back } = {},
      userPhoto,
      bio,
    } = {},
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
        passengerPreference: _.isEmpty(passengerPreference) ? validGenders : passengerPreference,
        nic: { idNo, front, back },
        userPhoto,
        bio,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize
    >
      {({
        values: {
          isSignUp,
          nic: { front: nicFront, back: nicBack },
          userPhoto: userPhotoForm,
        },
        submitForm,
        setFieldValue,
        touched,
        errors,
      }) => (
        <div className="user-details-form-container">
          <Form className="user-details-form">
            <Row className="form-elements" type="flex" align="middle">
              <Col lg={{ span: 12 }} xs={{ span: 24 }} className="left-column">
                <Row>
                  <div className="left-column">
                    <label id="user-first-name-label" className="user-input">
                      {i18n.t(`First Name`)}
                    </label>

                    <Form.Item name="firstName">
                      <Input
                        id="user-first-name-input"
                        name="firstName"
                        size="default"
                        placeholder={i18n.t('e.g. John')}
                      />
                    </Form.Item>
                  </div>
                </Row>
                <Row>
                  <div className="left-column">
                    <label id="user-last-name-label" className="user-input">
                      {i18n.t(`Last Name`)}
                    </label>
                    <Form.Item name="lastName">
                      <Input
                        id="user-last-name-input"
                        name="lastName"
                        size="default"
                        placeholder={i18n.t('e.g. Doe')}
                      />
                    </Form.Item>
                  </div>
                </Row>
              </Col>
              <Col lg={{ span: 4, offset: 4 }} xs={{ span: 24 }}>
                <label id="user-last-name-label" className="user-input profile-picture">
                  {i18n.t(`User Photo`)}
                </label>
                <ImageUpload
                  handleImageUpload={(imageBase64) => setFieldValue('userPhoto', imageBase64)}
                  imageURL={userPhotoForm}
                />
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
                  placeholder={i18n.t('e.g. 711234567')}
                />
              </Form.Item>
            </Row>
            <Row className="form-elements">
              <Col lg={{ span: 12 }} xs={{ span: 24 }}>
                <div className="left-column">
                  <label id="user-gender-label" className="user-input">
                    {i18n.t(`Gender`)}
                  </label>
                  <Form.Item name="gender">
                    <GenderSelect id="user-gender-input" name="gender" />
                  </Form.Item>
                </div>
              </Col>
              <Col lg={{ span: 12 }} xs={{ span: 24 }}>
                <div className="right-column">
                  <PassengerPreferenceFormikInput
                    touched={touched.passengerPreference}
                    error={errors.passengerPreference}
                  />
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
                  placeholder={i18n.t('e.g. 123456789V')}
                />
              </Form.Item>
            </Row>
            <Row className="form-elements">
              <Col lg={{ span: 12 }} xs={{ span: 24 }}>
                <label id="user-nic-front-img-label" className="user-input">
                  {i18n.t(`NIC Front Image`)}
                </label>
                <Form.Item name="nic.front">
                  <ImageUpload
                    id="user-nic-front-input"
                    handleImageUpload={(imageBase64) => setFieldValue('nic.front', imageBase64)}
                    imageURL={nicFront}
                  />
                </Form.Item>
              </Col>
              <Col lg={{ span: 12 }} xs={{ span: 24 }}>
                <label id="user-nic-back-img-label" className="user-input">
                  {i18n.t(`NIC Back Image`)}
                </label>
                <Form.Item name="nic.back">
                  <ImageUpload
                    id="user-nic-back-input"
                    handleImageUpload={(imageBase64) => setFieldValue('nic.back', imageBase64)}
                    imageURL={nicBack}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row className="form-elements">
              <label id="user-nic-no-label" className="user-input">
                {i18n.t(`Your Bio`)}
              </label>
              <Form.Item name="bio">
                <Input.TextArea
                  id="user-bio-input"
                  name="bio"
                  size="default"
                  placeholder={i18n.t('Tell us something interesting about yourself.')}
                />
              </Form.Item>
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
