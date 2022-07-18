import { action } from 'reduxHelpers';
import {
  USER,
  SHOW_NOTIFICATION,
  RIDE,
  RIDES,
  UPDATE_RIDE_FILTERS,
  UPDATE_RIDE,
  CREATE_RIDE,
  FETCH_ALL_RIDES,
  SIGN_IN,
  SIGN_UP,
  SAVE_USER_DETAILS,
  SAVE_VEHICLES,
  USER_VEHICLES,
  RESET_PASSWORD,
} from './actionTypes';

const signIn = (provider, signInDetails) => action(SIGN_IN.REQUEST, { provider, signInDetails });
const signUp = (email, password) => action(SIGN_UP.REQUEST, { email, password });
const sendPasswordResetEmail = (email) => action(RESET_PASSWORD.REQUEST, { email });
const saveUserDetails = (data) => action(SAVE_USER_DETAILS.REQUEST, { data });
const loadUserDetails = () => action(USER.REQUEST);

const saveVehicles = ({ type, brand, model, year, registrationNumber }) =>
  action(SAVE_VEHICLES.REQUEST, { type, brand, model, year, registrationNumber });
const loadUserVehicles = () => action(USER_VEHICLES.REQUEST);

const showNotification = (message, description, notificationType) =>
  action(SHOW_NOTIFICATION, { message, description, className: notificationType });
const loadRidesDetails = () => action(RIDES.REQUEST);
const loadRideDetails = (selectedRideId) => action(RIDE.REQUEST, { selectedRideId });
const createRide = (data) => action(CREATE_RIDE.REQUEST, { data });
const updateRideFilters = (data) => action(UPDATE_RIDE_FILTERS.REQUEST, { data });
const updateRide = (data, history) =>
  action(UPDATE_RIDE.REQUEST, {
    data,
    history,
  });
const loadAllRides = () => action(FETCH_ALL_RIDES.REQUEST);

export {
  // user actions
  signIn,
  signUp,
  saveUserDetails,
  loadUserDetails,
  sendPasswordResetEmail,
  // vehicle actions
  loadUserVehicles,
  saveVehicles,
  // ride actions
  loadRidesDetails,
  loadRideDetails,
  showNotification,
  updateRideFilters,
  updateRide,
  createRide,
  loadAllRides,
};
