import { Button, Row } from 'antd';
import { signOut } from 'common/auth';
import React from 'react';

function AppBar() {
  return (
    <Row>
      <Button type="danger" onClick={signOut} style={{ float: 'right' }}>
        Sign Out
      </Button>
    </Row>
  );
}

export default AppBar;
