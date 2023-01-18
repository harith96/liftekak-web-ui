import { InfoCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import TextWithIcon from 'components/TextWithIcon';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import { APP_ROUTES } from 'util/constants';

function HasBookingRequests() {
  const history = useHistory();
  const onClick = useCallback(() => history.push(APP_ROUTES.BOOKINGS), [history]);

  return (
    <button
      id="batch-merchandiser-approve"
      type="button"
      className="ant-btn btn red-action-btn ant-btn-primary"
      onClick={onClick}
    >
      <Tooltip title="You have new lift requests!">
        <TextWithIcon icon={<InfoCircleOutlined />} text={`Lift Requests`} />
      </Tooltip>
    </button>
  );
}

export default HasBookingRequests;
