import { Button } from 'antd';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import { APP_ROUTES } from 'util/constants';

function GoToRidesButton() {
  const history = useHistory();

  const goToRides = useCallback(() => history.push(APP_ROUTES.RIDES_LIST), [history]);

  return (
    <Button type="link" onClick={goToRides}>
      Go back
    </Button>
  );
}

export default GoToRidesButton;
