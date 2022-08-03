import { saveRide, loadUserVehicles, showNotification, loadRideDetails } from 'actions';
import { SaveVehicleContextProvider } from 'components/SaveVehicle/context/SaveVehicleContext';
import { NotificationType } from 'enums';
import * as _ from 'lodash';
import moment from 'moment';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router';
import { APP_ROUTES } from 'util/constants';
import SaveRidePageComponent from './components/SaveRidePageComponent';
import { SaveRidePageContextProvider } from './SaveRidePageContext';

const formatRideValues = (values) => ({
  ...values,
  route: _.chain(values.route)
    .split(',')
    .push(values.endLocation)
    .unshift(values.startLocation)
    .map((town) => _.trim(town))
    .value(),
  departure: moment(
    `${values.departure.date.format('YYYY-MM-DD')}T${values.departure.time.format('HH:mm')}:00.000Z`
  ).valueOf(),
});

function SaveRidePageContainer() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user.data);
  const isRideCreating = useSelector((state) => state.saveRide.fetching);
  const isVehiclesLoading = useSelector((state) => state.userVehicles.fetching);
  const vehicles = useSelector((state) => state.userVehicles.data);

  // Start - Logic for ride update
  const { rideId } = useParams();
  const { pathname } = useLocation();
  const isRideUpdate = pathname.includes(APP_ROUTES.UPDATE_RIDE);

  const rideDetails = useSelector(
    (state) => state.rides.data?.find((ride) => ride.rideId === rideId) || state.ride.data
  );
  const isRidesDetailsFetching = useSelector((state) => state.ride.fetching);
  const rideError = useSelector((state) => state.ride.error);

  useEffect(() => {
    if (rideId && isRideUpdate) {
      if ((!rideDetails?.rideId || rideDetails?.rideId !== rideId) && !rideError) dispatch(loadRideDetails(rideId));
    }
  }, [dispatch, rideDetails, rideError]);

  // End - Logic for ride update

  useEffect(() => {
    dispatch(loadUserVehicles());
  }, []);

  const onSaveRide = useCallback(
    (values) => dispatch(saveRide(formatRideValues(values), history)),
    [dispatch, history]
  );

  return (
    <SaveRidePageContextProvider
      value={{
        onSaveRide,
        isRideCreating,
        vehicles,
        isVehiclesLoading,
        user,
        rideDetails,
        isRidesDetailsFetching,
        isRideUpdate,
      }}
    >
      <SaveVehicleContextProvider>
        <SaveRidePageComponent />
      </SaveVehicleContextProvider>
    </SaveRidePageContextProvider>
  );
}

export default SaveRidePageContainer;
