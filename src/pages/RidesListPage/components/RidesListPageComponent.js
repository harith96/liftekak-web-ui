import React, { useState } from 'react';
import { Button, Icon, Tabs } from 'antd';

import { RidesTabs } from 'util/constants';
import CreateRideButton from './CreateRideButton';
import RideSearchBar from './RideSearchBar';
import RidesList from './RidesList';
import './styles/index.scss';

const { TabPane } = Tabs;

function RidesListPageComponent() {
  const [activeKey, setActiveKey] = useState(RidesTabs.ALL_RIDES);
  const RidesView = (
    <>
      <RideSearchBar />
      <RidesList activeTabKey={activeKey} />
    </>
  );
  return (
    <>
      <CreateRideButton />
      <Tabs defaultActiveKey={RidesTabs.ALL_RIDES} onChange={setActiveKey}>
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
