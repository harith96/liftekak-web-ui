import { combineReducers } from 'redux';

import initialState from 'store/initialState';
import {
  USER,
  RIDES,
  RIDE,
  UPDATE_RIDE_FILTERS,
  UPDATE_RIDE,
  SAVE_RIDE,
  SIGN_IN,
  SIGN_UP,
  USER_VEHICLES,
  SAVE_VEHICLE,
  SAVE_USER_DETAILS,
  RESET_PASSWORD,
  BOOKING_REQUESTS,
  SAVE_BOOKING,
  MY_RIDES,
  CITIES,
  BOOKING,
  MY_BOOKINGS,
} from 'actions/actionTypes';
import { createReducer } from 'reduxHelpers';

const signUp = createReducer(SIGN_UP, initialState.signUp);
const signIn = createReducer(SIGN_IN, initialState.signIn);
const sendPasswordResetEmail = createReducer(RESET_PASSWORD, initialState.sendPasswordResetEmail);
const saveUserDetails = createReducer(SAVE_USER_DETAILS, initialState.saveUserDetails);
const user = createReducer(USER, initialState.user);

const userVehicles = createReducer(USER_VEHICLES, initialState.userVehicles);
const saveVehicle = createReducer(SAVE_VEHICLE, initialState.saveVehicle);

const rides = createReducer(RIDES, initialState.rides);
const myRides = createReducer(MY_RIDES, initialState.myRides);
const ride = createReducer(RIDE, initialState.ride);
const rideFilters = createReducer(UPDATE_RIDE_FILTERS, initialState.rideFilters);
const updateRide = createReducer(UPDATE_RIDE, initialState.updateRide);
const saveRide = createReducer(SAVE_RIDE, initialState.saveRide);
const bookingRequests = createReducer(BOOKING_REQUESTS, initialState.bookingRequests);
const myBookings = createReducer(MY_BOOKINGS, initialState.myBookings);
const booking = createReducer(BOOKING, initialState.booking);
const saveBooking = createReducer(SAVE_BOOKING, initialState.saveBooking);
const cities = createReducer(CITIES, initialState.cities);

export default combineReducers({
  signUp,
  signIn,
  sendPasswordResetEmail,
  saveUserDetails,
  user,
  userVehicles,
  saveVehicle,
  rides,
  myRides,
  ride,
  rideFilters,
  updateRide,
  saveRide,
  booking,
  myBookings,
  bookingRequests,
  saveBooking,
  cities,
});
