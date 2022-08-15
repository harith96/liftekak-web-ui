import React, { useContext } from 'react';
import * as _ from 'lodash';

import { getFormattedDate, getFormattedTime } from 'util/dateUtil';
import getFullName from 'util/getFullName';
import { Col, Divider, Row, Spin } from 'antd';
import getFormattedRoute from 'util/getFormattedRoute';
import simulateCall from 'util/simulateCall';
import RideDetailsPageContext from '../RidesDetailsPageContext';
import RideDetailsColumn from './RideDetailsColumn';

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
      <Divider>
        <h2>Overview</h2>
      </Divider>
      <Row gutter={[32, 32]}>
        <RideDetailsColumn title="Start location" icon="right-circle" value={startLocation} />
        <RideDetailsColumn title="End location" icon="check-circle" value={destinationLocation} />
        <RideDetailsColumn title="Departure date" icon="calendar" value={getFormattedDate(departure)} />
        <RideDetailsColumn title="Departure time" icon="clock-circle" value={getFormattedTime(departure)} />
        <RideDetailsColumn title="Route" icon="fork" value={getFormattedRoute(route)} lgColSpan={18} />
        <RideDetailsColumn title="Available seats" icon="number" value={availableSeatCount} />
      </Row>
      <Divider>
        <h2>Driver</h2>
      </Divider>
      <Row gutter={[32, 32]}>
        <RideDetailsColumn title="Driver name" icon="smile" value={getFullName(firstName, lastName)} lgColSpan={8} />
        <RideDetailsColumn
          title="Driver mobile no"
          icon="phone"
          value={mobileNo}
          onClick={() => simulateCall(mobileNo)}
          lgColSpan={8}
        />
        {_.isEmpty(driverNote) ? (
          <RideDetailsColumn title="Driver bio" icon="pic-left" value={bio} lgColSpan={8} />
        ) : (
          <RideDetailsColumn title="Driver note" icon="message" value={driverNote} lgColSpan={8} />
        )}
      </Row>
      <Divider>
        <h2>Vehicle</h2>
      </Divider>
      <Row gutter={[32, 32]}>
        <RideDetailsColumn title="Vehicle type" icon="car" value={vehicleType} />
        <RideDetailsColumn title="Vehicle brand" icon="car" value={brand} />
        <RideDetailsColumn title="Vehicle model" icon="car" value={model} />
        <RideDetailsColumn title="Vehicle color" icon="car" value={vehicleColor} />
      </Row>
    </Spin>
  );
}

export default RideDetails;
