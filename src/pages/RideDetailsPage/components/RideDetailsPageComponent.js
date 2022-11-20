import { Col, Row, Space } from 'antd';
import { RideStatus } from 'enums';
import React, { useContext } from 'react';
import RideDetailsPageContext from '../RidesDetailsPageContext';
import GoToRidesButton from './GoToRidesButton';
import RideDetails from './RideDetails';

import './styles/index.scss';

function RideDetailsPageComponent() {
  const { rideDetails: { rideId, status } = {} } = useContext(RideDetailsPageContext);
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
            {status === RideStatus.CANCELLED && <span className="ant-tag state rejected">Cancelled</span>}
          </div>
        </Col>
      </Row>
      <RideDetails />
    </>
  );
}

export default RideDetailsPageComponent;
