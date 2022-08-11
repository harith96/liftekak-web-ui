import React, { useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Select } from 'antd';

import AppLoader from 'components/AppLoader';
import PrivateRoute from 'components/PrivateRoute';
import RidesListPageContainer from 'pages/RidesListPage/RidesListPageContainer';
import RideDetailsPageContainer from 'pages/RideDetailsPage/RidesDetailsPageContainer';
import { APP_ROUTES } from 'util/constants';
import { UserRole } from 'enums';

import 'antd/dist/antd.css';
import 'styles/CostingApp.scss';
import 'components/styles/index.scss';
import SignInPageContainer from 'pages/SignInPage/SignInPageContainer';
import UserDetailsPageContainer from 'pages/UserDetailsPage/UserDetailsPageContainer';
import { listenForAuthStateChanged } from 'common/auth';
import { loadUserDetails } from 'actions';
import SaveRidePageContainer from 'pages/SaveRidePage/SaveRidePageContainer';
import BookingsPageContainer from 'pages/BookingsPage/BookingsPageContainer';
import VehiclesPageContainer from 'pages/VehiclesPage/VehiclesPageContainer';

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
    <>
      <Router>
        <Switch>
          <Route path={APP_ROUTES.LOGIN} component={SignInPageContainer} />
          <PrivateRoute exact path={APP_ROUTES.CREATE_RIDE} component={SaveRidePageContainer} />
          <PrivateRoute exact path={`${APP_ROUTES.UPDATE_RIDE}/:rideId`} component={SaveRidePageContainer} />
          <PrivateRoute
            exact
            path={APP_ROUTES.USER}
            component={UserDetailsPageContainer}
            roles={[UserRole.PASSENGER, UserRole.DRIVER]}
          />
          <PrivateRoute
            exact
            path={APP_ROUTES.RIDES_LIST}
            component={RidesListPageContainer}
            roles={[UserRole.PASSENGER]}
          />
          <PrivateRoute
            path={`${APP_ROUTES.RIDE_VIEW}/:rideId`}
            component={RideDetailsPageContainer}
            roles={[UserRole.PASSENGER]}
          />
          <PrivateRoute
            exact
            path={APP_ROUTES.BOOKINGS}
            component={BookingsPageContainer}
            roles={[UserRole.PASSENGER]}
          />
          <PrivateRoute
            exact
            path={APP_ROUTES.VEHICLES}
            component={VehiclesPageContainer}
            roles={[UserRole.PASSENGER]}
          />
          <Redirect to={APP_ROUTES.RIDES_LIST} />
        </Switch>
      </Router>
      {userFetching && <AppLoader />}
    </>
  );
}

export default MainApp;
