import { loadUserVehicles, saveVehicle } from 'actions';
import _ from 'lodash';
import useModalToggle from 'hooks/useModalToggle';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VehiclesPageComponent from './components/VehiclesPageComponent';
import { VehiclesPageContextProvider } from './VehiclesPageContext';

const VEHICLES_FETCH_RETRY_COUNT = 2;

function VehiclesPageContainer() {
  const dispatch = useDispatch();
  const vehicles = useSelector((state) => state.userVehicles.data);
  const [vehiclesFetchedCount, setVehiclesFetchedCount] = useState(0);
  const isVehiclesFetching = useSelector((state) => state.userVehicles.fetching);
  const [isEditVehicleModalVisible, toggleModal] = useModalToggle();

  useEffect(() => {
    if (_.isEmpty() && vehiclesFetchedCount <= VEHICLES_FETCH_RETRY_COUNT) {
      dispatch(loadUserVehicles());
      setVehiclesFetchedCount((count) => count + 1);
    }
  }, [vehiclesFetchedCount, setVehiclesFetchedCount, vehicles, dispatch]);

  const onDelete = useCallback((vehicle) => dispatch(saveVehicle({ ...vehicle, isDeleted: true })), [dispatch]);

  const onMakeDefault = useCallback(
    (vehicle) => dispatch(saveVehicle({ ...vehicle, isDefaultVehicle: true })),
    [dispatch]
  );

  return (
    <VehiclesPageContextProvider
      value={{
        vehicles,
        isVehiclesFetching,
        isEditVehicleModalVisible,
        toggleModal,
        onDelete,
        onMakeDefault,
      }}
    >
      <VehiclesPageComponent />
    </VehiclesPageContextProvider>
  );
}

export default VehiclesPageContainer;
