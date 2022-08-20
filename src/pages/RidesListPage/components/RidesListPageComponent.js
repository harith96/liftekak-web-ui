import React, { useContext } from 'react';
import { IdcardOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Row, Tabs } from 'antd';

import { RidesTabs } from 'util/constants';
import AddNewButton from 'components/AddNewButton';
import RideSearchBar from './RideSearchBar';
import RidesTable from './RidesTable';
import './styles/index.scss';
import RidesListPageContext from '../RidesListPageContext';
import RidesList from './RidesList';

const { TabPane } = Tabs;

const RidesView = (
  <>
    <RideSearchBar />
    <RidesTable />
    <RidesList />
  </>
);

const allRidesTab = (
  <span>
    <UnorderedListOutlined />
    All
  </span>
);

const myRidesTab = (
  <span>
    <IdcardOutlined />
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
      <Tabs activeKey={activeTabKey} defaultActiveKey={RidesTabs.ALL_RIDES} onChange={setActiveTabKey} className="tab">
        <TabPane tab={allRidesTab} key={RidesTabs.ALL_RIDES} className="tab-pane">
          {RidesView}
        </TabPane>
        <TabPane tab={myRidesTab} key={RidesTabs.MY_RIDES} className="tab-pane">
          {RidesView}
        </TabPane>
      </Tabs>
    </>
  );
}

export default RidesListPageComponent;
