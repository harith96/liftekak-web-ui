import { combineReducers } from 'redux';

import initialState from 'store/initialState';
import { USER, RIDES, RIDE, UPDATE_RIDE_FILTERS, UPDATE_RIDE, CREATE_RIDE } from 'actions/actionTypes';
import { createReducer } from 'reduxHelpers';

const user = createReducer(USER, initialState.user);
const rides = createReducer(RIDES, initialState.rides);
const ride = createReducer(RIDE, initialState.ride);
const rideFilters = createReducer(UPDATE_RIDE_FILTERS, initialState.rideFilters);
const updateRide = createReducer(UPDATE_RIDE, initialState.updateRide);
const createRide = createReducer(CREATE_RIDE, initialState.createRide);

export default combineReducers({
  user,
  rides,
  ride,
  rideFilters,
  updateRide,
  createRide,
});
