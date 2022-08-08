import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import { APP_ROUTES } from 'util/constants';

function GoToRidesButton() {
  const history = useHistory();

  const goToRides = useCallback(() => history.push(APP_ROUTES.RIDES_LIST), [history]);

  return (
    <button
      id="batch-back-to-batch-list"
      type="button"
      className="ant-btn btn back-btn ant-btn-link"
      onClick={goToRides}
    >
      <i id="batch-back-to-batch-list-icon" className="fi flaticon-arrow"></i>
      <span id="batch-back-to-batch-list-label">Go to rides</span>
    </button>
  );
}

export default GoToRidesButton;
