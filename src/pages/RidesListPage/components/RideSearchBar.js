import { SearchOutlined } from '@ant-design/icons';
import { Col, Row, Button, Collapse, Grid, Typography } from 'antd';
import CollapsePanel from 'antd/lib/collapse/CollapsePanel';
import CitySelectContainer from 'components/CitySelect/CitySelectContainer';
import TextWithIcon from 'components/TextWithIcon';
import { FilterTypes, RideStatus, VehicleType } from 'enums';
import { Formik } from 'formik';
import { DatePicker, Form, Input, Select } from 'formik-antd';
import _ from 'lodash';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { RidesTabs } from 'util/constants';
import RidesListPageContext from '../RidesListPageContext';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { useBreakpoint } = Grid;
const { Text } = Typography;

const searchIndexes = [
  {
    name: 'startTown',
    dataIndex: 'startLocation.location',
    title: 'Start Location (Town)',
    placeholder: 'Search starting town',
    props: { type: FilterTypes.CUSTOM, component: CitySelectContainer },
  },
  {
    name: 'destinationTown',
    dataIndex: 'endLocation.location',
    title: 'End Location (Town)',
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
    title: 'Seat Count',
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
      span = 3;
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
  const [isBarExpanded, setIsBarExpanded] = useState(true);
  const { xs } = useBreakpoint();

  useEffect(() => setIsBarExpanded(!xs), [xs]);

  const onCollapseChange = useCallback((key) => setIsBarExpanded(!_.isEmpty(key)), [setIsBarExpanded]);
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
      {({ submitForm, setFieldValue }) => {
        return (
          <Collapse ghost activeKey={isBarExpanded ? 1 : null} onChange={onCollapseChange}>
            <CollapsePanel header={<TextWithIcon icon={<SearchOutlined />} text="Search Rides" />} key={1}>
              <Form
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    submitForm();
                  }
                }}
              >
                <div className="search-container">
                  <Row align="bottom" justify="space-around" gutter={[16, 16]}>
                    {searchIndexes.map(
                      ({ name, title, placeholder, props: { type, data, component: Component }, tab }) =>
                        (!tab || activeTabKey === tab) && (
                          <Col
                            lg={{ span: getFilterSpan(type) }}
                            xs={{ span: 24 }}
                            key={name}
                            className="filter-container"
                          >
                            <label id="user-last-name-label" className="user-input">
                              <Text ellipsis={{ tooltip: title }}>{title}</Text>
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
                            <>{type === FilterTypes.TIME_RANGE && <RangePicker name={name} />}</>
                            <>
                              {type === FilterTypes.CUSTOM && (
                                <Component name={name} placeholder={placeholder} setFieldValue={setFieldValue} />
                              )}
                            </>
                          </Col>
                        )
                    )}
                    <Col xs={{ span: 24 }} lg={{ span: 4 }} className="search-btn-container">
                      <Button type="primary" onClick={submitForm} className="ride-search-button">
                        <SearchOutlined />
                        Search
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Form>
            </CollapsePanel>
          </Collapse>
        );
      }}
    </Formik>
  );
}

export default RideSearchBar;
