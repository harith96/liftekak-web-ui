import { Button } from 'antd';
import React, { useContext } from 'react';

import * as i18n from '_i18n';
import RidesListPageContext from '../RidesListPageContext';

function CreateRideButton() {
  const { gotToSaveRideView } = useContext(RidesListPageContext);

  return (
    <Button type="primary" id="create-ride-button" onClick={gotToSaveRideView}>
      {i18n.t('Create A Ride')}
    </Button>
  );
}

export default CreateRideButton;
