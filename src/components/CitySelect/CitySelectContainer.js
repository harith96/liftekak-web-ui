import { loadCities } from 'actions';
import { Icon } from 'antd';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CitySelectContextProvider } from './CitySelectContext';
import CitySelect from './components/CitySelect';

function CitySelectContainer({ name, disabled, placeholder, showNextCityIcon }) {
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.cities.data);
  const citiesFetching = useSelector((state) => state.cities.fetching);
  const getCitiesList = useCallback((engNameQuery) => dispatch(loadCities({ engNameQuery })), [dispatch]);

  return (
    <CitySelectContextProvider value={{ cities, citiesFetching, getCitiesList }}>
      <div className="horizontal-container">
        <CitySelect name={name} disabled={disabled} placeholder={placeholder} />
        {showNextCityIcon && <Icon type="right" />}
      </div>
    </CitySelectContextProvider>
  );
}

export default CitySelectContainer;
