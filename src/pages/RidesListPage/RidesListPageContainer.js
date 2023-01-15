import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { loadCities, loadMyRides, loadRidesList, updateRideFilters } from 'actions';
import { PageAction, RideStatus } from 'enums';
import { APP_ROUTES, RidesTabs } from 'util/constants';
import { isUserSignedIn } from 'common/auth';
import RidesListPageComponent from './components/RidesListPageComponent';
import { RidesListPageContextProvider } from './RidesListPageContext';

function RidesListPageContainer() {
  const dispatch = useDispatch();
  const history = useHistory();
  const ridesList = useSelector((state) => state.rides.data);
  const myRides = useSelector((state) => state.myRides.data);
  const isMyRidesFetching = useSelector((state) => state.myRides.fetching);
  const rideFilters = useSelector((state) => state.rideFilters.data);
  const isRidesFetching = useSelector((state) => state.rides.fetching);

  const [activeTabKey, setActiveTabKey] = useState(RidesTabs.ALL_RIDES);

  const isAllRidesPageVisible = activeTabKey === RidesTabs.ALL_RIDES;

  useEffect(() => {
    dispatch(loadRidesList());
    dispatch(loadMyRides());
  }, [dispatch, rideFilters]);

  useEffect(() => {
    if (isUserSignedIn()) {
      dispatch(loadCities());
    }
  }, [dispatch]);

  const onNextPage = useCallback(() => dispatch(loadRidesList(PageAction.NEXT)), [dispatch]);

  const onPreviousPage = useCallback(() => dispatch(loadRidesList(PageAction.BACK)), [dispatch]);

  const onRideSelected = useCallback(
    ({ rideId }) => {
      if (rideId) history.push(`${APP_ROUTES.RIDE_VIEW}/${rideId}`);
    },
    [history]
  );

  const onNextMyRidePage = useCallback(() => dispatch(loadMyRides(PageAction.NEXT)), [dispatch]);

  const onPreviousMyRidePage = useCallback(() => dispatch(loadMyRides(PageAction.BACK)), [dispatch]);

  const onMyRideSelected = useCallback(
    ({ rideId, status }) =>
      status === RideStatus.NEW && rideId
        ? history.push(`${APP_ROUTES.UPDATE_RIDE}/${rideId}`)
        : history.push(`${APP_ROUTES.RIDE_VIEW}/${rideId}`),
    [history]
  );

  const saveRide = useCallback(() => history.push(APP_ROUTES.CREATE_RIDE), [history]);

  const onSearch = useCallback(
    ({ startTown, destinationTown, availableSeatCount, vehicleType, departure, rideStatus }) => {
      const [departureFrom, departureUntil] = departure || [];
      const filters = {
        startTown,
        destinationTown,
        availableSeatCount,
        vehicleType,
        departureFrom,
        departureUntil,
        rideStatus,
      };

      dispatch(updateRideFilters(filters));
    },
    [history, dispatch]
  );

  return (
    <RidesListPageContextProvider
      value={{
        ridesList: isAllRidesPageVisible ? ridesList : myRides,
        isRidesFetching: isAllRidesPageVisible ? isRidesFetching : isMyRidesFetching,
        onNextPage: isAllRidesPageVisible ? onNextPage : onNextMyRidePage,
        onPreviousPage: isAllRidesPageVisible ? onPreviousPage : onPreviousMyRidePage,
        onRideSelected: isAllRidesPageVisible ? onRideSelected : onMyRideSelected,
        gotToSaveRideView: saveRide,
        onSearch,
        rideFilters,
        activeTabKey,
        setActiveTabKey,
      }}
    >
      <RidesListPageComponent />
    </RidesListPageContextProvider>
  );
}

export default RidesListPageContainer;
