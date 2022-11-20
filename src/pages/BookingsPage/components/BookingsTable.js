import React, { useCallback, useContext, useState } from 'react';
import { Table, Tooltip } from 'antd';
import _ from 'lodash';
import ReactResizeDetector from 'react-resize-detector';
import { getFormattedDate } from 'util/dateUtil';
import BookingStatusBadge from 'components/BookingStatusBadge';
import PaginationBar from 'components/PaginationBar';
import BookingsPageContext from '../BookingPageContext';
import { BookingStatus } from 'enums';

const columns = [
  {
    title: 'Pickup Location',
    dataIndex: ['details', 'pickupLocation'],
    key: 'pickupLocation',
  },
  {
    title: 'Drop Location',
    dataIndex: ['details', 'dropLocation'],
    key: 'dropLocation',
  },
  {
    title: 'Date',
    dataIndex: ['ride', 'departure'],
    key: 'pickupLocation',
    render: (departure) => getFormattedDate(departure),
  },
  {
    title: 'Passenger Count',
    dataIndex: ['details', 'seatsCount'],
    key: 'seatsCount',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => <BookingStatusBadge bookingStatus={status} title={status} />,
  },
];

function BookingsTable() {
  const [gridScrollHeight, setGridScrollHeight] = useState('70vh');
  const {
    bookings,
    isBookingsFetching,
    onBookingSelected,
    // onNextPage,
    // onPreviousPage,
    onAcceptRequest,
    onRejectRequests,
    onBlockBookings,
    onViewPassenger,
  } = useContext(BookingsPageContext);

  const onRow = (record) => ({
    onClick: () => onBookingSelected(record),
  });

  const onResize = useCallback(
    (_0, height) => {
      setGridScrollHeight(height - 150);
    },
    [setGridScrollHeight]
  );

  const columnsWithHoverActions = [
    ...columns,
    {
      title: '',
      width: '30%',
      render: (_0, record) => {
        const isNotEditable = record.status !== BookingStatus.PENDING;
        const { bookingId } = record;
        return (
          <div className="hover-actions-panel">
            <div className=" grid-hover-panel">
              <Tooltip title={isNotEditable ? 'Cannot edit non pending requests' : null}>
                <div className="horizontal-container">
                  <button
                    id="batch-merchandiser-approve"
                    type="button"
                    className="ant-btn btn blue-action-btn"
                    onClick={() => onViewPassenger(bookingId)}
                    disabled={isNotEditable}
                  >
                    <i className="fi flaticon-user" />
                    <span>View Passenger</span>
                  </button>
                  <button
                    id="batch-merchandiser-approve"
                    type="button"
                    className="ant-btn btn green-action-btn"
                    onClick={() => onAcceptRequest(bookingId)}
                    disabled={isNotEditable}
                  >
                    <i className="fi flaticon-tick" />
                    <span>Accept</span>
                  </button>

                  <button
                    id="batch-merchandiser-approve"
                    type="button"
                    className="ant-btn btn red-action-btn"
                    onClick={() => onRejectRequests(bookingId)}
                    disabled={isNotEditable}
                  >
                    <i className="fi flaticon-close" />
                    <span>Reject</span>
                  </button>

                  <button
                    id="batch-merchandiser-approve"
                    type="button"
                    className="ant-btn btn yellow-action-btn"
                    onClick={() => onBlockBookings(bookingId)}
                    disabled={isNotEditable}
                  >
                    <i className="fi flaticon-megaphone" />
                    <span>Block</span>
                  </button>
                </div>
              </Tooltip>
            </div>
          </div>
        );
      },
      className: 'hover-actions',
    },
  ];

  return (
    <div className="rides-table-container">
      <ReactResizeDetector handleHeight onResize={onResize}>
        <div id="liftEkak-batches-table-panel" className="grid-panel ">
          <Table
            id="rides-list-table"
            loading={isBookingsFetching}
            dataSource={bookings}
            columns={columnsWithHoverActions}
            rowClassName="clickable"
            className="rides-table"
            scroll={{ x: '100%', y: gridScrollHeight }}
          />
          {/* <PaginationBar
            onNextPage={onNextPage}
            onPreviousPage={onPreviousPage}
            This won't work as available seat count is checked only after fetching docs
            isNextButtonDisabled={ridesList.length < DEFAULT_PAGE_SIZE}
          /> */}
        </div>
      </ReactResizeDetector>
    </div>
  );
}

export default BookingsTable;
