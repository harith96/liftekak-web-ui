import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Select } from 'antd';

import AppLoader from 'components/AppLoader';
import PrivateRoute from 'components/PrivateRoute';
import RidesListPageContainer from 'pages/RidesListPage/RidesListPageContainer';
import RideDetailsPageContainer from 'pages/RideDetailsPage/RidesDetailsPageContainer';
import { APP_ROUTES } from 'util/constants';
import { UserRole } from 'enums';

import 'antd/dist/antd.css';
import 'components/styles/index.scss';
import SignInPageContainer from 'pages/SignInPage/SignInPageContainer';
import UserDetailsPageContainer from 'pages/UserDetailsPage/UserDetailsPageContainer';
import { listenForAuthStateChanged } from 'common/auth';
import { loadUserDetails } from 'actions';

const { Option } = Select;

// Style use
function MainApp() {
  const dispatch = useDispatch();
  const userFetching = useSelector((state) => state.user.fetching);

  useEffect(() => {
    let unsubscribe;

    listenForAuthStateChanged(() => dispatch(loadUserDetails()), null).then((unsubFunction) => {
      unsubscribe = unsubFunction;
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [dispatch]);

  return (
    <div className="wrapper reward-wrapper">
      <Router>
        <Route path={APP_ROUTES.LOGIN} component={SignInPageContainer} />
        <PrivateRoute
          path={APP_ROUTES.USER}
          component={UserDetailsPageContainer}
          roles={[UserRole.PASSENGER, UserRole.DRIVER]}
        />
        <PrivateRoute path={APP_ROUTES.RIDES_LIST} component={RidesListPageContainer} roles={[UserRole.PASSENGER]} />
        <PrivateRoute
          path={`${APP_ROUTES.RIDE_VIEW}/:id`}
          component={RideDetailsPageContainer}
          roles={[UserRole.PASSENGER]}
        />
      </Router>
      {userFetching && <AppLoader />}
    </div>
  );
}

export default MainApp;
