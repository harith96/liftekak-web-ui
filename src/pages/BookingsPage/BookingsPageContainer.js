import { loadBookingRequests, loadMyBookings, saveBookings } from 'actions';
import { BookingStatus } from 'enums';
import React from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { BookingsTabs } from 'util/constants';
import { BookingsPageContextProvider } from './BookingPageContext';
import BookingPageComponent from './components/BookingPageComponent';

function BookingsPageContainer() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [activeTabKey, setActiveTabKey] = useState(BookingsTabs.BOOKING_REQUESTS);

  const isBookingRequestsVisible = activeTabKey === BookingsTabs.BOOKING_REQUESTS;

  const isBookingRequestsFetching = useSelector((state) => state.bookingRequests.fetching);
  const isMyBookingsFetching = useSelector((state) => state.myBookings.fetching);
  const isSavingBooking = useSelector((state) => state.saveBooking.fetching);

  const bookingRequests = useSelector((state) => state.bookingRequests.data);
  const myBookings = useSelector((state) => state.myBookings.data);

  const isBookingsFetching = isBookingRequestsFetching || isMyBookingsFetching || isSavingBooking;

  useEffect(() => {
    dispatch(loadBookingRequests());
    dispatch(loadMyBookings());
  }, [dispatch]);

  const onViewPassenger = useCallback(() => {}, []);
  const onAcceptRequest = useCallback(
    (bookingId) => {
      dispatch(
        saveBookings({ bookingId, bookingStatus: BookingStatus.ACCEPTED }, () => dispatch(loadBookingRequests()))
      );
    },
    [dispatch]
  );
  const onRejectRequests = useCallback(
    (bookingId) => {
      dispatch(
        saveBookings({ bookingId, bookingStatus: BookingStatus.REJECTED }, () => dispatch(loadBookingRequests()))
      );
    },
    [dispatch]
  );
  const onBlockBookings = useCallback(
    (bookingId) => {
      dispatch(
        saveBookings({ bookingId, bookingStatus: BookingStatus.BLOCKED }, () => dispatch(loadBookingRequests()))
      );
    },
    [dispatch]
  );

  return (
    <BookingsPageContextProvider
      value={{
        bookings: isBookingRequestsVisible ? bookingRequests : myBookings,
        isBookingsFetching,
        activeTabKey,
        setActiveTabKey,
        onAcceptRequest,
        onRejectRequests,
        onBlockBookings,
        onViewPassenger,
      }}
    >
      <BookingPageComponent />
    </BookingsPageContextProvider>
  );
}

export default BookingsPageContainer;
