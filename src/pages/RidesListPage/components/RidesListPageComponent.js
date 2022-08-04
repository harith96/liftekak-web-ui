import React, { useContext, useState } from 'react';
import { Button, Icon, Tabs } from 'antd';

import { RidesTabs } from 'util/constants';
import CreateRideButton from './CreateRideButton';
import RideSearchBar from './RideSearchBar';
import RidesList from './RidesList';
import './styles/index.scss';
import RidesListPageContext from '../RidesListPageContext';

const { TabPane } = Tabs;

const RidesView = (
  <>
    <RideSearchBar />
    <RidesList />
  </>
);

function RidesListPageComponent() {
  const { activeTabKey, setActiveTabKey } = useContext(RidesListPageContext);

  return (
    <>
      <CreateRideButton />
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
