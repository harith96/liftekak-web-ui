import { Col, Icon, Row, Button } from 'antd';
import CitySelectContainer from 'components/CitySelect/CitySelectContainer';
import { FilterTypes, RideStatus, VehicleType } from 'enums';
import { Formik } from 'formik';
import { DatePicker, Form, Input, Select } from 'formik-antd';
import _ from 'lodash';
import React, { useContext } from 'react';
import { RidesTabs } from 'util/constants';
import RidesListPageContext from '../RidesListPageContext';

const { Option } = Select;
const { RangePicker } = DatePicker;

const searchIndexes = [
  {
    name: 'startTown',
    dataIndex: 'startLocation.location',
    title: 'Start location (Town)',
    placeholder: 'Search starting town',
    props: { type: FilterTypes.CUSTOM, component: CitySelectContainer },
  },
  {
    name: 'destinationTown',
    dataIndex: 'endLocation.location',
    title: 'End location (Town)',
    placeholder: 'Search destination town',
    props: { type: FilterTypes.CUSTOM, component: CitySelectContainer },
  },
  {
    name: 'departure',
    dataIndex: 'departure',
    title: 'Departure',
    placeholder: 'Search departure time range',
    props: { type: FilterTypes.TIME_RANGE },
  },
  {
    name: 'availableSeatCount',
    dataIndex: 'availableSeatCount',
    title: 'Seat count',
    placeholder: 'Search minimum seat count',
    props: { type: FilterTypes.NUMBER },
    tab: RidesTabs.ALL_RIDES,
  },
  {
    name: 'rideStatus',
    dataIndex: 'status',
    title: 'Ride Status',
    placeholder: 'Filter by ride status',
    props: { type: FilterTypes.SELECT, data: { options: _.keys(RideStatus) } },
    tab: RidesTabs.MY_RIDES,
  },
  {
    name: 'vehicleType',
    dataIndex: 'details.vehicle.type',
    title: 'Vehicle Type',
    placeholder: 'Filter by vehicle type',
    props: { type: FilterTypes.SELECT, data: { options: _.keys(VehicleType) } },
  },
];

const getFilterSpan = (type) => {
  let span;

  switch (type) {
    case FilterTypes.TEXT:
      span = 4;
      break;
    case FilterTypes.NUMBER:
      span = 2;
      break;
    case FilterTypes.SELECT:
      span = 4;
      break;
    case FilterTypes.TIME_RANGE:
      span = 6;
      break;
    default:
      span = 4;
      break;
  }

  return span;
};

function RideSearchBar() {
  const {
    onSearch,
    rideFilters: {
      startTown,
      destinationTown,
      departureFrom,
      departureUntil,
      availableSeatCount,
      vehicleType,
      rideStatus,
    },
    activeTabKey,
  } = useContext(RidesListPageContext);

  return (
    <Formik
      initialValues={{
        startTown,
        destinationTown,
        departure: [departureFrom, departureUntil],
        availableSeatCount,
        vehicleType,
        rideStatus,
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        onSearch(values);
        setSubmitting(false);
        resetForm({ values });
      }}
      enableReinitialize
    >
      {({ submitForm }) => {
        return (
          <Form
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                submitForm();
              }
            }}
          >
            <div className="search-container">
              <Row type="flex" align="bottom" justify="space-around" gutter={[16, 16]}>
                {searchIndexes.map(
                  ({ name, title, placeholder, props: { type, data, component: Component }, tab }) =>
                    (!tab || activeTabKey === tab) && (
                      <Col lg={{ span: getFilterSpan(type) }} xs={{ span: 24 }} key={name} className="filter-container">
                        <label id="user-last-name-label" className="user-input">
                          {title}
                        </label>
                        <br />
                        <>
                          {(type === FilterTypes.TEXT || type === FilterTypes.NUMBER) && (
                            <Input
                              id="user-last-name-input"
                              name={name}
                              type={type === FilterTypes.NUMBER ? 'number' : 'text'}
                              size="default"
                              placeholder={placeholder}
                              min={1}
                            />
                          )}
                        </>
                        <>
                          {type === FilterTypes.SELECT && (
                            <Select
                              name={name}
                              allowClear
                              size="default"
                              className="search-select"
                              placeholder={placeholder}
                            >
                              {_.map(data.options, (option) => (
                                <Option key={option} value={option}>
                                  {_.startCase(option)}
                                </Option>
                              ))}
                            </Select>
                          )}
                        </>
                        <>{type === FilterTypes.TIME_RANGE && <RangePicker name={name} showTime />}</>
                        <>{type === FilterTypes.CUSTOM && <Component name={name} placeholder={placeholder} />}</>
                      </Col>
                    )
                )}
                <Col xs={{ span: 24 }} lg={{ span: 4 }} className="search-btn-container">
                  <Button type="primary" onClick={submitForm}>
                    <Icon type="search" />
                    Search
                  </Button>
                </Col>
              </Row>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default RideSearchBar;
