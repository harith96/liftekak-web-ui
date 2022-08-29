import React, { useEffect } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect, useSelector } from 'react-redux';

import * as i18n from '_i18n';
import * as liftEkakActions from 'actions';
import { NotificationType, UserRole } from 'enums';
import { APP_ROUTES } from 'util/constants';
import { getCurrentUserID, listenForAuthStateChanged } from 'common/auth';
import AppLoader from './AppLoader';
import AppBar from './AppBar/AppBarContainer';
import './styles/_privateRoute.scss';

const PrivateRoute = ({ component: Component, roles, userFetching, currentUserRole, actions, ...rest }) => {
  const history = useHistory();
  const user = useSelector((state) => state.user.data);

  useEffect(() => {
    let unsubscribe;
    listenForAuthStateChanged(null, () => history.push(APP_ROUTES.LOGIN))
      .then((unsubFunction) => {
        unsubscribe = unsubFunction;
      })
      .catch((error) => console.error(error));

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [history]);

  useEffect(() => {
    if (!user && getCurrentUserID()) history.push(APP_ROUTES.USER);
  }, [user, history]);

  return userFetching ? (
    <AppLoader />
  ) : (
    <Route
      {...rest}
      render={(props) => {
        // check if route is restricted by role
        if (roles && !roles.includes(currentUserRole)) {
          // role not authorised so redirect to home page
          actions.showNotification(
            i18n.t('liftEkak.user.error.message'),
            i18n.t('liftEkak.user.error.notAuthorized.description'),
            NotificationType.ERROR
          );
          return <Redirect to={{ pathname: APP_ROUTES.LOGIN }} />;
        }

        // authorised so return component
        return (
          <div className="route-container">
            <AppBar />
            <Component {...props} />
          </div>
        );
      }}
    />
  );
};

function mapStateToProps(state) {
  return {
    userFetching: state.user.fetching,
    currentUserRole: UserRole.PASSENGER,
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(liftEkakActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
