import { Button, Col, Row, Form as AntdForm, Tooltip, Icon, TimePicker, DatePicker, Spin, Empty } from 'antd';
import InfoTooltip from 'components/InfoTooltip';
import PassengerPreferenceFormikInput from 'components/PassengerPreferenceInput';
import SaveVehicleContainer from 'components/SaveVehicle/SaveVehicleContainer';
import { Gender } from 'enums';
import { Formik } from 'formik';
import { Form, Input, InputNumber, Select } from 'formik-antd';
import _ from 'lodash';
import moment from 'moment';
import React, { useContext } from 'react';
import * as yup from 'yup';

import * as i18n from '_i18n';
import CitySelect from 'components/CitySelect/CitySelectContainer';
import SaveRidePageContext from '../SaveRidePageContext';

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
  route: yup.array().optional(),
  note: yup.string().optional(),
  vehicle: yup.object().nullable().required('A vehicle is required'),
  passengerPreference: yup
    .array()
    .of(yup.string().oneOf(_.keys(Gender)))
    .required('Passenger preference is required.')
    .min(1, 'At least one value should be selected for passenger preference.'),
});

function SaveRideForm() {
  const {
    onSaveRide,
    isRideCreating,
    user: { passengerPreference: defaultPassengerPreference, defaultVehicle } = {},
    vehicles,
    isVehiclesLoading,
    rideDetails: {
      departure,
      details: {
        availableSeatCount,
        // route,
        driverNote,
        start: { location: currentStartLocation } = {},
        destination: { location: currentEndLocation } = {},
        vehicle,
      } = {},
    },
    isRidesDetailsFetching,
    isRideUpdate,
    isNewVehicleModalVisible,
    toggleVehicleModal,
  } = useContext(SaveRidePageContext);

  return (
    <Spin spinning={isRidesDetailsFetching}>
      <Formik
        id="ride-details-form"
        onSubmit={(values, { setSubmitting, resetForm }) => {
          onSaveRide(values);
          setSubmitting(false);
          resetForm({ values });
        }}
        initialValues={{
          startLocation: currentStartLocation || '',
          endLocation: currentEndLocation || '',
          departure: {
            date: departure ? moment.unix(departure / 1000) : null,
            time: departure ? moment.unix(departure / 1000) : null,
          },
          vehicle: vehicle || defaultVehicle,
          passengerPreference: defaultPassengerPreference,
          availableSeatCount: availableSeatCount || 1,
          route: [],
          note: driverNote || '',
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
            route,
          },
          submitForm,
          // values,
          setFieldValue,
          touched,
          errors,
        }) => {
          console.log(route);
          return (
            <div className="user-details-form-container">
              <Form className="user-details-form">
                <Row className="form-elements">
                  <Col span={12}>
                    <div className="left-column">
                      <label id="user-first-name-label" className="user-input">
                        {i18n.t(`Start location`)}
                      </label>

                      <Form.Item name="startLocation">
                        <CitySelect name="startLocation" placeholder="e.g. Malabe" />
                      </Form.Item>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="right-column">
                      <label id="user-last-name-label" className="user-input">
                        {i18n.t(`End Location`)}
                      </label>
                      <Form.Item name="endLocation">
                        <CitySelect name="endLocation" placeholder="e.g. Colombo 3" />
                      </Form.Item>
                    </div>
                  </Col>
                </Row>
                <Row className="form-elements">
                  <label id="user-mobile-no-label" className="user-input">
                    {i18n.t(`Route`)}
                  </label>
                  <Form.Item name="route">
                    <Col span={4} className="route-input">
                      <CitySelect name="startLocation" disabled placeholder="Start location" />
                    </Col>
                    {_.map(
                      route,
                      (c, index) =>
                        !_.isEmpty(c) && (
                          <Col span={4} className="route-input">
                            <CitySelect name={`route[${index}]`} />
                          </Col>
                        )
                    )}
                    <Col span={4} className="route-input">
                      <CitySelect name={`route[${route.length}]`} placeholder="Enter new town" />
                    </Col>
                    <Col span={4}>
                      <CitySelect name="endLocation" disabled placeholder="End location" />
                    </Col>
                  </Form.Item>
                </Row>
                <Row className="form-elements">
                  <Col span={12}>
                    <div className="left-column">
                      <div className="vehicle-title">
                        <label id="user-gender-label" className="user-input">
                          {i18n.t(`Vehicle`)}
                        </label>
                        <Button type="link" onClick={toggleVehicleModal}>
                          Add new vehicle
                        </Button>
                        <SaveVehicleContainer visible={isNewVehicleModalVisible} toggleModal={toggleVehicleModal} />
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
                              _.find(vehicles, (v) => value === v.registrationNo)
                            )
                          }
                        >
                          {_.map(vehicles, (v) => (
                            <Option value={v.registrationNo} key={v.registrationNo} id={v.registrationNo}>
                              {v.registrationNo}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </div>
                  </Col>

                  <Col span={12}>
                    <div className="right-column">
                      <PassengerPreferenceFormikInput
                        touched={touched.passengerPreference}
                        error={errors.passengerPreference}
                      />
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
                          disabledDate={(date) => date.isBefore(moment().subtract(1, 'day'))}
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
                          disabledHours={() => (departureDate?.isBefore() ? _.range(0, moment().hour()) : [])}
                          disabledMinutes={(selectedHour) =>
                            selectedHour === moment().hour() && departureDate?.isBefore()
                              ? _.range(0, moment().minute(), DEPARTURE_TIME_MIN_STEP)
                              : []
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
                        <InfoTooltip title="Available seat count should be between 1 and you vehicle seat count." />
                      </label>
                      <Form.Item name="availableSeatCount">
                        <InputNumber name="availableSeatCount" min={1} />
                      </Form.Item>
                    </div>
                  </Col>
                </Row>
                <Row className="form-elements">
                  <label id="user-nic-no-label" className="user-input">
                    {i18n.t(`Notes`)}
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
                      {i18n.t(isRideUpdate ? 'Update ride' : 'Create ride')}
                    </Button>
                  </AntdForm.Item>
                </AntdForm.Item>
              </Form>
            </div>
          );
        }}
      </Formik>
    </Spin>
  );
}

export default SaveRideForm;
