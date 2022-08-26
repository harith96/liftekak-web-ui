import React, { useContext } from 'react';
import * as _ from 'lodash';

import { getFormattedDate, getFormattedTime } from 'util/dateUtil';
import getFullName from 'util/getFullName';
import { Avatar, Col, Divider, Row, Spin } from 'antd';
import getFormattedRoute from 'util/getFormattedRoute';
import { getFullPhoneNumber, simulateCall } from 'util/phoneUtil';
import RideDetailsPageContext from '../RidesDetailsPageContext';
import RideDetailsCard from './RideDetailsCard';

function RideDetails() {
  const {
    isRidesDetailsFetching,
    rideDetails: {
      driver: { firstName, lastName, mobileNo, bio, userPhoto: driverPhoto, countryCode } = {},
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
        <RideDetailsCard title="Start location" icon="right-circle" value={startLocation} />
        <RideDetailsCard title="End location" icon="check-circle" value={destinationLocation} />
        <RideDetailsCard title="Departure date" icon="calendar" value={getFormattedDate(departure)} />
        <RideDetailsCard title="Departure time" icon="clock-circle" value={getFormattedTime(departure)} />
        <RideDetailsCard title="Route" icon="fork" value={getFormattedRoute(route)} lgColSpan={18} />
        <RideDetailsCard title="Available seats" icon="number" value={availableSeatCount} />
      </Row>
      <Divider>
        <h2>Driver</h2>
      </Divider>
      <Row gutter={[32, 32]}>
        <RideDetailsCard
          title="Driver name"
          icon={
            driverPhoto ? (
              <Avatar className="user-avatar" size="default" src={driverPhoto} style={{ marginRight: '0.5rem' }} />
            ) : (
              'smile'
            )
          }
          value={getFullName(firstName, lastName)}
          lgColSpan={8}
        />
        <RideDetailsCard
          title="Driver mobile no"
          icon="phone"
          value={getFullPhoneNumber(countryCode, mobileNo)}
          onClick={() => simulateCall(mobileNo)}
          lgColSpan={8}
        />
        {_.isEmpty(driverNote) ? (
          <RideDetailsCard title="Driver bio" icon="pic-left" value={bio} lgColSpan={8} />
        ) : (
          <RideDetailsCard title="Driver note" icon="message" value={driverNote} lgColSpan={8} />
        )}
      </Row>
      <Divider>
        <h2>Vehicle</h2>
      </Divider>
      <Row gutter={[32, 32]}>
        <RideDetailsCard title="Vehicle type" icon="car" value={vehicleType} />
        <RideDetailsCard title="Vehicle brand" icon="car" value={brand} />
        <RideDetailsCard title="Vehicle model" icon="car" value={model} />
        <RideDetailsCard title="Vehicle color" icon="car" value={vehicleColor} />
      </Row>
    </Spin>
  );
}

export default RideDetails;
