import { saveBookings } from 'actions';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SaveBookingComponent from './components/SaveBookingComponent';
import { SaveBookingContextProvider } from './SaveBookingContext';

function SaveBookingContainer({ booking, visible, toggleModal }) {
  const dispatch = useDispatch();
  const isSavingBooking = useSelector((state) => state.saveBooking.fetching);
  const availableSeatCount = useSelector((state) => state.ride.data?.details?.availableSeatCount);

  const onSaveBooking = useCallback((values) => dispatch(saveBookings(values, toggleModal)), [dispatch, toggleModal]);
  return (
    <SaveBookingContextProvider
      value={{
        modal: { visible, toggleModal },
        saveBooking: onSaveBooking,
        isSavingBooking,
        booking,
        availableSeatCount,
      }}
    >
      <SaveBookingComponent />
    </SaveBookingContextProvider>
  );
}

export default SaveBookingContainer;
