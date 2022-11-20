import { loadRideDetails, saveBookings, showNotification } from 'actions';
import _ from 'lodash';
import { BookingStatus, NotificationType, RideStatus } from 'enums';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import RideDetailsPageComponent from './components/RideDetailsPageComponent';
import { RideDetailsPageContextProvider } from './RidesDetailsPageContext';
import { getCurrentUserID } from 'common/auth';

function RidesDetailsPageContainer() {
  const { rideId } = useParams();
  const dispatch = useDispatch();

  const userId = getCurrentUserID();

  const rideDetails = useSelector(
    (state) => state.rides.data?.find((ride) => ride.rideId === rideId) || state.ride.data
  );
  const isRidesDetailsFetching = useSelector((state) => state.ride.fetching);
  const rideError = useSelector((state) => state.ride.error);

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

  const bookRide = useCallback(() => {
    dispatch(saveBookings());
  }, [dispatch]);

  const userBooking = rideDetails?.details?.bookings?.[userId];

  // TODO: add check whether my ride
  const shouldAllowBookings =
    rideDetails.status === RideStatus.NEW &&
    userBooking?.bookingStatus !== BookingStatus.PENDING &&
    userBooking?.bookingStatus !== BookingStatus.ACCEPTED &&
    userBooking?.bookingStatus !== BookingStatus.BLOCKED;

  return (
    <RideDetailsPageContextProvider
      value={{ rideDetails, isRidesDetailsFetching, fetchRideDetails, bookRide, userBooking, shouldAllowBookings }}
    >
      <RideDetailsPageComponent />
    </RideDetailsPageContextProvider>
  );
}

export default RidesDetailsPageContainer;
