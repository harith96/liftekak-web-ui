import { takeLatest, put, all, select, call, takeEvery } from 'redux-saga/effects';
import { getRequest, patchRequest, postRequest } from '_http';
import * as _ from 'lodash';

import {
  USER,
  SHOW_NOTIFICATION,
  RIDES,
  RIDE,
  UPDATE_RIDE,
  UPDATE_RIDE_FILTERS,
  CREATE_RIDE,
  FETCH_ALL_RIDES,
  SIGN_IN,
  SIGN_UP,
  USER_VEHICLES,
  RESET_PASSWORD,
} from 'actions/actionTypes';
import { BAD_REQUEST_STATUS, BATCHES_PAGE_SIZE, NOT_FOUND_STATUS, USER_NOT_AUTHORIZED_STATUS } from 'util/constants';
import * as i18n from '_i18n';
import { action } from 'reduxHelpers';
import { FirebaseError, NotificationType, SignInProvider } from 'enums';
import openNotification from 'components/openNotification';
import { getAuth } from '@firebase/auth';
import {
  loginWithEmailAndPassword,
  loginWithGoogle,
  sendPasswordRestEmail,
  signUpWithEmailAndPassword,
} from 'common/auth';
import { getUserVehicles } from 'common/db';

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
        message: i18n.t('Password Reset Success'),
      })
    );
  } catch (error) {
    const handled = yield handleUserSessionErrors(error);
    if (!handled)
      yield put(
        action(SHOW_NOTIFICATION, {
          description: i18n.t('Seems like entered email is not registered with us.'),
          className: NotificationType.ERROR,
          message: i18n.t('Email Error'),
        })
      );

    yield put({ type: RESET_PASSWORD.FAILURE, payload: error.code });
  }
}

function* loadUserVehiclesAsync() {
  try {
    yield getUserVehicles();
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

function* loadUserAsync() {
  try {
    const auth = getAuth();

    const response = { data: {} };

    yield put({ type: USER.SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: USER.FAILURE, payload: error.message });
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

function* loadRidesAsync() {
  try {
    const { page, ...filtersApplied } = yield select(getRideFilters);

    const response = yield call(
      postRequest,
      `/offer-code/header/user?page=${page}&size=${BATCHES_PAGE_SIZE}`,
      filtersApplied
    );

    response.data.groupedRides = _.groupBy(response?.data?.items, 'rewardType');
    yield put({ type: RIDES.SUCCESS, payload: response.data });
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

function* loadAllNonExpiredRidesAsync() {
  try {
    const filtersApplied = {
      sort: null,
      opco: 'All',
      status: 'NONEXPIRED',
      startDate: null,
      rideId: null,
      endDate: null,
      rewardType: 'All',
    };

    const response = yield call(postRequest, `/offer-code/header/user?page=0&size=0`, filtersApplied);
    response.data.groupedRides = _.groupBy(response?.data?.items, 'rewardType');

    yield put({ type: RIDES.SUCCESS, payload: response.data });
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
    const response = yield call(getRequest, `/offer-code/${selectedRideId}`);
    yield put({ type: RIDE.SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: RIDE.FAILURE, error: error.message });

    const handled = yield handleUserSessionErrors(error);
    if (!handled) {
      let description = i18n.t('liftEkak.ride.error.description');

      if (error.response?.status === NOT_FOUND_STATUS) description = i18n.t('liftEkak.ride.notFound.error.description');
      yield put(
        action(SHOW_NOTIFICATION, {
          message: i18n.t('liftEkak.ride.error.message'),
          description,
          className: NotificationType.ERROR,
        })
      );
    }
  }
}
function* updateRideAsync({ data: { rideId, endDate, comment } = {}, history }) {
  try {
    yield call(patchRequest, `/offer-code/${rideId}/update`, {
      rideId,
      endDate,
      comment,
    });
    yield put({ type: UPDATE_RIDE.SUCCESS });
    yield put(
      action(SHOW_NOTIFICATION, {
        className: NotificationType.SUCCESS,
        message: i18n.t('liftEkak.ride.success.message'),
        description: i18n.t('liftEkak.ride.updated.success.description'),
      })
    );

    history.push('/suite/rewards/rides');
  } catch (error) {
    yield put({ type: UPDATE_RIDE.FAILURE, error: error.message });
    const handled = yield handleUserSessionErrors(error);
    if (!handled)
      yield put(
        action(SHOW_NOTIFICATION, {
          message: i18n.t('liftEkak.ride.error.message'),
          description: i18n.t('liftEkak.ride.updated.error.description'),
          className: NotificationType.ERROR,
        })
      );
  }
}

function* createRideAsync({ data }) {
  try {
    const { name: associateName, userId: associateId } = yield select(getUser);
    const response = yield call(postRequest, '/offer-code', { ...data, associateName, associateId });

    yield loadRidesAsync();

    yield put({ type: CREATE_RIDE.SUCCESS, payload: response.data });
    yield put(
      action(SHOW_NOTIFICATION, {
        className: NotificationType.SUCCESS,
        message: i18n.t('liftEkak.ride.success.message'),
        description: i18n.t('liftEkak.ride.save.success.description'),
      })
    );
  } catch (error) {
    yield put({ type: CREATE_RIDE.FAILURE, error: error.message });

    const handled = yield handleUserSessionErrors(error);
    if (!handled) {
      let description = i18n.t('liftEkak.ride.save.error.description');

      if (error.response?.status === BAD_REQUEST_STATUS)
        description = i18n.t('liftEkak.ride.alreadyExists.error.description');
      yield put(
        action(SHOW_NOTIFICATION, {
          message: i18n.t('liftEkak.ride.error.message'),
          description,
          className: NotificationType.ERROR,
        })
      );
    }
  }
}

function* updateRideFiltersAsync({ data }) {
  yield put({ type: UPDATE_RIDE_FILTERS.SUCCESS, payload: data });
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

function* watchResetPassword() {
  yield takeLatest(RESET_PASSWORD.REQUEST, sendPasswordResetEmailAsync);
}

function* watchLoadUser() {
  yield takeLatest(USER.REQUEST, loadUserAsync);
}

function* watchLoadUserVehicles() {
  yield takeLatest(USER_VEHICLES.REQUEST, loadUserVehiclesAsync);
}

function* watchUpdateRideFilters() {
  yield takeLatest(UPDATE_RIDE_FILTERS.REQUEST, updateRideFiltersAsync);
}
function* watchLoadRides() {
  yield takeLatest(RIDES.REQUEST, loadRidesAsync);
}

function* watchLoadRide() {
  yield takeLatest(RIDE.REQUEST, loadRideAsync);
}

function* watchUpdateRide() {
  yield takeLatest(UPDATE_RIDE.REQUEST, updateRideAsync);
}
function* watchCreateRide() {
  yield takeLatest(CREATE_RIDE.REQUEST, createRideAsync);
}

function* loadAllRides() {
  yield takeLatest(FETCH_ALL_RIDES.REQUEST, loadAllNonExpiredRidesAsync);
}

export default function* rootSaga() {
  yield all([
    watchSignIn(),
    watchSignUp(),
    watchResetPassword(),
    watchLoadUser(),
    watchLoadUserVehicles(),
    watchShowNotification(),
    watchLoadRides(),
    watchLoadRide(),
    watchUpdateRide(),
    watchUpdateRideFilters(),
    watchCreateRide(),
    loadAllRides(),
  ]);
}
