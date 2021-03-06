import { combineReducers } from 'redux';

import initialState from 'store/initialState';
import {
  USER,
  RIDES,
  RIDE,
  UPDATE_RIDE_FILTERS,
  UPDATE_RIDE,
  CREATE_RIDE,
  SIGN_IN,
  SIGN_UP,
  USER_VEHICLES,
  SAVE_VEHICLES,
  SAVE_USER_DETAILS,
  RESET_PASSWORD,
} from 'actions/actionTypes';
import { createReducer } from 'reduxHelpers';

const signUp = createReducer(SIGN_UP, initialState.signUp);
const signIn = createReducer(SIGN_IN, initialState.signIn);
const sendPasswordResetEmail = createReducer(RESET_PASSWORD, initialState.sendPasswordResetEmail);
const saveUserDetails = createReducer(SAVE_USER_DETAILS, initialState.saveUserDetails);
const user = createReducer(USER, initialState.user);

const userVehicles = createReducer(USER_VEHICLES, initialState.userVehicles);
const saveVehicles = createReducer(SAVE_VEHICLES, initialState.saveVehicles);

const rides = createReducer(RIDES, initialState.rides);
const ride = createReducer(RIDE, initialState.ride);
const rideFilters = createReducer(UPDATE_RIDE_FILTERS, initialState.rideFilters);
const updateRide = createReducer(UPDATE_RIDE, initialState.updateRide);
const createRide = createReducer(CREATE_RIDE, initialState.createRide);

export default combineReducers({
  signUp,
  signIn,
  sendPasswordResetEmail,
  saveUserDetails,
  user,
  userVehicles,
  saveVehicles,
  rides,
  ride,
  rideFilters,
  updateRide,
  createRide,
});
