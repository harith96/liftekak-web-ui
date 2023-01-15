import { Formik } from 'formik';
import { Form, Input } from 'formik-antd';
import React, { useContext } from 'react';
import { Col, Row, Form as AntdForm, Button } from 'antd';
import * as yup from 'yup';

import * as i18n from '_i18n';
import CitySelect from 'components/CitySelect/CitySelectContainer';
import InfoTooltip from 'components/InfoTooltip';
import SaveBookingContext from '../SaveBookingContext';

const getSeatsDescription = (availableSeatCount = 0) =>
  `Only ${availableSeatCount} seat${availableSeatCount === 1 ? '' : 's'} ${
    availableSeatCount === 1 ? 'is' : 'are'
  } available. However this value may have change since the last update.`;

function SaveBookingForm() {
  const {
    availableSeatCount,
    booking: {
      bookingId,
      details: { pickupLocation = '', dropLocation = '', passengerNote = '', seatsCount = 1 } = {},
    } = {},
    saveBooking,
    isSavingBooking,
  } = useContext(SaveBookingContext);

  const validationSchema = yup.object().shape({
    pickupLocation: yup.string().required('Pickup location is required.'),
    dropLocation: yup.string().required('Drop location is required.'),
    passengerNote: yup.string().optional(),
    seatsCount: yup
      .number()
      .min(1, 'At least 1 seat must be requested.')
      .max(availableSeatCount, getSeatsDescription(availableSeatCount)),
  });

  return (
    <Formik
      id="user-details-form"
      onSubmit={(values, { setSubmitting, resetForm }) => {
        saveBooking(values);
        setSubmitting(false);
        resetForm({ values });
      }}
      initialValues={{
        bookingId,
        pickupLocation,
        dropLocation,
        passengerNote,
        seatsCount,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize
    >
      {({ submitForm, setFieldValue }) => {
        return (
          <div className="user-details-form-container">
            <Form className="user-details-form">
              <Row className="form-elements">
                <Col span={24}>
                  <div className="left-column">
                    <label id="type-label" className="user-input">
                      {i18n.t('liftEkak.booking.details.pickupLocation')}
                    </label>
                    <Form.Item name="pickupLocation">
                      <CitySelect
                        name="pickupLocation"
                        placeholder="e.g. Malabe"
                        value={pickupLocation}
                        setFieldValue={setFieldValue}
                      />
                    </Form.Item>
                  </div>
                </Col>
              </Row>
              <Row className="form-elements">
                <Col span={24}>
                  <div className="left-column">
                    <label id="type-label" className="user-input">
                      {i18n.t('liftEkak.booking.details.dropLocation')}
                    </label>
                    <Form.Item name="fuelType">
                      <CitySelect
                        name="dropLocation"
                        placeholder="e.g. Kollupitiya"
                        value={dropLocation}
                        setFieldValue={setFieldValue}
                      />
                    </Form.Item>
                  </div>
                </Col>
              </Row>
              <Row className="form-elements">
                <Col span={24}>
                  <label id="user-mobile-no-label" className="user-input">
                    {i18n.t('liftEkak.booking.details.seatsCount')}
                    <InfoTooltip title={getSeatsDescription(availableSeatCount)} />
                  </label>
                  <Form.Item name="seatsCount">
                    <Input
                      id="user-first-name-input"
                      name="seatsCount"
                      size="default"
                      type="number"
                      placeholder={i18n.t('Required Seats Count')}
                      min={1}
                      max={availableSeatCount}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row className="form-elements">
                <Col span={24}>
                  <label id="user-mobile-no-label" className="user-input">
                    {i18n.t('liftEkak.booking.details.passengerNote')}
                  </label>
                  <Form.Item name="passengerNote">
                    <Input.TextArea
                      id="user-first-name-input"
                      name="passengerNote"
                      size="default"
                      placeholder={i18n.t('Any additional details for the driver')}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <AntdForm.Item>
                <AntdForm.Item>
                  <Button loading={isSavingBooking} onClick={submitForm} type="primary" className="submit-button">
                    {i18n.t('Save Booking')}
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

export default SaveBookingForm;
