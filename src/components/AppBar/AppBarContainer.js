import React from 'react';
import { useSelector } from 'react-redux';
import AppBarComponent from './components/AppBarComponent';

function AppBarContainer() {
  const userDetails = useSelector((state) => state.user.data);

  return <AppBarComponent userDetails={userDetails} />;
}

export default AppBarContainer;
