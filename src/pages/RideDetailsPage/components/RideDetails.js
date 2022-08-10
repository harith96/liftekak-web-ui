import React, { useContext } from 'react';
import * as _ from 'lodash';

import { getFormattedDate, getFormattedTime } from 'util/dateUtil';
import getFullName from 'util/getFullName';
import * as i18n from '_i18n';
import { Col, Row, Spin } from 'antd';
import getFormattedRoute from 'util/getFormattedRoute';
import RideDetailsPageContext from '../RidesDetailsPageContext';
import RideDetailsCard from './RideDetailsCard';
import simulateCall from 'util/simulateCall';

const renderRideDetail = (title, value) => {
  return (
    <div className="ride-field-container">
      <p>
        <span>{`${title}: `}</span>
        <span>{value || ''}</span>
      </p>
    </div>
  );
};

function RideDetails() {
  const {
    isRidesDetailsFetching,
    rideDetails: {
      driver: { firstName, lastName, mobileNo, bio } = {},
      departure: { seconds: departure } = {},
      details: {
        availableSeatCount,
        route,
        driverNote,
        vehicle: { type: vehicleType, brand, model, color: vehicleColor } = {},
        destination: { location: destinationLocation } = {},
        start: { location: startLocation } = {},
      } = {},
    } = {},
  } = useContext(RideDetailsPageContext);

  return (
    <Spin spinning={isRidesDetailsFetching} delay={200} className="spinner-container">
      <div>
        <Row>
          <Col span={24}>
            <h2>Overview</h2>
          </Col>
        </Row>
        <Row gutter={[32, 32]}>
          <Col span={6}>
            <RideDetailsCard title="Start location" icon="right-circle" value={startLocation} />
          </Col>
          <Col span={6}>
            <RideDetailsCard title="End location" icon="check-circle" value={destinationLocation} />
          </Col>
          <Col span={6}>
            <RideDetailsCard title="Departure date" icon="calendar" value={getFormattedDate(departure)} />
          </Col>
          <Col span={6}>
            <RideDetailsCard title="Departure time" icon="clock-circle" value={getFormattedTime(departure)} />
          </Col>
        </Row>
        <Row gutter={[32, 32]}>
          <Col span={18}>
            <RideDetailsCard title="Route" icon="fork" value={getFormattedRoute(route)} />
          </Col>
          <Col span={6}>
            <RideDetailsCard title="Available seats" icon="number" value={availableSeatCount} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <h2>Driver</h2>
          </Col>
        </Row>
        <Row gutter={[32, 32]}>
          <Col span={8}>
            <RideDetailsCard title="Driver name" icon="smile" value={getFullName(firstName, lastName)} />
          </Col>
          <Col span={8}>
            <RideDetailsCard
              title="Driver mobile no"
              icon="phone"
              value={mobileNo}
              onClick={() => simulateCall(mobileNo)}
            />
          </Col>
          <Col span={8}>
            {_.isEmpty(driverNote) ? (
              <RideDetailsCard title="Driver bio" icon="pic-left" value={bio} />
            ) : (
              <RideDetailsCard title="Driver note" icon="message" value={driverNote} />
            )}
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <h2>Vehicle</h2>
          </Col>
        </Row>
        <Row gutter={[32, 32]}>
          <Col span={6}>
            <RideDetailsCard title="Vehicle type" icon="car" value={vehicleType} />
          </Col>
          <Col span={6}>
            <RideDetailsCard title="Vehicle brand" icon="car" value={brand} />
          </Col>
          <Col span={6}>
            <RideDetailsCard title="Vehicle model" icon="car" value={model} />
          </Col>
          <Col span={6}>
            <RideDetailsCard title="Vehicle color" icon="car" value={vehicleColor} />
          </Col>
        </Row>
      </div>
    </Spin>
  );
}

export default RideDetails;
