import { Col, Row, Space } from 'antd';
import { RideStatus } from 'enums';
import React, { useContext } from 'react';
import RideDetailsPageContext from '../RidesDetailsPageContext';
import BookingStatusBadge from '../../../components/BookingStatusBadge';
import BookRideButton from './BookRideButton';
import CancelBookingButton from './CancelBookingButton';
import GoToRidesButton from './GoToRidesButton';
import RideDetails from './RideDetails';

import './styles/index.scss';

function RideDetailsPageComponent() {
  const {
    rideDetails: { rideId, status } = {},
    shouldAllowBookings,
    userBooking,
    shouldAllowBookingCancellation,
    cancelBooking,
  } = useContext(RideDetailsPageContext);
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
            <Space>
              {status === RideStatus.CANCELLED && <span className="ant-tag state closed">Cancelled</span>}
              {userBooking?.bookingStatus && (
                <BookingStatusBadge
                  bookingStatus={userBooking?.bookingStatus}
                  title={`Booking ${userBooking?.bookingStatus}`}
                />
              )}
              {shouldAllowBookings && <BookRideButton />}
              {shouldAllowBookingCancellation && <CancelBookingButton cancelBooking={cancelBooking} />}
            </Space>
          </div>
        </Col>
      </Row>
      <RideDetails />
    </>
  );
}

export default RideDetailsPageComponent;
