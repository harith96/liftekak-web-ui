import { createRequestTypes } from 'reduxHelpers';

export const SIGN_IN = createRequestTypes('SIGN_IN');
export const SIGN_UP = createRequestTypes('SIGN_UP');
export const RESET_PASSWORD = createRequestTypes('RESET_PASSWORD');
export const SAVE_USER_DETAILS = createRequestTypes('SAVE_USER_DETAILS');
export const USER = createRequestTypes('USER');

export const USER_VEHICLES = createRequestTypes('USER_VEHICLES');
export const SAVE_VEHICLE = createRequestTypes('SAVE_VEHICLE');

export const RIDES = createRequestTypes('RIDES');
export const MY_RIDES = createRequestTypes('MY_RIDES');
export const RIDE = createRequestTypes('RIDE');
export const SAVE_RIDE = createRequestTypes('SAVE_RIDE');
export const UPDATE_RIDE_FILTERS = createRequestTypes('UPDATE_RIDE_FILTERS');
export const UPDATE_RIDE = createRequestTypes('UPDATE_RIDE');
export const FETCH_ALL_RIDES = createRequestTypes('FETCH_ALL_RIDES');

export const BOOKINGS = createRequestTypes('BOOKINGS');
export const SAVE_BOOKING = createRequestTypes('SAVE_BOOKING');

export const CITIES = createRequestTypes('CITIES');

export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
