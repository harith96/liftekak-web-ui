import { loadCities } from 'actions';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CitySelectContextProvider } from './CitySelectContext';
import CitySelect from './components/CitySelect';

function CitySelectContainer({ name, disabled, placeholder }) {
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.cities.data);
  const citiesFetching = useSelector((state) => state.cities.fetching);
  const getCitiesList = useCallback((engNameQuery) => dispatch(loadCities({ engNameQuery })), [dispatch]);

  return (
    <CitySelectContextProvider value={{ cities, citiesFetching, getCitiesList }}>
      <CitySelect name={name} disabled={disabled} placeholder={placeholder} />
    </CitySelectContextProvider>
  );
}

export default CitySelectContainer;
