import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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

import 'antd/dist/antd.css';
import LoginPageContainer from 'pages/LoginPage/LoginPageContainer';

const { Option } = Select;

// Style use
function MainApp({ actions, userId, userRole, userFetching }) {
  useEffect(() => {
    actions.loadUserDetails(userId);
  }, [actions, userId]);

  return !userFetching ? (
    <div className="wrapper reward-wrapper">
      <Router>
        <Route path={APP_ROUTES.LOGIN} component={LoginPageContainer} />
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
