import { HomeFilled, HomeOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import { APP_ROUTES } from 'util/constants';

function GoToRidesButton() {
  const history = useHistory();

  const goToRides = useCallback(() => history.push(APP_ROUTES.RIDES_LIST), [history]);

  return (
    <Button onClick={goToRides}>
      <HomeFilled style={{ color: '#6a737b' }} />
    </Button>
  );
}

export default GoToRidesButton;
