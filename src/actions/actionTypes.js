import { createRequestTypes } from 'reduxHelpers';

const SIGN_IN = createRequestTypes('SIGN_IN');
const SIGN_UP = createRequestTypes('SIGN_UP');
const RESET_PASSWORD = createRequestTypes('RESET_PASSWORD');
const SAVE_USER_DETAILS = createRequestTypes('SAVE_USER_DETAILS');
const USER = createRequestTypes('USER');

const USER_VEHICLES = createRequestTypes('USER_VEHICLES');
const SAVE_VEHICLE = createRequestTypes('SAVE_VEHICLE');

const RIDES = createRequestTypes('RIDES');
const MY_RIDES = createRequestTypes('MY_RIDES');
const RIDE = createRequestTypes('RIDE');
const SAVE_RIDE = createRequestTypes('SAVE_RIDE');
const UPDATE_RIDE_FILTERS = createRequestTypes('UPDATE_RIDE_FILTERS');
const UPDATE_RIDE = createRequestTypes('UPDATE_RIDE');
const FETCH_ALL_RIDES = createRequestTypes('FETCH_ALL_RIDES');

const BOOKINGS = createRequestTypes('BOOKINGS');
const SAVE_BOOKING = createRequestTypes('SAVE_BOOKING');

const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';

export {
  SIGN_IN,
  SIGN_UP,
  RESET_PASSWORD,
  SAVE_USER_DETAILS,
  USER,
  USER_VEHICLES,
  SAVE_VEHICLE,
  RIDES,
  MY_RIDES,
  RIDE,
  SAVE_RIDE,
  SHOW_NOTIFICATION,
  UPDATE_RIDE_FILTERS,
  UPDATE_RIDE,
  FETCH_ALL_RIDES,
  BOOKINGS,
  SAVE_BOOKING,
};
