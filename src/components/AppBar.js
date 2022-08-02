import { Avatar, Button, Dropdown, Icon, Menu, Row } from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';
import { signOut } from 'common/auth';
import React from 'react';
import { useHistory } from 'react-router';
import { APP_ROUTES } from 'util/constants';
import AppLogo from './AppLogo';
import './styles/_appBar.scss';

const userMenu = [
  { icon: 'user', title: 'Profile', route: APP_ROUTES.USER },
  { icon: 'unordered-list', title: 'Rides', route: APP_ROUTES.RIDES_LIST },
  { icon: 'book', title: 'My Bookings', route: APP_ROUTES.BOOKINGS },
  { icon: 'car', title: 'My Vehicles', route: APP_ROUTES.VEHICLES },
];

function AppBar() {
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
      <Dropdown overlay={menu} placement="bottomRight" trigger="click">
        <div role="button" className="hover-brighten clickable">
          <Avatar className="user-avatar" size="large">
            <Icon type="user" />
          </Avatar>
        </div>
      </Dropdown>
    </Row>
  );
}

export default AppBar;
