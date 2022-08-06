import React, { useContext } from 'react';
import { Table } from 'antd';
import _ from 'lodash';

import PaginationBar from 'components/PaginationBar';
import { getFormattedDate, getFormattedTime } from 'util/dateUtil';
import getFormattedRoute from 'util/getFormattedRoute';
import getFullName from 'util/getFullName';
import RidesListPageContext from '../RidesListPageContext';

const columns = [
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
    title: 'Route',
    dataIndex: 'details.route',
    key: 'route',
    render: (route) => getFormattedRoute(route),
  },
  {
    title: 'Vehicle type',
    dataIndex: 'details.vehicle.type',
    key: 'driverNotes',
    render: (text) => _.startCase(text),
  },
  {
    title: 'Seats Available',
    dataIndex: 'details.availableSeatCount',
    key: 'availableSeatCount',
  },
  {
    title: 'Driver name',
    dataIndex: 'driver',
    key: 'driverNotes',
    render: (driver) => getFullName(driver.firstName, driver.lastName),
  },
];

function RidesList() {
  const { ridesList, isRidesFetching, onRideSelected, onNextPage, onPreviousPage } = useContext(RidesListPageContext);

  const onRow = (record) => ({
    onClick: () => onRideSelected(record),
  });

  return (
    <div id="rewards-batches-table-panel" className="grid-panel">
      <Table
        id="rides-list-table"
        className="costing-batches-table"
        loading={isRidesFetching}
        dataSource={ridesList}
        columns={columns}
        onRow={onRow}
        rowClassName="antd-clickable-row"
        pagination={false}
      />
      <PaginationBar
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
        // This won't work as available seat count is checked only after fetching docs
        // isNextButtonDisabled={ridesList.length < DEFAULT_PAGE_SIZE}
      />
    </div>
  );
}

export default RidesList;
