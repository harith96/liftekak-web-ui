import React, { useContext, useState } from 'react';
import { Button, Icon, Row, Tabs } from 'antd';

import { RidesTabs } from 'util/constants';
import CreateRideButton from './CreateRideButton';
import RideSearchBar from './RideSearchBar';
import RidesList from './RidesList';
import './styles/index.scss';
import RidesListPageContext from '../RidesListPageContext';
import AddNewButton from 'components/AddNewButton';

const { TabPane } = Tabs;

const RidesView = (
  <>
    <RideSearchBar />
    <RidesList />
  </>
);

function RidesListPageComponent() {
  const { activeTabKey, setActiveTabKey, gotToSaveRideView } = useContext(RidesListPageContext);

  return (
    <>
      <Row type="flex" justify="space-between" align="middle">
        <h1>Rides</h1>
        <AddNewButton onClick={gotToSaveRideView} entityName="Ride" />
      </Row>
      <Tabs activeKey={activeTabKey} defaultActiveKey={RidesTabs.ALL_RIDES} onChange={setActiveTabKey}>
        <TabPane
          tab={
            <span>
              <Icon type="unordered-list" />
              All
            </span>
          }
          key={RidesTabs.ALL_RIDES}
        >
          {RidesView}
        </TabPane>
        <TabPane
          tab={
            <span>
              <Icon type="idcard" />
              My Rides
            </span>
          }
          key={RidesTabs.MY_RIDES}
        >
          {RidesView}
        </TabPane>
      </Tabs>
    </>
  );
}

export default RidesListPageComponent;
