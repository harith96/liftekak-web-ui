import React from 'react';

const SaveBookingContext = React.createContext({
  booking: {},
  isSavingBooking: false,
  saveBooking: () => {},
  modal: { visible: false, toggleModal: () => {} },
  isBookingUpdate: false,
});

export const SaveBookingContextProvider = SaveBookingContext.Provider;

export default SaveBookingContext;
