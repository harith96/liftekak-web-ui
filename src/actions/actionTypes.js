import { createRequestTypes } from 'reduxHelpers';

const SIGN_IN = createRequestTypes('SIGN_IN');
const SIGN_UP = createRequestTypes('SIGN_UP');
const RESET_PASSWORD = createRequestTypes('RESET_PASSWORD');
const SAVE_USER_DETAILS = createRequestTypes('SAVE_USER_DETAILS');
const USER = createRequestTypes('USER');

const USER_VEHICLES = createRequestTypes('USER_VEHICLES');
const SAVE_VEHICLES = createRequestTypes('SAVE_VEHICLES');

const RIDES = createRequestTypes('RIDES');
const RIDE = createRequestTypes('RIDE');
const CREATE_RIDE = createRequestTypes('CREATE_RIDE');
const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
const UPDATE_RIDE_FILTERS = createRequestTypes('UPDATE_RIDE_FILTERS');
const UPDATE_RIDE = createRequestTypes('UPDATE_RIDE');
const FETCH_ALL_RIDES = createRequestTypes('FETCH_ALL_RIDES');

export {
  SIGN_IN,
  SIGN_UP,
  RESET_PASSWORD,
  SAVE_USER_DETAILS,
  USER,
  USER_VEHICLES,
  SAVE_VEHICLES,
  RIDES,
  RIDE,
  CREATE_RIDE,
  SHOW_NOTIFICATION,
  UPDATE_RIDE_FILTERS,
  UPDATE_RIDE,
  FETCH_ALL_RIDES,
};
