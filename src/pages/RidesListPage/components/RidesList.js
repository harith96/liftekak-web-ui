import { CarOutlined } from '@ant-design/icons';
import { Avatar, List } from 'antd';
import PaginationBar from 'components/PaginationBar';
import React, { useContext } from 'react';
import { getFormattedDateAndTime } from 'util/dateUtil';
import getFormattedRoute from 'util/getFormattedRoute';
import getFullName from 'util/getFullName';
import RidesListPageContext from '../RidesListPageContext';

function RidesList() {
  const { ridesList, isRidesFetching, onRideSelected, onNextPage, onPreviousPage } = useContext(RidesListPageContext);
  return (
    <div className="rides-list-container">
      <List
        itemLayout="vertical"
        size="large"
        pagination={null}
        dataSource={ridesList}
        loading={isRidesFetching}
        renderItem={(item) => (
          <List.Item onClick={() => onRideSelected(item)} className="clickable clickable-row">
            <List.Item.Meta
              avatar={<Avatar icon={<CarOutlined />} />}
              title={`${getFormattedDateAndTime(item.departure)}`}
              description={`${getFullName(item.driver.firstName, item.driver.lastName)} | ${
                item.details.availableSeatCount
              } seat(s) available | ${item.details.vehicle.type}`}
            />
            <div className="ride-route-container ">{getFormattedRoute(item.details?.route)}</div>
          </List.Item>
        )}
        className="rides-list"
      />
      <PaginationBar
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
        // This won't work as available seat count is checked only after fetching docs
        // isNextButtonDisabled={ridesList.length < DEFAULT_PAGE_SIZE}
      />
    </div>
  );
}

export default RidesList;
