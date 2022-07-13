import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Select } from 'antd';

import * as rewardsActions from 'actions';
import AppLoader from 'components/AppLoader';
import PrivateRoute from 'components/PrivateRoute';
import RidesListPageContainer from 'pages/RidesListPage/RidesListPageContainer';
import RideDetailsPageContainer from 'pages/RideDetailsPage/RidesDetailsPageContainer';
import { APP_ROUTES } from 'util/constants';
import { UserRole } from 'enums';

import AppLogo from 'styles/images/app-logos/rewards-logo.svg';
import styles from 'styles/RewardsApp.scss';

const { Option } = Select;

const setAppLogo = () => {
  if (document.getElementById('app-logo')) {
    document.getElementById('app-logo').src = AppLogo;
  }
};

const setAppHeaderToAppMode = () => {
  if (document.getElementById('app-bar')) {
    document.getElementById('app-bar').className = 'app-bar app-mode';
  }
};

const COMMON_ROUTES_USER_ROLES = [UserRole.MASTER_VENDOR, UserRole.SYSCO_ASSOCIATE];

// Style use
function MainApp({ actions, userId, userRole, userFetching }) {
  setAppLogo();
  setAppHeaderToAppMode();

  useEffect(() => {
    actions.loadUserDetails(userId);
  }, [actions, userId]);

  useEffect(() => {
    styles.use();
    return () => {
      styles.unuse();
    };
  }, []);

  return !userFetching ? (
    <div className="wrapper reward-wrapper">
      <Router>
        <PrivateRoute
          path={APP_ROUTES.RIDES_LIST}
          component={RidesListPageContainer}
          roles={[UserRole.SYSCO_ASSOCIATE]}
          currentUserRole={userRole}
        />
        <PrivateRoute
          path={`${APP_ROUTES.RIDE_VIEW}/:id`}
          component={RideDetailsPageContainer}
          roles={[UserRole.SYSCO_ASSOCIATE]}
          currentUserRole={userRole}
        />
      </Router>
    </div>
  ) : (
    <AppLoader show />
  );
}

function mapStateToProps(state) {
  return {
    user: state.user.data?.userRole,
    userFetching: state.user.fetching,
    batchIds: state.user.data.batchIds,
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(rewardsActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainApp);