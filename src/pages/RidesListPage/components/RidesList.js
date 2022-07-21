import { Table } from 'antd';
import moment from 'moment';
import React, { useContext } from 'react';

import RidesListPageContext from '../RidesListPageContext';

const columns = [
  {
    title: 'Ride Id',
    dataIndex: 'rideId',
    key: 'rideId',
  },
  {
    title: 'Start Location',
    dataIndex: 'start.location',
    key: 'startLocation',
  },
  {
    title: 'Destination',
    dataIndex: 'destination.location',
    key: 'destination',
  },
  {
    title: 'Departure',
    dataIndex: 'departure',
    key: 'departure',
    render: (departure) => moment.utc(departure.seconds * 1000).format('MM/DD/YYYY hh:mmA'),
  },
  {
    title: 'Available seat count',
    dataIndex: 'details.availableSeatCount',
    key: 'availableSeatCount',
  },
  {
    title: 'Driver notes',
    dataIndex: 'details.driverNote',
    key: 'driverNotes',
  },
];

function RidesList() {
  const { ridesList, isRidesFetching } = useContext(RidesListPageContext);

  return (
    <div id="rewards-batches-table-panel" className="grid-panel">
      <Table
        id="rides-list-table"
        className="costing-batches-table"
        loading={isRidesFetching}
        dataSource={ridesList}
        columns={columns}
      />
    </div>
  );
}

export default RidesList;
