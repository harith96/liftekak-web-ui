import { saveVehicle } from 'actions';
import useModalToggle from 'hooks/useModalToggle';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SaveVehicleComponent from './components/SaveVehicleComponent';
import { SaveVehicleContextProvider } from './context/SaveVehicleContext';

function SaveVehicleContainer({ vehicle }) {
  const dispatch = useDispatch();
  const isSavingVehicle = useSelector((state) => state.saveVehicle.fetching);
  const [visible, toggleModal] = useModalToggle();

  const onSaveVehicle = useCallback((values) => dispatch(saveVehicle(values, toggleModal)), [dispatch]);

  return (
    <SaveVehicleContextProvider
      value={{ modal: { visible, toggleModal }, saveVehicle: onSaveVehicle, isSavingVehicle, vehicle }}
    >
      <SaveVehicleComponent />
    </SaveVehicleContextProvider>
  );
}

export default SaveVehicleContainer;
