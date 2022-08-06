import { Avatar, Button, Dropdown, Icon, Menu, Row, Tag } from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';
import { signOut } from 'common/auth';
import React from 'react';
import { useHistory } from 'react-router';
import { APP_ROUTES } from 'util/constants';
import getFullName from 'util/getFullName';
import AppLogo from '../../AppLogo';
import '../styles/index.scss';

const userMenu = [
  { icon: 'user', title: 'Profile', route: APP_ROUTES.USER },
  { icon: 'unordered-list', title: 'Rides', route: APP_ROUTES.RIDES_LIST },
  { icon: 'book', title: 'My Bookings', route: APP_ROUTES.BOOKINGS },
  { icon: 'car', title: 'My Vehicles', route: APP_ROUTES.VEHICLES },
];

function AppBarComponent({ userDetails }) {
  const history = useHistory();

  const menu = (
    <Menu>
      {userMenu.map(({ icon, title, route }) => (
        <MenuItem onClick={() => history.push(route)} key={title}>
          <Icon type={icon} />
          {title}
        </MenuItem>
      ))}
      <MenuItem onClick={signOut}>
        <Icon type="logout" style={{ color: 'red' }} />
        <span className="logout">Sign out</span>
      </MenuItem>
    </Menu>
  );

  return (
    <Row type="flex" justify="space-between" align="middle">
      <AppLogo />
      <div className="horizontal-container">
        <div className="user-name-badge">
          <div className="user-name">{getFullName(userDetails?.firstName, userDetails.lastName)}</div>
          <div className="user-badge">Verified</div>
        </div>
        <Dropdown overlay={menu} placement="bottomRight" trigger="click">
          <div role="button" className="hover-brighten clickable">
            {userDetails?.userPhoto ? (
              <Avatar className="user-avatar" size="large" src={userDetails?.userPhoto} />
            ) : (
              <Avatar className="user-avatar" size="large" icon={<Icon type="user" />} />
            )}
          </div>
        </Dropdown>
      </div>
    </Row>
  );
}

export default AppBarComponent;
