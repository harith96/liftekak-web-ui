import { Col, Row } from 'antd';
import React, { useContext } from 'react';
import RideDetailsPageContext from '../RidesDetailsPageContext';
import BookRideButton from './BookRideButton';
import GoToRidesButton from './GoToRidesButton';
import RefreshRideButton from './RefreshRideButton';
import RideDetails from './RideDetails';

import './styles/index.scss';

function RideDetailsPageComponent() {
  const { rideDetails: { rideId } = {} } = useContext(RideDetailsPageContext);
  return (
    <>
      <Row align="middle">
        <Col lg={{ span: 12 }} xs={{ span: 24 }}>
          <div className="horizontal-container ride-id-container">
            <h1>
              <span>Ride </span>
              <span>#</span>
              <span>{rideId}</span>
            </h1>
          </div>
        </Col>
        <Col lg={{ span: 12 }} xs={{ span: 24 }}>
          <div className="horizontal-container ride-details-button-bar">
            <GoToRidesButton />
            <RefreshRideButton />
            <BookRideButton />
          </div>
        </Col>
      </Row>
      <RideDetails />
    </>
  );
}

export default RideDetailsPageComponent;
