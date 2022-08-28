import React, { useCallback, useContext, useState } from 'react';
import { Space, Table, Tooltip } from 'antd';
import _ from 'lodash';
import ReactResizeDetector from 'react-resize-detector';

import PaginationBar from 'components/PaginationBar';
import { getFormattedDate, getFormattedTime } from 'util/dateUtil';
import getFormattedRoute from 'util/getFormattedRoute';
import getFullName from 'util/getFullName';
import { CloseCircleFilled } from '@ant-design/icons';
import { RideStatus } from 'enums';
import RidesListPageContext from '../RidesListPageContext';

const columns = [
  {
    title: 'Departure Date',
    dataIndex: 'departure',
    key: 'departureDate',
    render: (departure, record) => (
      <Space>
        <Tooltip title={record.status === RideStatus.CANCELLED ? 'This ride was cancelled' : null}>
          {record.status === RideStatus.CANCELLED && <CloseCircleFilled style={{ color: '#6a737b' }} />}
        </Tooltip>
        {getFormattedDate(departure)}
      </Space>
    ),
  },
  {
    title: 'Departure Time',
    dataIndex: 'departure',
    key: 'departureTime',
    render: (departure) => getFormattedTime(departure),
  },
  {
    title: 'Route',
    dataIndex: ['details', 'route'],
    key: 'route',
    render: (route) => getFormattedRoute(route),
  },
  {
    title: 'Vehicle Type',
    dataIndex: ['details', 'vehicle', 'type'],
    key: 'driverNotes',
    render: (text) => _.startCase(text),
  },
  {
    title: 'Seats Available',
    dataIndex: ['details', 'availableSeatCount'],
    key: 'availableSeatCount',
  },
  {
    title: 'Driver Name',
    dataIndex: 'driver',
    key: 'driverNotes',
    render: (driver) => getFullName(driver.firstName, driver.lastName),
  },
];

function RidesTable() {
  const [gridScrollHeight, setGridScrollHeight] = useState('70vh');
  const { ridesList, isRidesFetching, onRideSelected, onNextPage, onPreviousPage } = useContext(RidesListPageContext);

  const onRow = (record) => ({
    onClick: () => onRideSelected(record),
  });

  const onResize = useCallback(
    (_0, height) => {
      setGridScrollHeight(height - 150);
    },
    [setGridScrollHeight]
  );

  return (
    <div className="rides-table-container">
      <ReactResizeDetector handleHeight onResize={onResize}>
        <div id="rewards-batches-table-panel" className="grid-panel ">
          <Table
            id="rides-list-table"
            loading={isRidesFetching}
            dataSource={ridesList}
            columns={columns}
            onRow={onRow}
            rowClassName="clickable"
            pagination={false}
            className="rides-table"
            scroll={{ x: '100%', y: gridScrollHeight }}
          />
          <PaginationBar
            onNextPage={onNextPage}
            onPreviousPage={onPreviousPage}
            // This won't work as available seat count is checked only after fetching docs
            // isNextButtonDisabled={ridesList.length < DEFAULT_PAGE_SIZE}
          />
        </div>
      </ReactResizeDetector>
    </div>
  );
}

export default RidesTable;
