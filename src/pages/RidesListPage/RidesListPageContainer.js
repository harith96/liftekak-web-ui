import { loadRidesList } from 'actions';
import { PageAction } from 'enums';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RidesListPageComponent from './components/RidesListPageComponent';
import { RidesListPageContextProvider } from './RidesListPageContext';

function RidesListPageContainer() {
  const dispatch = useDispatch();
  const ridesList = useSelector((state) => state.rides.data);
  const isRidesFetching = useSelector((state) => state.rides.fetching);

  console.log(JSON.stringify(ridesList, null, 2));

  useEffect(() => {
    dispatch(loadRidesList());
  }, [dispatch]);

  const onNextPage = useCallback(() => {
    dispatch(loadRidesList(PageAction.NEXT));
  }, [dispatch]);

  const onPreviousPage = useCallback(() => {
    dispatch(loadRidesList(PageAction.BACK));
  }, [dispatch]);

  return (
    <RidesListPageContextProvider value={{ ridesList, isRidesFetching, onNextPage, onPreviousPage }}>
      <RidesListPageComponent />
    </RidesListPageContextProvider>
  );
}

export default RidesListPageContainer;
