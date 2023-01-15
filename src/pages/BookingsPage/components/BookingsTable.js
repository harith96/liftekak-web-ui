import React, { useCallback, useContext, useState } from 'react';
import { Table, Tooltip } from 'antd';
import _ from 'lodash';
import ReactResizeDetector from 'react-resize-detector';
import { getFormattedDate } from 'util/dateUtil';
import BookingStatusBadge from 'components/BookingStatusBadge';
import PaginationBar from 'components/PaginationBar';
import BookingsPageContext from '../BookingPageContext';
import { BookingStatus } from 'enums';
import SaveBookingModal from 'components/SaveBooking/SaveBookingContainer';
import { CarOutlined } from '@ant-design/icons';
import DangerModal from 'components/DangerModal';
import useModalToggle from 'hooks/useModalToggle';
import getFullName from 'util/getFullName';
import UserDetailsModal from 'components/UserDetailsModal';

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
  const [selectedBooking, setSelectedBooking] = useState(null);

  const {
    bookings,
    isBookingsFetching,
    isMyBookingPage,
    isBookingRequestsPage,
    // onNextPage,
    // onPreviousPage,
    onAcceptRequest,
    onRejectRequests,
    // onBlockBookings,
    onViewPassenger,
    onCancelBooking,
    viewRideDetails,
  } = useContext(BookingsPageContext);

  const onResize = useCallback(
    (_0, height) => {
      setGridScrollHeight(height - 150);
    },
    [setGridScrollHeight]
  );

  const [isUpdateModalVisible, toggleUpdateModal] = useModalToggle();
  const [isCancelModalVisible, toggleCancelModal] = useModalToggle();
  const [isUserDetailsModalVisible, toggleUserDetailsModal] = useModalToggle();

  const onCell = useCallback(
    (record) => ({
      onClick: () => {
        if (record.status === BookingStatus.PENDING) {
          setSelectedBooking(record);
          toggleUpdateModal();
        }
      },
    }),
    [setSelectedBooking]
  );

  const closeUpdateBookingModal = useCallback(() => {
    setSelectedBooking(undefined);
    toggleUpdateModal();
  }, [setSelectedBooking, toggleUpdateModal]);

  const onOkCancelBookingModal = useCallback(
    (bookingId) => {
      setSelectedBooking(undefined);
      toggleCancelModal();
      onCancelBooking(bookingId);
    },
    [setSelectedBooking, toggleCancelModal, onCancelBooking]
  );

  const onCancel_CancelBookingModal = useCallback(() => {
    setSelectedBooking(undefined);
    toggleCancelModal();
  }, [setSelectedBooking, toggleCancelModal]);

  if (selectedBooking) console.log(selectedBooking);
  const columnsWithHoverActions = [
    isMyBookingPage && {
      title: 'Driver Name',
      dataIndex: ['ride', 'driver'],
      key: 'driverName',
      render: (driver) => getFullName(driver?.firstName, driver?.lastName),
    },
    isBookingRequestsPage && {
      title: 'Passenger Name',
      dataIndex: 'passenger',
      key: 'passenger',
      render: (passenger) => getFullName(passenger?.firstName, passenger?.lastName),
    },
    ...columns.map((column) => ({ ...column, onCell })),
    {
      title: '',
      width: '30%',
      render: (_0, record) => {
        const isNotEditable = record.status !== BookingStatus.PENDING;
        const { bookingId } = record;

        const rideId = record?.rideId || record?.ride?.rideId;
        return (
          <div className="hover-actions-panel">
            <div className=" grid-hover-panel">
              <Tooltip title={isNotEditable ? 'Cannot edit non pending requests' : null}>
                <div className="horizontal-container">
                  <button
                    id="batch-merchandiser-approve"
                    type="button"
                    className="ant-btn btn blue-action-btn"
                    onClick={() => {
                      setSelectedBooking(record);
                      viewRideDetails(rideId);
                    }}
                  >
                    <CarOutlined />
                    <span>View Ride</span>
                  </button>
                  {isMyBookingPage && (
                    <>
                      <button
                        id="batch-merchandiser-approve"
                        type="button"
                        className="ant-btn btn white-action-btn"
                        onClick={() => {
                          onCell(record);
                        }}
                        disabled={isNotEditable}
                      >
                        <i className="fi flaticon-pencil" />
                        <span>Edit</span>
                      </button>
                      <button
                        id="batch-merchandiser-approve"
                        type="button"
                        className="ant-btn btn yellow-action-btn"
                        onClick={() => {
                          setSelectedBooking(record);
                          toggleCancelModal();
                        }}
                        disabled={isNotEditable}
                      >
                        <i className="fi flaticon-close" />
                        <span>Cancel</span>
                      </button>
                    </>
                  )}
                  {isBookingRequestsPage && (
                    <>
                      <button
                        id="batch-merchandiser-approve"
                        type="button"
                        className="ant-btn btn blue-action-btn"
                        onClick={() => {
                          setSelectedBooking(record);
                          toggleUserDetailsModal();
                        }}
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
                    </>
                  )}
                </div>
              </Tooltip>
            </div>
          </div>
        );
      },
      className: 'hover-actions',
    },
  ].filter(Boolean);

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
      <SaveBookingModal
        visible={isUpdateModalVisible}
        booking={selectedBooking}
        toggleModal={closeUpdateBookingModal}
      />
      <DangerModal
        visible={isCancelModalVisible && selectedBooking}
        onOk={onOkCancelBookingModal}
        onCancel={onCancel_CancelBookingModal}
        data={selectedBooking?.bookingId}
        confirmationQuestion={`Are you sure that you want cancel you lift from ${selectedBooking?.details?.pickupLocation} to ${selectedBooking?.details?.dropLocation}?`}
      />
      <UserDetailsModal
        userDetails={selectedBooking?.passenger}
        visible={isUserDetailsModalVisible}
        toggleModal={toggleUserDetailsModal}
      />
    </div>
  );
}

export default BookingsTable;
