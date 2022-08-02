import { saveRide, loadUserVehicles } from 'actions';
import { SaveVehicleContextProvider } from 'components/SaveVehicle/context/SaveVehicleContext';
import * as _ from 'lodash';
import moment from 'moment';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
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

  useEffect(() => {
    dispatch(loadUserVehicles());
  }, []);

  const onSaveRide = useCallback(
    (values) => dispatch(saveRide(formatRideValues(values), history)),
    [dispatch, history]
  );

  return (
    <SaveRidePageContextProvider value={{ onSaveRide, isRideCreating, vehicles, isVehiclesLoading, user }}>
      <SaveVehicleContextProvider>
        <SaveRidePageComponent />
      </SaveVehicleContextProvider>
    </SaveRidePageContextProvider>
  );
}

export default SaveRidePageContainer;
