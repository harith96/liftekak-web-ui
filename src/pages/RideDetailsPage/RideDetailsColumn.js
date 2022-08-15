import { Col } from 'antd';
import React from 'react';
import RideDetailsCard from './components/RideDetailsCard';

function RideDetailsColumn({ title, icon, value, onClick, lgColSpan = 6 }) {
  return (
    <Col lg={{ span: lgColSpan }} xs={{ span: 24 }}>
      <RideDetailsCard title={title} icon={icon} value={value} onClick={onClick} />
    </Col>
  );
}

export default RideDetailsColumn;
