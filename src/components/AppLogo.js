import React from 'react';
import { useHistory } from 'react-router';

import AppLogoImg from 'styles/images/app-logos/app-logo.png';
import { APP_ROUTES } from 'util/constants';
import './styles/_appLogo.scss';

function AppLogo() {
  const history = useHistory();

  return (
    <div
      className="horizontal-container clickable"
      onClick={() => history.push(APP_ROUTES.RIDES_LIST)}
      onKeyDown={null}
      tabIndex={0}
      role="button"
    >
      <img src={AppLogoImg} alt="app-log" className="app-logo-img" />
      <h2>
        <span className="name-lift">Lift</span>
        <span className="name-ekak">Ekak</span>
      </h2>
    </div>
  );
}

export default AppLogo;
