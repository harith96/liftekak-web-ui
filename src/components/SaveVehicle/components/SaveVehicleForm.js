import { Checkbox, Form, Input, InputNumber, Select } from 'formik-antd';
import React, { useContext } from 'react';
import { Formik } from 'formik';
import { Row, Form as AntdForm, Button, Tooltip, Icon } from 'antd';
import * as yup from 'yup';
import * as _ from 'lodash';

import * as i18n from '_i18n';
import { FuelType, VehicleType } from 'enums';
import { MAX_PASSENGER_SEAT_COUNTS_BY_VEHICLE_TYPE } from 'util/constants';
import SaveVehicleFormContext from '../context/SaveVehicleContext';
import InfoTooltip from 'components/InfoTooltip';

const { Option } = Select;

const validVehicleTypes = _.keys(VehicleType);
const vehicleTypesKeyValueList = _.map(VehicleType, (value, key) => ({ key, value }));
const fuelTypesKeyValueList = _.map(FuelType, (value, key) => ({ key, value }));

const validationSchema = yup.object().shape({
  type: yup.string().required('Vehicle type is required.').oneOf(validVehicleTypes),
  brand: yup.string().required('Vehicle brand is required.'),
  model: yup.string().required('Vehicle model is required.'),
  color: yup.string().required('Vehicle color is required.'),
  registrationNo: yup
    .string()
    .required('Vehicle registration no is required.')
    .matches(/^([a-zA-Z]{1,3}|((?!0*-)[0-9]{1,3}))-[0-9]{4}(?<!0{4})/, {
      message: 'Invalid vehicle registration number.',
    }),
  passengerSeatCount: yup
    .number()
    .required('Available max. passenger seat count is required.')
    .when(
      'type',
      (type, schema) => schema.max(MAX_PASSENGER_SEAT_COUNTS_BY_VEHICLE_TYPE[type]).min(1),
      'Maximum seat count for this vehicle type exceeded.'
    ),
});

function SaveVehicleForm() {
  const {
    vehicle: { type, brand, model, color, registrationNo, passengerSeatCount, fuelType } = {},
    saveVehicle,
    isSavingVehicle,
  } = useContext(SaveVehicleFormContext);
  return (
    <Formik
      id="user-details-form"
      onSubmit={(values, { setSubmitting, resetForm }) => {
        saveVehicle(values);
        setSubmitting(false);
        resetForm({ values });
      }}
      initialValues={{
        type: type || VehicleType.CAR,
        brand,
        model,
        color,
        registrationNo,
        passengerSeatCount: passengerSeatCount || 1,
        isDefaultVehicle: false,
        fuelType: fuelType || FuelType.PETROL,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize
    >
      {({ submitForm }) => (
        <div className="user-details-form-container">
          <Form className="user-details-form">
            <Row className="form-elements">
              <div className="left-column">
                <label id="type-label" className="user-input">
                  {i18n.t(`Vehicle Type`)}
                </label>
                <Form.Item name="type">
                  <Select id="user-first-name-input" name="type" size="default">
                    {_.map(vehicleTypesKeyValueList, ({ key, value }) => (
                      <Option key={key} value={value}>
                        {_.startCase(key)}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </Row>
            <Row className="form-elements">
              <div className="left-column">
                <label id="type-label" className="user-input">
                  {i18n.t(`Fuel Type`)}
                </label>
                <Form.Item name="fuelType">
                  <Select id="user-first-name-input" name="fuelType" size="default">
                    {_.map(fuelTypesKeyValueList, ({ key, value }) => (
                      <Option key={key} value={value}>
                        {_.startCase(key)}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </Row>
            <Row className="form-elements">
              <label id="user-mobile-no-label" className="user-input">
                {i18n.t(`Vehicle Brand`)}
              </label>
              <Form.Item name="brand">
                <Input id="user-first-name-input" name="brand" size="default" placeholder={i18n.t('e.g. Toyota')} />
              </Form.Item>
            </Row>
            <Row className="form-elements">
              <label id="user-nic-no-label" className="user-input">
                {i18n.t(`Vehicle Model`)}
              </label>
              <Form.Item name="model">
                <Input id="user-first-name-input" name="model" size="default" placeholder={i18n.t('e.g. Swift')} />
              </Form.Item>
            </Row>
            <Row className="form-elements">
              <label id="user-nic-no-label" className="user-input">
                {i18n.t(`Vehicle Color`)}
              </label>
              <Form.Item name="color">
                <Input id="user-first-name-input" name="color" size="default" placeholder={i18n.t('e.g. Red')} />
              </Form.Item>
            </Row>
            <Row className="form-elements">
              <label id="user-nic-no-label" className="user-input">
                {i18n.t(`Vehicle Registration Number`)}
              </label>
              <Form.Item name="registrationNo">
                <Input
                  id="user-first-name-input"
                  name="registrationNo"
                  size="default"
                  placeholder={i18n.t('e.g. AAA-1234')}
                />
              </Form.Item>
            </Row>
            <Row className="form-elements">
              <label id="user-nic-no-label" className="user-input">
                {i18n.t(`Passenger Seat Count`)}
              </label>
              <Form.Item name="passengerSeatCount">
                <InputNumber
                  id="user-first-name-input"
                  name="passengerSeatCount"
                  size="default"
                  max={MAX_PASSENGER_SEAT_COUNTS_BY_VEHICLE_TYPE[type]}
                  min={1}
                />
              </Form.Item>
              <Form.Item name="passengerSeatCount">
                <Checkbox id="user-first-name-input" name="isDefaultVehicle" size="default">
                  <span>Default vehicle</span>
                  <InfoTooltip title={i18n.t('Will be set as default vehicle automatically selected for rides.')} />
                </Checkbox>
              </Form.Item>
            </Row>
            <AntdForm.Item>
              <AntdForm.Item>
                <Button loading={isSavingVehicle} onClick={submitForm} type="primary" className="submit-button">
                  {i18n.t('Save Vehicle')}
                </Button>
              </AntdForm.Item>
            </AntdForm.Item>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default SaveVehicleForm;
