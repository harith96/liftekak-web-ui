import React, { useContext } from 'react';
import { Table } from 'antd';

import PaginationBar from 'components/PaginationBar';
import { getFormattedDate, getFormattedTime } from 'util/dateUtil';
import RidesListPageContext from '../RidesListPageContext';
import { DEFAULT_PAGE_SIZE } from 'util/constants';

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
    dataIndex: 'details.start.location',
    key: 'startLocation',
  },
  {
    title: 'Destination',
    dataIndex: 'details.destination.location',
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
  const { ridesList, isRidesFetching, onRideSelected, onNextPage, onPreviousPage } = useContext(RidesListPageContext);

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
        pagination={false}
      />
      <PaginationBar
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
        isNextButtonDisabled={ridesList.length < DEFAULT_PAGE_SIZE}
      />
    </div>
  );
}

export default RidesList;
