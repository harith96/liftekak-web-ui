import { saveVehicle } from 'actions';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SaveVehicleComponent from './components/SaveVehicleComponent';
import { SaveVehicleContextProvider } from './context/SaveVehicleContext';

function SaveVehicleContainer({ vehicle, visible, toggleModal }) {
  const dispatch = useDispatch();
  const isSavingVehicle = useSelector((state) => state.saveVehicle.fetching);

  const onSaveVehicle = useCallback((values) => dispatch(saveVehicle(values, toggleModal)), [dispatch, toggleModal]);

  return (
    <SaveVehicleContextProvider
      value={{ modal: { visible, toggleModal }, saveVehicle: onSaveVehicle, isSavingVehicle, vehicle }}
    >
      <SaveVehicleComponent />
    </SaveVehicleContextProvider>
  );
}

export default SaveVehicleContainer;
