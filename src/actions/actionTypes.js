import { createRequestTypes } from 'reduxHelpers';

const USER = createRequestTypes('USER');
const RIDES = createRequestTypes('RIDES');
const RIDE = createRequestTypes('RIDE');
const CREATE_RIDE = createRequestTypes('CREATE_RIDE');
const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
const UPDATE_RIDE_FILTERS = createRequestTypes('UPDATE_RIDE_FILTERS');
const UPDATE_RIDE = createRequestTypes('UPDATE_RIDE');
const FETCH_ALL_RIDES = createRequestTypes('FETCH_ALL_RIDES');

export { USER, RIDES, RIDE, CREATE_RIDE, SHOW_NOTIFICATION, UPDATE_RIDE_FILTERS, UPDATE_RIDE, FETCH_ALL_RIDES };
