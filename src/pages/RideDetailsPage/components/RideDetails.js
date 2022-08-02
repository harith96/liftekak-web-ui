import React, { useContext } from 'react';
import * as _ from 'lodash';

import { getFormattedDateAndTime } from 'util/dateUtil';
import getFullName from 'util/getFullName';
import * as i18n from '_i18n';
import { Spin } from 'antd';
import RideDetailsPageContext from '../RidesDetailsPageContext';

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

const getFormattedRoute = (route) => _.join(route, ' > ');

function RideDetails() {
  const {
    isRidesDetailsFetching,
    rideDetails: {
      rideId,
      driver: { firstName, lastName, mobileNo } = {},
      availableSeatCount,
      destination: { location: destinationLocation } = {},
      start: { location: startLocation } = {},
      departure: { seconds: departure } = {},
      details: { route, driverNote, vehicle: { type: vehicleType } = {} } = {},
    } = {},
  } = useContext(RideDetailsPageContext);

  return (
    <Spin spinning={isRidesDetailsFetching} delay={200} className="spinner-container">
      <div className="ride-details-container">
        {renderRideDetail(i18n.t('Ride Id'), rideId)}
        {renderRideDetail(i18n.t('Start Location'), startLocation)}
        {renderRideDetail(i18n.t('End Location'), destinationLocation)}
        {renderRideDetail(i18n.t('Departure'), getFormattedDateAndTime(departure))}
        {renderRideDetail(i18n.t('Route'), getFormattedRoute(route))}
        {renderRideDetail(i18n.t('Driver Name'), getFullName(firstName, lastName))}
        {renderRideDetail(i18n.t('Driver Mobile No'), mobileNo)}
        {renderRideDetail(i18n.t('Available seat Count'), availableSeatCount)}
        {renderRideDetail(i18n.t('Vehicle'), vehicleType)}
        {renderRideDetail(i18n.t('Driver Note'), driverNote)}
      </div>
    </Spin>
  );
}

export default RideDetails;
