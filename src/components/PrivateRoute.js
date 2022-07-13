import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as i18n from '_i18n';
import * as rewardsActions from 'actions';
import { NotificationTypes } from 'enums';
import { APP_ROUTES } from 'util/constants';
import AppLoader from './AppLoader';

const PrivateRoute = ({ component: Component, roles, userFetching, currentUserRole, actions, ...rest }) =>
  userFetching ? (
    <AppLoader />
  ) : (
    <Route
      {...rest}
      render={(props) => {
        if (!currentUserRole) {
          // not logged in so redirect to login page with the return url

          actions.showNotification(
            i18n.t('rewards.user.error.message'),
            i18n.t('rewards.user.error.notLoggedIn.description'),
            NotificationTypes.ERROR
          );
          return <Redirect to={{ pathname: APP_ROUTES.LOGIN }} />;
        }

        // check if route is restricted by role
        if (roles && !roles.includes(currentUserRole)) {
          // role not authorised so redirect to home page
          actions.showNotification(
            i18n.t('rewards.user.error.message'),
            i18n.t('rewards.user.error.notAuthorized.description'),
            NotificationTypes.ERROR
          );
          return <Redirect to={{ pathname: APP_ROUTES.LOGIN }} />;
        }

        // authorised so return component
        return <Component {...props} />;
      }}
    />
  );

function mapStateToProps(state) {
  return {
    userFetching: state.user.fetching,
    currentUserRole: state.user.data.userRole,
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(rewardsActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
