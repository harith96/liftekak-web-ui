import React from 'react';
import { BookingsTabs } from 'util/constants';

const BookingsPageContext = React.createContext({
  bookings: [],
  isBookingsFetching: true,
  bookingsFilters: {},
  isMyBookingPage: false,
  onNextPage: () => {},
  onPreviousPage: () => {},
  onBookingSelected: () => {},
  onSearch: () => {},
  activeTabKey: BookingsTabs.BOOKING_REQUESTS,
  setActiveTabKey: () => {},
  onViewPassenger: () => {},
  onAcceptRequest: () => {},
  onRejectRequests: () => {},
  onBlockBookings: () => {},
});

export const BookingsPageContextProvider = BookingsPageContext.Provider;

export default BookingsPageContext;
