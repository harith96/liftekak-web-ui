import { IdcardOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Row, Space, Tabs } from 'antd';
import GoToRidesButton from 'pages/RideDetailsPage/components/GoToRidesButton';
import React, { useContext } from 'react';
import { BookingsTabs } from 'util/constants';
import BookingsPageContext from '../BookingPageContext';
import BookingsTable from './BookingsTable';

const { TabPane } = Tabs;

const BookingsView = (
  <>
    {/* <BookingsSearchBar /> */}
    <BookingsTable />
    {/* <BookingsList /> */}
  </>
);

const bookingRequestsTab = (
  <span>
    <UnorderedListOutlined />
    Ride Requests
  </span>
);

const myBookingsTab = (
  <span>
    <IdcardOutlined />
    My Bookings
  </span>
);

function BookingPageComponent() {
  const { activeTabKey, setActiveTabKey } = useContext(BookingsPageContext);

  return (
    <>
      <Row type="flex" justify="space-between" align="middle">
        <Space>
          <GoToRidesButton />
          <h1>Ride Bookings</h1>
        </Space>
      </Row>
      <Tabs
        activeKey={activeTabKey}
        defaultActiveKey={BookingsTabs.BOOKING_REQUESTS}
        onChange={setActiveTabKey}
        className="tab"
      >
        <TabPane tab={bookingRequestsTab} key={BookingsTabs.BOOKING_REQUESTS} className="tab-pane">
          {BookingsView}
        </TabPane>
        <TabPane tab={myBookingsTab} key={BookingsTabs.MY_BOOKINGS} className="tab-pane">
          {BookingsView}
        </TabPane>
      </Tabs>
    </>
  );
}

export default BookingPageComponent;
