import { saveRide, loadUserVehicles, loadRideDetails, loadCities } from 'actions';
import { getCurrentUserID } from 'common/auth';
import { SaveVehicleContextProvider } from 'components/SaveVehicle/context/SaveVehicleContext';
import { RideStatus } from 'enums';
import useModalToggle from 'hooks/useModalToggle';
import * as _ from 'lodash';
import moment from 'moment';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useLocation, useParams } from 'react-router';
import { APP_ROUTES } from 'util/constants';
import SaveRidePageComponent from './components/SaveRidePageComponent';
import { SaveRidePageContextProvider } from './SaveRidePageContext';

const formatRideValues = (rideId, values) => ({
  ...values,
  route: [values.startLocation, ..._.filter(values.route, (town) => !_.isEmpty(town)), values.endLocation],
  departure: moment(
    `${values.departure.date.format('YYYY-MM-DD')}T${values.departure.time.format('HH:mm')}:00.000Z`
  ).valueOf(),
  rideId: rideId || `${moment.now()}`,
});

function SaveRidePageContainer() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user.data);
  const isRideCreating = useSelector((state) => state.saveRide.fetching);
  const isVehiclesLoading = useSelector((state) => state.userVehicles.fetching);
  const vehicles = useSelector((state) => state.userVehicles.data);
  const [isNewVehicleModalVisible, toggleVehicleModal] = useModalToggle();

  // Start - Logic for ride update
  const { rideId } = useParams();
  const { pathname } = useLocation();
  const isRideUpdate = pathname.includes(APP_ROUTES.UPDATE_RIDE);

  const rideDetails = useSelector((state) => state.ride.data);
  const isRidesDetailsFetching = useSelector((state) => state.ride.fetching);
  const rideError = useSelector((state) => state.ride.error);
  const isRideCancelled = rideDetails?.status === RideStatus.CANCELLED;

  useEffect(() => {
    if (rideId && isRideUpdate) {
      if ((!rideDetails?.rideId || rideDetails?.rideId !== rideId) && !rideError) dispatch(loadRideDetails(rideId));
    }
  }, [dispatch, rideDetails, rideError, rideId, isRideUpdate]);

  // End - Logic for ride update

  useEffect(() => {
    dispatch(loadUserVehicles());
    dispatch(loadCities());
  }, [dispatch]);

  useEffect(() => {
    if (isRideCancelled && !isRidesDetailsFetching && rideId) history.push(`${APP_ROUTES.RIDE_VIEW}/${rideId}`);
  }, [isRideCancelled, isRidesDetailsFetching, rideId, history]);

  const onSaveRide = useCallback(
    (values) => dispatch(saveRide(formatRideValues(rideId, values), history)),
    [dispatch, history, rideId]
  );

  const cancelRide = useCallback(
    (values) => {
      dispatch(saveRide(formatRideValues(rideId, values), history));
    },
    [history, dispatch]
  );

  const isNotRideNewOrMyRide =
    !(isRideCreating || isRidesDetailsFetching) &&
    rideDetails &&
    rideDetails?.rideId &&
    (rideDetails.status !== RideStatus.NEW || rideDetails.driver?.uid !== getCurrentUserID());

  return (
    <>
      {isNotRideNewOrMyRide && <Redirect to={`${APP_ROUTES.RIDE_VIEW}/${rideId}`} />}
      <SaveRidePageContextProvider
        value={{
          onSaveRide,
          isRideCreating,
          vehicles,
          isVehiclesLoading,
          user,
          rideDetails: isRideUpdate ? rideDetails : undefined,
          isRidesDetailsFetching,
          isRideUpdate,
          isNewVehicleModalVisible,
          toggleVehicleModal,
          cancelRide,
        }}
      >
        <SaveVehicleContextProvider>
          <SaveRidePageComponent />
        </SaveVehicleContextProvider>
      </SaveRidePageContextProvider>
    </>
  );
}

export default SaveRidePageContainer;
