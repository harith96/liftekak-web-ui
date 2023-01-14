import { loadRideDetails, saveBookings, showNotification } from 'actions';
import _ from 'lodash';
import { BookingStatus, NotificationType, RideStatus } from 'enums';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getCurrentUserID } from 'common/auth';
import RideDetailsPageComponent from './components/RideDetailsPageComponent';
import { RideDetailsPageContextProvider } from './RidesDetailsPageContext';

function RidesDetailsPageContainer() {
  const { rideId } = useParams();
  const dispatch = useDispatch();

  const userId = getCurrentUserID();

  const rideDetails = useSelector((state) => state.ride.data);
  const isRidesDetailsFetching = useSelector((state) => state.ride.fetching);
  const rideError = useSelector((state) => state.ride.error);

  const userBooking = rideDetails?.details?.bookings?.[userId] || {};

  const { bookingStatus: userBookingStatus, bookingId: userBookingId } = userBooking;

  useEffect(() => {
    if (rideId) {
      if ((!rideDetails?.rideId || rideDetails?.rideId !== rideId) && !rideError) dispatch(loadRideDetails(rideId));
    } else {
      dispatch(
        showNotification({
          message: 'Ride Error',
          description: 'Invalid ride id. Please check the url address again.',
          notificationType: NotificationType.ERROR,
        })
      );
    }
  }, [dispatch, rideDetails, rideError, rideId]);

  const fetchRideDetails = useCallback(() => {
    dispatch(loadRideDetails(rideId));
  }, [rideId, dispatch]);

  const cancelBooking = useCallback(() => {
    dispatch(saveBookings({ bookingId: userBookingId, bookingStatus: BookingStatus.CANCELLED }));
  }, [dispatch, userBookingId]);

  const isMyRide = rideDetails.driver?.uid === getCurrentUserID();

  const rideHasNotStarted = rideDetails.status === RideStatus.NEW;

  // TODO: add check whether my ride
  const shouldAllowBookings =
    rideHasNotStarted &&
    userBookingStatus !== BookingStatus.PENDING &&
    userBookingStatus !== BookingStatus.ACCEPTED &&
    userBookingStatus !== BookingStatus.BLOCKED &&
    !isMyRide;

  const shouldAllowBookingCancellation =
    rideHasNotStarted && (userBookingStatus === BookingStatus.ACCEPTED || userBookingStatus === BookingStatus.PENDING);

  return (
    <RideDetailsPageContextProvider
      value={{
        rideDetails,
        isRidesDetailsFetching,
        fetchRideDetails,
        userBooking,
        shouldAllowBookings,
        shouldAllowBookingCancellation,
        cancelBooking,
      }}
    >
      <RideDetailsPageComponent />
    </RideDetailsPageContextProvider>
  );
}

export default RidesDetailsPageContainer;
