import { loadRideDetails, showNotification } from 'actions';
import { NotificationType } from 'enums';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import RideDetailsPageComponent from './components/RideDetailsPageComponent';
import { RideDetailsPageContextProvider } from './RidesDetailsPageContext';

function RidesDetailsPageContainer() {
  const { rideId } = useParams();
  const dispatch = useDispatch();

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
  }, [dispatch, rideDetails, rideError]);

  const fetchRideDetails = useCallback(() => {
    dispatch(loadRideDetails(rideId));
  }, [rideId]);

  const bookRide = useCallback(() => {
    dispatch(
      showNotification(
        'Functionality under development',
        'Functionality is being developed. Please try again later.',
        NotificationType.INFO
      )
    );
  });

  return (
    <RideDetailsPageContextProvider value={{ rideDetails, isRidesDetailsFetching, fetchRideDetails, bookRide }}>
      <RideDetailsPageComponent />
    </RideDetailsPageContextProvider>
  );
}

export default RidesDetailsPageContainer;
