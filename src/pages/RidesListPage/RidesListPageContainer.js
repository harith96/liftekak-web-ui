import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import qs from 'query-string';
import * as _ from 'lodash';

import { loadRidesList, updateRideFilters } from 'actions';
import { PageAction } from 'enums';
import { APP_ROUTES } from 'util/constants';
import RidesListPageComponent from './components/RidesListPageComponent';
import { RidesListPageContextProvider } from './RidesListPageContext';
import moment from 'moment';

const searchTimeFormat = 'YYYY-MM-DDTHH:mm';

function RidesListPageContainer() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { search } = useLocation();
  const {
    startTown: startTownQuery,
    destinationTown: destinationTownQuery,
    availableSeatCount: availableSeatCountQuery,
    vehicleType: vehicleTypeQuery,
    departureFrom: departureFromQuery,
    departureUntil: departureUntilQuery,
  } = qs.parse(search);
  const ridesList = useSelector((state) => state.rides.data);
  const isRidesFetching = useSelector((state) => state.rides.fetching);
  const {
    startTown: startTownFilter,
    destinationTown: destinationTownFilter,
    availableSeatCount: availableSeatCountFilter,
    vehicleType: vehicleTypeFilter,
    departureFrom: departureFromFilter,
    departureUntil: departureUntilFilter,
  } = useSelector((state) => state.rideFilters.data);

  useEffect(
    () =>
      dispatch(
        updateRideFilters({
          startTown: startTownQuery,
          destinationTown: destinationTownQuery,
          availableSeatCount: availableSeatCountQuery,
          vehicleType: vehicleTypeQuery,
          departureFrom: moment(departureFromQuery, searchTimeFormat).valueOf(),
          departureUntil: moment(departureUntilQuery, searchTimeFormat).valueOf(),
        })
      ),
    [
      dispatch,
      startTownQuery,
      destinationTownQuery,
      availableSeatCountQuery,
      vehicleTypeQuery,
      departureFromQuery,
      departureUntilQuery,
    ]
  );

  useEffect(
    () => dispatch(loadRidesList()),
    [
      dispatch,
      startTownFilter,
      destinationTownFilter,
      availableSeatCountFilter,
      vehicleTypeFilter,
      departureFromFilter,
      departureUntilFilter,
    ]
  );

  const onNextPage = useCallback(() => dispatch(loadRidesList(PageAction.NEXT)), [dispatch]);

  const onPreviousPage = useCallback(() => dispatch(loadRidesList(PageAction.BACK)), [dispatch]);

  const onRideSelected = useCallback(({ rideId }) => history.push(`${APP_ROUTES.RIDE_VIEW}/${rideId}`), [history]);
  const createRide = useCallback(() => history.push(APP_ROUTES.CREATE_RIDE), [history]);

  const onSearch = useCallback(
    ({ startTown, destinationTown, availableSeatCount, vehicleType, departure }) => {
      const filters = _.pickBy(
        { startTown, destinationTown, availableSeatCount, vehicleType },
        (v) => !_.isEmpty(v) || _.isNumber(v)
      );

      // departure must be an array of moment objects
      if (departure.length) {
        filters.departureFrom = departure[0].format(searchTimeFormat);
      }

      if (departure.length > 1) {
        filters.departureUntil = departure[1].format(searchTimeFormat);
      }

      const searchQuery = qs.stringify(filters);

      history.push({ search: searchQuery });
    },
    [history]
  );

  return (
    <RidesListPageContextProvider
      value={{
        ridesList,
        isRidesFetching,
        onNextPage,
        onPreviousPage,
        onRideSelected,
        gotToCreateRideView: createRide,
        onSearch,
      }}
    >
      <RidesListPageComponent />
    </RidesListPageContextProvider>
  );
}

export default RidesListPageContainer;
