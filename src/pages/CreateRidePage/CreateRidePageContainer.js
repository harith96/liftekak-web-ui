import { createRide } from 'actions';
import * as _ from 'lodash';
import moment from 'moment';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import CreateRidePageComponent from './components/CreateRidePageComponent';
import { CreateRidePageContextProvider } from './CreateRidePageContext';

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
  ).unix(),
});

function CreateRidePageContainer() {
  const dispatch = useDispatch();
  const history = useHistory();
  const isRideCreating = useSelector((state) => state.createRide.fetching);

  const onCreateRide = useCallback(
    (values) => dispatch(createRide(formatRideValues(values), history)),
    [dispatch, history]
  );

  return (
    <CreateRidePageContextProvider value={{ onCreateRide, isRideCreating }}>
      <CreateRidePageComponent />
    </CreateRidePageContextProvider>
  );
}

export default CreateRidePageContainer;
