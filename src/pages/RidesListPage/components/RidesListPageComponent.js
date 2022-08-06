import React, { useContext } from 'react';
import { Icon, Row, Tabs } from 'antd';

import { RidesTabs } from 'util/constants';
import AddNewButton from 'components/AddNewButton';
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

const allRidesTab = (
  <span>
    <Icon type="unordered-list" />
    All
  </span>
);

const myRidesTab = (
  <span>
    <Icon type="idcard" />
    My Rides
  </span>
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
        <TabPane tab={allRidesTab} key={RidesTabs.ALL_RIDES}>
          {RidesView}
        </TabPane>
        <TabPane tab={myRidesTab} key={RidesTabs.MY_RIDES}>
          {RidesView}
        </TabPane>
      </Tabs>
    </>
  );
}

export default RidesListPageComponent;
