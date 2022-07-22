import { loadRidesList } from 'actions';
import * as _ from 'lodash';
import { PageAction } from 'enums';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { APP_ROUTES } from 'util/constants';
import RidesListPageComponent from './components/RidesListPageComponent';
import { RidesListPageContextProvider } from './RidesListPageContext';

function RidesListPageContainer() {
  const dispatch = useDispatch();
  const history = useHistory();
  const ridesList = useSelector((state) => state.rides.data);
  const isRidesFetching = useSelector((state) => state.rides.fetching);

  useEffect(() => {
    if (_.isEmpty(ridesList)) dispatch(loadRidesList());
  }, [dispatch]);

  const onNextPage = useCallback(() => dispatch(loadRidesList(PageAction.NEXT)), [dispatch]);

  const onPreviousPage = useCallback(() => dispatch(loadRidesList(PageAction.BACK)), [dispatch]);

  const onRideSelected = useCallback(({ rideId }) => history.push(`${APP_ROUTES.RIDE_VIEW}/${rideId}`), [history]);

  const createRide = useCallback(() => history.push(APP_ROUTES.CREATE_RIDE), [history]);

  return (
    <RidesListPageContextProvider
      value={{
        ridesList,
        isRidesFetching,
        onNextPage,
        onPreviousPage,
        onRideSelected,
        gotToCreateRideView: createRide,
      }}
    >
      <RidesListPageComponent />
    </RidesListPageContextProvider>
  );
}

export default RidesListPageContainer;
