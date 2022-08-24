import { Col, Row } from 'antd';
import GoToRidesButton from 'pages/RideDetailsPage/components/GoToRidesButton';
import React from 'react';

function FormTitle({ title }) {
  return (
    <Row align="middle">
      <Col span={2}>
        <GoToRidesButton />
      </Col>
      <Col lg={{ span: 8, offset: 8 }} xs={{ span: 14, offset: 5 }} sm={{ span: 14, offset: 5 }}>
        <h1>{title}</h1>
      </Col>
    </Row>
  );
}

export default FormTitle;
