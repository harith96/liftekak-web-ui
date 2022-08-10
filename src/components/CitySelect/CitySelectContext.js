import React from 'react';

const CitySelectContext = React.createContext({
  getCitiesList: () => {},
  cities: [],
  citiesFetching: false,
});

export const CitySelectContextProvider = CitySelectContext.Provider;

export default CitySelectContext;
