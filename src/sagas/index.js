import { takeLatest, put, all, select, call, takeEvery } from 'redux-saga/effects';
import * as _ from 'lodash';

import {
  USER,
  SHOW_NOTIFICATION,
  RIDES,
  RIDE,
  UPDATE_RIDE,
  UPDATE_RIDE_FILTERS,
  SAVE_RIDE,
  FETCH_ALL_RIDES,
  SIGN_IN,
  SIGN_UP,
  USER_VEHICLES,
  RESET_PASSWORD,
  SAVE_USER_DETAILS,
  SAVE_VEHICLE,
  BOOKINGS,
  SAVE_BOOKING,
  MY_RIDES,
  CITIES,
} from 'actions/actionTypes';
import { APP_ROUTES, BAD_REQUEST_STATUS, NOT_FOUND_STATUS, USER_NOT_AUTHORIZED_STATUS } from 'util/constants';
import * as i18n from '_i18n';
import { action } from 'reduxHelpers';
import { FirebaseError, NotificationType, RideStatus, SignInProvider } from 'enums';
import openNotification from 'components/openNotification';
import { getAuth } from '@firebase/auth';
import {
  getCurrentUserID,
  loginWithEmailAndPassword,
  loginWithGoogle,
  sendPasswordRestEmail,
  signUpWithEmailAndPassword,
} from 'common/auth';
import {
  saveRide,
  getBookings,
  getRide,
  getRides,
  getUserDetails,
  getUserVehicles,
  saveUserDetails,
  saveVehicle,
  getMyRides,
  getCities,
} from 'common/db';

export const getRole = (state) => state.user.data.userRole;
export const getUser = (state) => state.user.data;
export const getRideFilters = (state) => state.rideFilters.data;

function* handleUserSessionErrors(error) {
  let handled = false;

  if (error.response?.status === USER_NOT_AUTHORIZED_STATUS) {
    yield put(
      action(SHOW_NOTIFICATION, {
        description: i18n.t('liftEkak.user.error.notAuthorized.description'),
        className: NotificationType.ERROR,
        message: i18n.t('liftEkak.user.error.message'),
      })
    );

    handled = true;
  }

  return handled;
}

function* signInAsync({ provider, signInDetails: { email, password, rememberMe } = {} }) {
  try {
    switch (provider) {
      case SignInProvider.EMAIL_PASSWORD:
        yield loginWithEmailAndPassword(email, password, rememberMe);
        break;

      case SignInProvider.GOOGLE:
        yield loginWithGoogle();
        break;

      default:
        break;
    }
    yield put({ type: SIGN_IN.SUCCESS });
  } catch (error) {
    yield put({ type: SIGN_IN.FAILURE, payload: error.message });
    const handled = yield handleUserSessionErrors(error);
    if (!handled)
      yield put(
        action(SHOW_NOTIFICATION, {
          description: i18n.t('liftEkak.user.error.description'),
          className: NotificationType.ERROR,
          message: i18n.t('liftEkak.user.error.message'),
        })
      );
  }
}

function* signUpAsync({ email, password }) {
  try {
    yield signUpWithEmailAndPassword(email, password);

    yield put({ type: SIGN_UP.SUCCESS });
  } catch (error) {
    yield put({ type: SIGN_UP.FAILURE, payload: error.message });
    const handled = yield handleUserSessionErrors(error);
    if (!handled)
      yield put(
        action(SHOW_NOTIFICATION, {
          description: i18n.t('liftEkak.user.error.description'),
          className: NotificationType.ERROR,
          message: i18n.t('liftEkak.user.error.message'),
        })
      );
  }
}

function* sendPasswordResetEmailAsync({ email }) {
  try {
    yield sendPasswordRestEmail(email);
    yield put({ type: RESET_PASSWORD.SUCCESS });

    yield put(
      action(SHOW_NOTIFICATION, {
        description: i18n.t('Password reset email successfully sent.'),
        className: NotificationType.SUCCESS,
        message: i18n.t('Password Reset Email Success'),
      })
    );
  } catch (error) {
    const handled = yield handleUserSessionErrors(error);
    if (!handled)
      yield put(
        action(SHOW_NOTIFICATION, {
          description: i18n.t('liftEkak.forgotPassword.error.emailDoNotExists.description'),
          className: NotificationType.ERROR,
          message: i18n.t('liftEkak.forgotPassword.error.message'),
        })
      );

    yield put({ type: RESET_PASSWORD.FAILURE, payload: error.code });
  }
}

function* loadUserAsync() {
  try {
    const user = yield getUserDetails();

    yield put({ type: USER.SUCCESS, payload: user });
  } catch (error) {
    yield put({ type: USER.FAILURE, payload: error.message });
    const handled = yield handleUserSessionErrors(error);
    if (!handled)
      yield put(
        action(SHOW_NOTIFICATION, {
          description: i18n.t('liftEkak.user.fetch.error.description'),
          className: NotificationType.ERROR,
          message: i18n.t('liftEkak.user.error.message'),
        })
      );
  }
}

function* saveUserDetailsAsync({ data: userDetails, callback }) {
  try {
    yield saveUserDetails(userDetails);

    yield loadUserAsync();

    if (callback) callback();
    yield put({ type: SAVE_USER_DETAILS.SUCCESS });

    yield put(
      action(SHOW_NOTIFICATION, {
        description: i18n.t('liftEkak.user.save.success.description'),
        className: NotificationType.SUCCESS,
        message: i18n.t('liftEkak.user.success.message'),
      })
    );
  } catch (error) {
    const handled = yield handleUserSessionErrors(error);
    if (!handled)
      yield put(
        action(SHOW_NOTIFICATION, {
          description: i18n.t('liftEkak.user.save.error.description'),
          className: NotificationType.ERROR,
          message: i18n.t('liftEkak.user.error.message'),
        })
      );

    yield put({ type: SAVE_USER_DETAILS.FAILURE, payload: error.code });
  }
}

function* loadUserVehiclesAsync() {
  try {
    const vehicles = yield getUserVehicles();
    yield put({ type: USER_VEHICLES.SUCCESS, payload: vehicles });
  } catch (error) {
    yield put({ type: USER_VEHICLES.FAILURE, payload: error.message });
    const handled = yield handleUserSessionErrors(error);
    if (!handled)
      yield put(
        action(SHOW_NOTIFICATION, {
          description: i18n.t('liftEkak.vehicle.fetch.error.description'),
          className: NotificationType.ERROR,
          message: i18n.t('liftEkak.vehicle.error.message'),
        })
      );
  }
}

function* saveVehicleAsync({ vehicle, callback }) {
  try {
    const { defaultVehicle: userDefaultVehicle } = yield select((state) => state.user.data);
    const isUserDefaultVehicleUpdated = yield saveVehicle({ ...vehicle, userDefaultVehicle });

    yield loadUserVehiclesAsync();

    if (isUserDefaultVehicleUpdated) yield loadUserAsync();

    if (callback) callback();

    yield put({ type: SAVE_VEHICLE.SUCCESS });
  } catch (error) {
    yield put({ type: SAVE_VEHICLE.FAILURE, payload: error.message });
    const handled = yield handleUserSessionErrors(error);
    if (!handled)
      yield put(
        action(SHOW_NOTIFICATION, {
          description: i18n.t('liftEkak.vehicle.save.error.description'),
          className: NotificationType.ERROR,
          message: i18n.t('liftEkak.vehicle.error.message'),
        })
      );
  }
}

function* loadRidesAsync({ pageAction } = {}) {
  try {
    const { gender: userGender } = yield select((state) => state.user.data || {});
    const ridesFilters = yield select((state) => state.rideFilters.data);
    const rides = yield select((state) => state.rides.data);
    const ridesList = yield getRides({ ...ridesFilters, pageAction, userGender });
    // if page action is defined and ride list is empty it means
    // it has reached final page
    yield put({ type: RIDES.SUCCESS, payload: pageAction && _.isEmpty(ridesList) ? rides : ridesList });
  } catch (error) {
    yield put({ type: RIDES.FAILURE, payload: error.message });
    const handled = yield handleUserSessionErrors(error);
    if (!handled)
      yield put(
        action(SHOW_NOTIFICATION, {
          description: i18n.t('liftEkak.rides.fetch.error.description'),
          className: NotificationType.ERROR,
          message: i18n.t('liftEkak.rides.error.message'),
        })
      );
  }
}

function* loadMyRidesAsync({ pageAction } = {}) {
  try {
    const uid = getCurrentUserID();
    const ridesFilters = yield select((state) => state.rideFilters.data);
    const myRides = yield select((state) => state.myRides.data);
    const ridesList = yield getMyRides({ ...ridesFilters, pageAction, uid });
    yield put({ type: MY_RIDES.SUCCESS, payload: pageAction && _.isEmpty(ridesList) ? myRides : ridesList });
  } catch (error) {
    yield put({ type: MY_RIDES.FAILURE, payload: error.message });
    const handled = yield handleUserSessionErrors(error);
    if (!handled)
      yield put(
        action(SHOW_NOTIFICATION, {
          description: i18n.t('liftEkak.myRides.fetch.error.description'),
          className: NotificationType.ERROR,
          message: i18n.t('liftEkak.rides.error.message'),
        })
      );
  }
}

function* loadAllNonExpiredRidesAsync() {
  try {
    // const filtersApplied = {
    //   sort: null,
    //   opco: 'All',
    //   status: 'NONEXPIRED',
    //   startDate: null,
    //   rideId: null,
    //   endDate: null,
    //   rewardType: 'All',
    // };

    // const response = yield call(postRequest, `/offer-code/header/user?page=0&size=0`, filtersApplied);

    yield put({ type: RIDES.SUCCESS });
  } catch (error) {
    yield put({ type: RIDES.FAILURE, payload: error.message });
    const handled = yield handleUserSessionErrors(error);
    if (!handled)
      yield put(
        action(SHOW_NOTIFICATION, {
          message: i18n.t('liftEkak.rides.error.message'),
          description: i18n.t('liftEkak.rides.error.description'),
          className: NotificationType.ERROR,
        })
      );
  }
}

function* loadRideAsync({ selectedRideId }) {
  try {
    const ride = yield getRide(selectedRideId);

    if (ride) yield put({ type: RIDE.SUCCESS, payload: ride });
    else {
      yield put({ type: RIDE.FAILURE, error: 'RIDE_NOT_FOUND' });
      yield put(
        action(SHOW_NOTIFICATION, {
          message: i18n.t('liftEkak.ride.error.message'),
          description: i18n.t('liftEkak.ride.fetch.notFound.error.description'),
          className: NotificationType.ERROR,
        })
      );
    }
  } catch (error) {
    yield put({ type: RIDE.FAILURE, error: error.message });

    const handled = yield handleUserSessionErrors(error);
    if (!handled) {
      yield put(
        action(SHOW_NOTIFICATION, {
          message: i18n.t('liftEkak.ride.error.message'),
          description: i18n.t('liftEkak.ride.error.description'),
          className: NotificationType.ERROR,
        })
      );
    }
  }
}

function* saveRideAsync({ data, history }) {
  try {
    const driver = yield select(getUser);
    yield saveRide({ ...data, driver });

    yield loadRidesAsync();

    history.push(APP_ROUTES.RIDES_LIST);

    yield put({ type: SAVE_RIDE.SUCCESS });
    yield put(
      action(SHOW_NOTIFICATION, {
        className: NotificationType.SUCCESS,
        message: i18n.t('liftEkak.ride.success.message'),
        description:
          data.status === RideStatus.CANCELLED
            ? i18n.t('liftEkak.ride.cancel.success.description')
            : i18n.t('liftEkak.ride.save.success.description'),
      })
    );
  } catch (error) {
    yield put({ type: SAVE_RIDE.FAILURE, error: error.message });

    const handled = yield handleUserSessionErrors(error);
    if (!handled) {
      yield put(
        action(SHOW_NOTIFICATION, {
          message: i18n.t('liftEkak.ride.error.message'),
          description: i18n.t('liftEkak.ride.save.error.description'),
          className: NotificationType.ERROR,
        })
      );
    }
  }
}

function* loadBookingsAsync({ filters }) {
  try {
    const bookings = yield getBookings(filters);

    yield put({ type: BOOKINGS.SUCCESS, payload: bookings });
  } catch (error) {
    yield put({ type: BOOKINGS.FAILURE, payload: error.message });
    const handled = yield handleUserSessionErrors(error);
    if (!handled)
      yield put(
        action(SHOW_NOTIFICATION, {
          description: i18n.t('liftEkak.bookings.fetch.error.description'),
          className: NotificationType.ERROR,
          message: i18n.t('liftEkak.bookings.error.message'),
        })
      );
  }
}

function* saveBooking(booking) {
  try {
    const bookings = yield saveBooking(booking);

    yield put({ type: SAVE_BOOKING.SUCCESS, payload: bookings });
  } catch (error) {
    yield put({ type: SAVE_BOOKING.FAILURE, payload: error.message });
    const handled = yield handleUserSessionErrors(error);
    if (!handled)
      yield put(
        action(SHOW_NOTIFICATION, {
          description: i18n.t('liftEkak.booking.save.error.description'),
          className: NotificationType.ERROR,
          message: i18n.t('liftEkak.booking.error.message'),
        })
      );
  }
}

function* loadCitiesAsync({ engNameQuery }) {
  try {
    const cities = yield getCities({ engNameQuery });

    yield put({ type: CITIES.SUCCESS, payload: cities });
  } catch (error) {
    yield put({ type: CITIES.FAILURE, payload: error.message });
    const handled = yield handleUserSessionErrors(error);
    if (!handled)
      yield put(
        action(SHOW_NOTIFICATION, {
          description: i18n.t('liftEkak.cities.fetch.error.description'),
          className: NotificationType.ERROR,
          message: i18n.t('liftEkak.cities.error.message'),
        })
      );
  }
}

function* updateRideFiltersAsync({ filters: updatedFilters }) {
  const filters = yield select((state) => state.rideFilters.data);

  yield put({ type: UPDATE_RIDE_FILTERS.SUCCESS, payload: { ...filters, ...updatedFilters } });
}

function* showNotificationAsync(notificationAction) {
  const { message, description, className, isClosable } = notificationAction;
  yield openNotification({ message, description, className, isClosable });
}

function* watchShowNotification() {
  yield takeEvery(SHOW_NOTIFICATION, showNotificationAsync);
}

function* watchSignIn() {
  yield takeLatest(SIGN_IN.REQUEST, signInAsync);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP.REQUEST, signUpAsync);
}

function* watchSaveUserDetails() {
  yield takeLatest(SAVE_USER_DETAILS.REQUEST, saveUserDetailsAsync);
}

function* watchResetPassword() {
  yield takeLatest(RESET_PASSWORD.REQUEST, sendPasswordResetEmailAsync);
}

function* watchLoadUser() {
  yield takeLatest(USER.REQUEST, loadUserAsync);
}

function* watchLoadUserVehicles() {
  yield takeLatest(USER_VEHICLES.REQUEST, loadUserVehiclesAsync);
}

function* watchSaveUserVehicle() {
  yield takeLatest(SAVE_VEHICLE.REQUEST, saveVehicleAsync);
}

function* watchUpdateRideFilters() {
  yield takeLatest(UPDATE_RIDE_FILTERS.REQUEST, updateRideFiltersAsync);
}
function* watchLoadRides() {
  yield takeLatest(RIDES.REQUEST, loadRidesAsync);
}

function* watchMyLoadRides() {
  yield takeLatest(MY_RIDES.REQUEST, loadMyRidesAsync);
}

function* watchLoadRide() {
  yield takeLatest(RIDE.REQUEST, loadRideAsync);
}

function* watchSaveRide() {
  yield takeLatest(SAVE_RIDE.REQUEST, saveRideAsync);
}

function* loadAllRides() {
  yield takeLatest(FETCH_ALL_RIDES.REQUEST, loadAllNonExpiredRidesAsync);
}

function* watchLoadBookings() {
  yield takeLatest(BOOKINGS.REQUEST, loadBookingsAsync);
}

function* watchSaveBooking() {
  yield takeLatest(SAVE_BOOKING.REQUEST, saveBooking);
}

function* watchLoadCities() {
  yield takeLatest(CITIES.REQUEST, loadCitiesAsync);
}

export default function* rootSaga() {
  yield all([
    watchSignIn(),
    watchSignUp(),
    watchResetPassword(),
    watchSaveUserDetails(),
    watchLoadUser(),
    watchLoadUserVehicles(),
    watchSaveUserVehicle(),
    watchShowNotification(),
    watchLoadRides(),
    watchMyLoadRides(),
    watchLoadRide(),
    watchUpdateRideFilters(),
    watchSaveRide(),
    loadAllRides(),
    watchLoadBookings(),
    watchSaveBooking(),
    watchLoadCities(),
  ]);
}
