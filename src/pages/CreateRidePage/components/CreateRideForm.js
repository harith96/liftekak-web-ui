import { Button, Col, Row, Form as AntdForm, Tooltip, Icon } from 'antd';
import { Formik } from 'formik';
import { DatePicker, Form, Input, InputNumber } from 'formik-antd';
import moment from 'moment';
import React, { useContext } from 'react';
import * as yup from 'yup';

import * as i18n from '_i18n';
import CreateRidePageContext from '../CreateRidePageContext';

const validationSchema = yup.object().shape({
  startLocation: yup.string().required(i18n.t('Start location is required.')),
  endLocation: yup.string().required(i18n.t('Start location is required.')),
  departure: yup.string().required(i18n.t('Start location is required.')),
  availableSeatCount: yup.number().min(1).required('Available seat count is required.'),
  route: yup.string().optional(),
  note: yup.string().optional(),
});

function CreateRideForm() {
  const { onCreateRide, isCreatingRide } = useContext(CreateRidePageContext);
  return (
    <Formik
      id="user-details-form"
      onSubmit={(values, { setSubmitting, resetForm }) => {
        onCreateRide(values);
        setSubmitting(false);
        resetForm({ values });
      }}
      initialValues={{
        startLocation: '',
        endLocation: '',
        departure: moment.now(),
        availableSeatCount: 1,
        route: [],
        note: '',
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize
    >
      {({ values: { startLocation, endLocation }, submitForm }) => (
        <div className="user-details-form-container">
          <Form className="user-details-form">
            <Row className="form-elements">
              <Col span={12} className="left-column">
                <div className="left-column">
                  <label id="user-first-name-label" className="user-input">
                    {i18n.t(`Start location`)}
                  </label>

                  <Form.Item name="startLocation">
                    <Input
                      id="user-first-name-input"
                      name="startLocation"
                      size="default"
                      placeholder={i18n.t('Ex: Malabe')}
                    />
                  </Form.Item>
                </div>
              </Col>
              <Col span={12}>
                <div className="right-column">
                  <label id="user-last-name-label" className="user-input">
                    {i18n.t(`End Location`)}
                  </label>
                  <Form.Item name="endLocation">
                    <Input
                      id="user-last-name-input"
                      name="endLocation"
                      size="default"
                      placeholder={i18n.t('Ex: Kollupitiya')}
                    />
                  </Form.Item>
                </div>
              </Col>
            </Row>
            <Row className="form-elements">
              <label id="user-mobile-no-label" className="user-input">
                {i18n.t(`Route`)}
              </label>
              <Form.Item name="route">
                <Input
                  id="user-first-name-input"
                  name="route"
                  addonBefore={startLocation}
                  addonAfter={endLocation}
                  size="default"
                  placeholder={i18n.t('Ex: Thalahena, Battaramulla, Rajagiriya')}
                />
              </Form.Item>
            </Row>
            <Row className="form-elements">
              <Col span={12}>
                <div className="left-column">
                  <label id="user-gender-label" className="user-input">
                    {i18n.t(`Departure`)}
                  </label>
                  <Form.Item name="departure">
                    <DatePicker name="departure" disabledDate={(date) => date < moment()} />
                  </Form.Item>
                </div>
              </Col>
              <Col span={12}>
                <div className="right-column">
                  <label id="user-passenger-preference-label" className="user-input">
                    {i18n.t(`Available seat count`)}
                    <Tooltip title={i18n.t('Available seat count should be between 1 and you vehicle seat count.')}>
                      <Icon type="info-circle" />
                    </Tooltip>
                  </label>
                  <Form.Item name="availableSeatCount">
                    <InputNumber name="availableSeatCount" min={1} />
                  </Form.Item>
                </div>
              </Col>
            </Row>
            <Row className="form-elements">
              <label id="user-nic-no-label" className="user-input">
                {i18n.t(`Note`)}
              </label>
              <Form.Item name="note">
                <Input
                  id="user-first-name-input"
                  name="note"
                  size="default"
                  placeholder={i18n.t('Ex: Please call after booking the ride.')}
                />
              </Form.Item>
            </Row>
            <AntdForm.Item>
              <AntdForm.Item>
                <Button loading={isCreatingRide} onClick={submitForm} type="primary" className="submit-button">
                  {i18n.t('Create ride')}
                </Button>
              </AntdForm.Item>
            </AntdForm.Item>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default CreateRideForm;
