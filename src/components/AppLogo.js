import React from 'react';

import AppLogoImg from 'styles/images/app-logos/app-logo.png';
import './styles/_appLogo.scss';

function AppLogo() {
  return (
    <div className="horizontal-container">
      <img src={AppLogoImg} alt="app-log" className="app-logo-img" />
      <h2>
        <span className="name-lift">Lift</span>
        <span className="name-ekak">Ekak</span>
      </h2>
    </div>
  );
}

export default AppLogo;
