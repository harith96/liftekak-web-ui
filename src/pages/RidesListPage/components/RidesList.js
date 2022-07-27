import { Table } from 'antd';
import moment from 'moment';
import React, { useContext } from 'react';
import { getFormattedDate, getFormattedTime } from 'util/dateUtil';

import RidesListPageContext from '../RidesListPageContext';

const columns = [
  {
    title: 'Ride Id',
    dataIndex: 'rideId',
    key: 'rideId',
    render: (text) => (
      <div id={`rides-table-ride-${text}`} className="link-div" aria-hidden="true">
        {text}
      </div>
    ),
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
    title: 'Departure Date',
    dataIndex: 'departure',
    key: 'departureDate',
    render: (departure) => getFormattedDate(departure),
  },
  {
    title: 'Departure Time',
    dataIndex: 'departure',
    key: 'departureTime',
    render: (departure) => getFormattedTime(departure),
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
  const { ridesList, isRidesFetching, onRideSelected } = useContext(RidesListPageContext);

  return (
    <div id="rewards-batches-table-panel" className="grid-panel">
      <Table
        id="rides-list-table"
        className="costing-batches-table"
        loading={isRidesFetching}
        dataSource={ridesList}
        columns={columns}
        onRowClick={onRideSelected}
        rowClassName="antd-clickable-row"
      />
    </div>
  );
}

export default RidesList;
