import { Button, Col, Row, Form as AntdForm, Tooltip, Icon, TimePicker, DatePicker, Spin, Empty, Select } from 'antd';
import PassengerPreferenceFormikInput from 'components/PassengerPreferenceInput';
import SaveVehicleContainer from 'components/SaveVehicle/SaveVehicleContainer';
import { Gender } from 'enums';
import { Formik } from 'formik';
import { Form, Input, InputNumber } from 'formik-antd';
import _ from 'lodash';
import moment from 'moment';
import React, { useContext } from 'react';
import * as yup from 'yup';

import * as i18n from '_i18n';
import CreateRidePageContext from '../CreateRidePageContext';

const { Option } = Select;
const DEPARTURE_TIME_MIN_STEP = 5;

const validationSchema = yup.object().shape({
  startLocation: yup.string().required(i18n.t('Start location is required.')),
  endLocation: yup.string().required(i18n.t('Start location is required.')),
  departure: yup.object().shape({
    date: yup.object().nullable().required(i18n.t('Start location is required.')),
    time: yup.object().nullable().required(i18n.t('Start location is required.')),
  }),
  availableSeatCount: yup.number().min(1).required('Available seat count is required.'),
  route: yup.string().optional(),
  note: yup.string().optional(),
  vehicle: yup.object().nullable().required('A vehicle is required'),
  passengerPreference: yup
    .array()
    .of(yup.string().oneOf(_.keys(Gender)))
    .required('Passenger preference is required.'),
});

function CreateRideForm() {
  const {
    onCreateRide,
    isRideCreating,
    user: { passengerPreference: defaultPassengerPreference, defaultVehicle } = {},
    vehicles,
    isVehiclesLoading,
  } = useContext(CreateRidePageContext);

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
        departure: { date: null, time: null },
        vehicle: defaultVehicle,
        passengerPreference: defaultPassengerPreference,
        availableSeatCount: 1,
        route: [],
        note: '',
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize
    >
      {({
        values: {
          startLocation,
          endLocation,
          departure: { date: departureDate, time: departureTime },
          vehicle: selectedVehicle,
        },
        submitForm,
        // values,
        setFieldValue,
      }) => {
        return (
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
                        placeholder={i18n.t('e.g. Malabe')}
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
                        placeholder={i18n.t('e.g. Kollupitiya')}
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
                    placeholder={i18n.t('e.g. Thalahena, Battaramulla, Rajagiriya')}
                  />
                </Form.Item>
              </Row>
              <Row className="form-elements">
                <Col span={12}>
                  <div className="left-column">
                    <div className="vehicle-title">
                      <label id="user-gender-label" className="user-input">
                        {i18n.t(`Vehicle`)}
                      </label>
                      <SaveVehicleContainer />
                    </div>
                    <Form.Item name="vehicle">
                      <Select
                        value={selectedVehicle?.registrationNo}
                        name="vehicle"
                        notFoundContent={
                          isVehiclesLoading ? <Spin size="small" /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        }
                        onChange={(value) =>
                          setFieldValue(
                            'vehicle',
                            _.find(vehicles, (vehicle) => value === vehicle.registrationNo)
                          )
                        }
                      >
                        {_.map(vehicles, (vehicle) => (
                          <Option
                            value={vehicle.registrationNo}
                            key={vehicle.registrationNo}
                            id={vehicle.registrationNo}
                          >
                            {vehicle.registrationNo}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                </Col>

                <Col span={12}>
                  <div className="right-column">
                    <PassengerPreferenceFormikInput />
                  </div>
                </Col>
              </Row>
              <Row className="form-elements">
                <Col span={8}>
                  <div className="left-column">
                    <label id="user-gender-label" className="user-input">
                      {i18n.t(`Departure date`)}
                    </label>
                    <Form.Item name="departure.date">
                      <DatePicker
                        value={departureDate}
                        disabledDate={(date) => date < moment()}
                        format="YYYY-MM-DD"
                        onChange={(value) => setFieldValue('departure.date', value)}
                      />
                    </Form.Item>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="left-column">
                    <label id="departure-time-label" className="user-input">
                      {i18n.t(`Departure time`)}
                    </label>
                    <Form.Item name="departure.time">
                      <TimePicker
                        name="departure.time"
                        disabledHours={() => _.range(0, moment().hour())}
                        disabledMinutes={(selectedHour) =>
                          selectedHour === moment().hour() ? _.range(0, moment().minute(), DEPARTURE_TIME_MIN_STEP) : []
                        }
                        format="HH:mm"
                        minuteStep={DEPARTURE_TIME_MIN_STEP}
                        hideDisabledOptions
                        value={departureTime}
                        onChange={(value) => setFieldValue('departure.time', value)}
                      />
                    </Form.Item>
                  </div>
                </Col>
                <Col span={8}>
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
                    placeholder={i18n.t('e.g. Please call after booking the ride.')}
                  />
                </Form.Item>
              </Row>
              <AntdForm.Item>
                <AntdForm.Item>
                  <Button loading={isRideCreating} onClick={submitForm} type="primary" className="submit-button">
                    {i18n.t('Create ride')}
                  </Button>
                </AntdForm.Item>
              </AntdForm.Item>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}

export default CreateRideForm;
