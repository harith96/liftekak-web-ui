import { Col, Row, Space } from 'antd';
import SaveBookingContainer from 'components/SaveBooking/SaveBookingContainer';
import { RideStatus } from 'enums';
import useModalToggle from 'hooks/useModalToggle';
import React, { useContext } from 'react';
import RideDetailsPageContext from '../RidesDetailsPageContext';
import BookingStatusBadge from './BookingStatusBadge';
import BookRideButton from './BookRideButton';
import GoToRidesButton from './GoToRidesButton';
import RideDetails from './RideDetails';

import './styles/index.scss';

function RideDetailsPageComponent() {
  const { rideDetails: { rideId, status } = {}, shouldAllowBookings, userBooking } = useContext(RideDetailsPageContext);
  return (
    <>
      <Row align="middle">
        <Col lg={{ span: 12 }} xs={{ span: 24 }}>
          <Space>
            <GoToRidesButton />
            <h1>
              <span>Ride </span>
              <span>#</span>
              <span>{rideId}</span>
            </h1>
          </Space>
        </Col>
        <Col lg={{ span: 12 }} xs={{ span: 24 }}>
          <div className="horizontal-container ride-details-button-bar">
            {status === RideStatus.CANCELLED && <span className="ant-tag state closed">Cancelled</span>}
            {shouldAllowBookings && <BookRideButton />}
            {userBooking && <BookingStatusBadge bookingStatus={userBooking.bookingStatus} />}
          </div>
        </Col>
      </Row>
      <RideDetails />
    </>
  );
}

export default RideDetailsPageComponent;
