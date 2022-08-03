import { Col, Icon, Row, Button } from 'antd';
import { FilterTypes, VehicleType } from 'enums';
import { Formik } from 'formik';
import { DatePicker, Form, Input, Select } from 'formik-antd';
import _ from 'lodash';
import React, { useCallback, useContext } from 'react';
import RidesListPageContext from '../RidesListPageContext';

const { Option } = Select;
const { RangePicker } = DatePicker;

const searchIndexes = [
  {
    name: 'startTown',
    dataIndex: 'startLocation.location',
    title: 'Start location (Town)',
    placeholder: 'Search starting town',
    props: { type: FilterTypes.TEXT },
  },
  {
    name: 'destinationTown',
    dataIndex: 'endLocation.location',
    title: 'End location (Town)',
    placeholder: 'Search destination town',
    props: { type: FilterTypes.TEXT },
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
  const { onSearch } = useContext(RidesListPageContext);

  return (
    <Formik
      initialValues={{
        startTown: undefined,
        destinationTown: undefined,
        departure: [],
        availableSeatCount: 1,
        vehicleType: null,
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        onSearch(values);
        setSubmitting(false);
        resetForm({ values });
      }}
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
              <Row type="flex" align="bottom" justify="space-around">
                {searchIndexes.map(({ dataIndex, name, title, placeholder, props: { type, data } }) => (
                  <Col span={getFilterSpan(type)} key={name}>
                    <label id="user-last-name-label" className="user-input">
                      {title}
                    </label>
                    <>
                      {(type === FilterTypes.TEXT || type === FilterTypes.NUMBER) && (
                        <Input
                          id="user-last-name-input"
                          name={name}
                          type={type === FilterTypes.NUMBER ? 'number' : 'text'}
                          size="default"
                          placeholder={placeholder}
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
                  </Col>
                ))}
                <Button type="primary" onClick={submitForm}>
                  <Icon type="search" />
                  Search
                </Button>
              </Row>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default RideSearchBar;
