import { Form as AntdForm } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Col, Row, TimePicker, DatePicker, Spin, Empty } from 'antd';
import InfoTooltip from 'components/InfoTooltip';
import PassengerPreferenceFormikInput from 'components/PassengerPreferenceInput';
import SaveVehicleContainer from 'components/SaveVehicle/SaveVehicleContainer';
import { Gender, RideStatus } from 'enums';
import { Formik } from 'formik';
import { Form, Input, InputNumber, Select } from 'formik-antd';
import _ from 'lodash';
import moment from 'moment';
import React, { useContext, useEffect } from 'react';
import * as yup from 'yup';

import * as i18n from '_i18n';
import CitySelect from 'components/CitySelect/CitySelectContainer';
import { ROUTE_MAX_TOWN_COUNT } from 'util/constants';
import FormTitle from 'components/FormTitle';
import CancelRideButton from 'pages/SaveRidePage/components/CancelRideButton';
import DangerModal from 'components/DangerModal';
import useModalToggle from 'hooks/useModalToggle';
import isMyRide from 'util/isMyRide';
import SaveRidePageContext from '../SaveRidePageContext';

const { Option } = Select;
const DEPARTURE_TIME_MIN_STEP = 5;

const validationSchema = yup.object().shape({
  startLocation: yup.string().required(i18n.t('Start location is required.')),
  endLocation: yup.string().required(i18n.t('End location is required.')),
  departure: yup.object().shape({
    date: yup.object().nullable().required(i18n.t('Departure date is required.')),
    time: yup.object().nullable().required(i18n.t('Departure time is required.')),
  }),
  availableSeatCount: yup.number().min(1).required('Available seat count is required.'),
  route: yup
    .array()
    .optional()
    .max(ROUTE_MAX_TOWN_COUNT, `Maximum city count for the route is ${ROUTE_MAX_TOWN_COUNT}.`),
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
      rideId,
      departure,
      driver: { uid: driverUID } = {},
      details: {
        availableSeatCount,
        route: currentRoute,
        driverNote,
        start: { location: currentStartLocation } = {},
        destination: { location: currentEndLocation } = {},
        vehicle,
        passengerPreference,
      } = {},
    } = {},
    isRidesDetailsFetching,
    isRideUpdate,
    isNewVehicleModalVisible,
    toggleVehicleModal,
    cancelRide,
  } = useContext(SaveRidePageContext);

  const [cancelModalVisible, toggleCancelModal] = useModalToggle();

  const initialValues = {
    startLocation: currentStartLocation || '',
    endLocation: currentEndLocation || '',
    departure: {
      date: departure ? moment.utc(departure) : null,
      time: departure ? moment.utc(departure) : null,
    },
    vehicle: vehicle || defaultVehicle,
    passengerPreference: _.keys(passengerPreference) || defaultPassengerPreference,
    availableSeatCount: availableSeatCount || 1,
    route: _.isArray(currentRoute) ? _.slice(currentRoute, 1, -1) : [],
    note: driverNote || '',
  };

  return (
    <Spin spinning={isRidesDetailsFetching}>
      <Formik
        id="ride-details-form"
        onSubmit={(values, { setSubmitting, resetForm }) => {
          onSaveRide(values);
          setSubmitting(false);
          resetForm({ values });
        }}
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnMount
        enableReinitialize
      >
        {({
          values: {
            departure: { date: departureDate, time: departureTime },
            vehicle: selectedVehicle,
            route,
            endLocation,
            startLocation,
          },
          submitForm,
          // values,
          setFieldValue,
          touched,
          errors,
        }) => {
          return (
            <div className="user-details-form-container">
              <FormTitle title={isRideUpdate ? `Update Ride` : 'Add New Ride'} />
              <Row justify="space-between">
                <Col>
                  {rideId && (
                    <h2>
                      <span>Ride #</span>
                      {rideId}
                    </h2>
                  )}
                </Col>
                <Col>
                  {isMyRide(driverUID) && <CancelRideButton onClick={() => toggleCancelModal()} />}
                  <DangerModal
                    visible={cancelModalVisible}
                    onOk={() => {
                      cancelRide({ ...initialValues, status: RideStatus.CANCELLED });
                      toggleCancelModal();
                    }}
                    onCancel={() => toggleCancelModal()}
                    confirmationQuestion={`Are you sure that you want to cancel ride #${rideId || ''}?`}
                  />
                </Col>
              </Row>

              <Form className="user-details-form">
                <Row className="form-elements" gutter={[16, 16]} align="middle">
                  <Col lg={{ span: 12 }} xs={{ span: 24 }}>
                    <div>
                      <label id="user-first-name-label" className="user-input">
                        {i18n.t(`Start location`)}
                      </label>

                      <Form.Item name="startLocation">
                        <CitySelect
                          name="startLocation"
                          placeholder="e.g. Malabe"
                          value={startLocation}
                          setFieldValue={setFieldValue}
                        />
                      </Form.Item>
                    </div>
                  </Col>
                  <Col lg={{ span: 12 }} xs={{ span: 24 }}>
                    <div>
                      <label id="user-last-name-label" className="user-input">
                        {i18n.t(`End Location`)}
                      </label>
                      <Form.Item name="endLocation">
                        <CitySelect
                          name="endLocation"
                          placeholder="e.g. Colombo 3"
                          value={endLocation}
                          setFieldValue={setFieldValue}
                        />
                      </Form.Item>
                    </div>
                  </Col>
                  <Col span={24}>
                    <label id="user-mobile-no-label" className="user-input">
                      {i18n.t(`Route`)}
                      <InfoTooltip title="Adding more towns will help passengers to find your ride more easily." />
                    </label>
                    <Form.Item name="route">
                      <Row gutter={[16, 16]}>
                        <Col lg={{ span: 6 }} xs={{ span: 24 }} className="route-input">
                          <CitySelect
                            name="startLocation"
                            disabled
                            placeholder="Start location"
                            showNextCityIcon
                            setFieldValue={setFieldValue}
                            value={startLocation}
                          />
                        </Col>
                        {_.map(
                          route,
                          (c, index) =>
                            !_.isEmpty(c) && (
                              <Col lg={{ span: 6 }} xs={{ span: 24 }}>
                                <CitySelect
                                  key={route[index]}
                                  name={`route[${index}]`}
                                  showNextCityIcon
                                  setFieldValue={setFieldValue}
                                  value={route[index]}
                                />
                              </Col>
                            )
                        )}
                        {route.length <= ROUTE_MAX_TOWN_COUNT && (
                          <Col lg={{ span: 6 }} xs={{ span: 24 }}>
                            <CitySelect
                              key={`route[${route.length}]`}
                              name={`route[${route.length}]`}
                              placeholder="Enter new town"
                              showNextCityIcon
                              setFieldValue={setFieldValue}
                              clearFieldOnSelect
                            />
                          </Col>
                        )}
                        <Col lg={{ span: 6 }} xs={{ span: 24 }}>
                          <CitySelect
                            name="endLocation"
                            disabled
                            placeholder="End location"
                            setFieldValue={setFieldValue}
                            value={endLocation}
                          />
                        </Col>
                      </Row>
                    </Form.Item>
                  </Col>
                  <Col lg={{ span: 12 }} xs={{ span: 24 }}>
                    <div>
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

                  <Col lg={{ span: 12 }} xs={{ span: 24 }}>
                    <PassengerPreferenceFormikInput
                      touched={touched.passengerPreference}
                      error={errors.passengerPreference}
                    />
                  </Col>
                  <Col lg={{ span: 8 }} xs={{ span: 24 }}>
                    <div>
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
                  <Col lg={{ span: 8 }} xs={{ span: 24 }}>
                    <div>
                      <label id="departure-time-label" className="user-input">
                        {i18n.t(`Departure time`)}
                      </label>
                      <Form.Item name="departure.time">
                        <TimePicker
                          // name="departure.time"
                          // disabledHours={() => (departureDate?.isBefore() ? _.range(0, moment().hour()) : [])}
                          // disabledMinutes={(selectedHour) =>
                          //   selectedHour === moment().hour() && departureDate?.isBefore()
                          //     ? _.range(0, moment().minute(), DEPARTURE_TIME_MIN_STEP)
                          //     : []
                          // }
                          // format="HH:mm"
                          // minuteStep={DEPARTURE_TIME_MIN_STEP}
                          // hideDisabledOptions
                          value={departureTime}
                          onChange={(value) => setFieldValue('departure.time', value)}
                        />
                      </Form.Item>
                    </div>
                  </Col>
                  <Col lg={{ span: 8 }} xs={{ span: 24 }}>
                    <div>
                      <label id="user-passenger-preference-label" className="user-input">
                        {i18n.t(`Available seat count`)}
                        <InfoTooltip title="Available seat count should be between 1 and you vehicle seat count." />
                      </label>
                      <Form.Item name="availableSeatCount">
                        <InputNumber name="availableSeatCount" min={1} />
                      </Form.Item>
                    </div>
                  </Col>
                  <Col span={24}>
                    <label id="user-nic-no-label" className="user-input">
                      {i18n.t(`Notes`)}
                    </label>
                    <Form.Item name="note">
                      <Input
                        id="user-first-name-input"
                        name="note"
                        size="default"
                        placeholder={i18n.t('e.g. Please call after booking the ride.')}
                        allowClear
                      />
                    </Form.Item>
                  </Col>
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
