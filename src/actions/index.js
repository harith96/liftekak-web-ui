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
  SAVE_VEHICLE,
  USER_VEHICLES,
  RESET_PASSWORD,
  BOOKINGS,
  SAVE_BOOKING,
} from './actionTypes';

const signIn = (provider, signInDetails) => action(SIGN_IN.REQUEST, { provider, signInDetails });
const signUp = (email, password) => action(SIGN_UP.REQUEST, { email, password });
const sendPasswordResetEmail = (email) => action(RESET_PASSWORD.REQUEST, { email });
const saveUserDetails = (data) => action(SAVE_USER_DETAILS.REQUEST, { data });
const loadUserDetails = () => action(USER.REQUEST);

const saveVehicle = (vehicle, callback) =>
  action(SAVE_VEHICLE.REQUEST, {
    vehicle,
    callback,
  });
const loadUserVehicles = () => action(USER_VEHICLES.REQUEST);

const showNotification = (message, description, notificationType) =>
  action(SHOW_NOTIFICATION, { message, description, className: notificationType });
const loadRidesList = (pageAction) => action(RIDES.REQUEST, { pageAction });
const loadRideDetails = (selectedRideId) => action(RIDE.REQUEST, { selectedRideId });
const createRide = (data, history) => action(CREATE_RIDE.REQUEST, { data, history });
const updateRideFilters = (data) => action(UPDATE_RIDE_FILTERS.REQUEST, { data });
const updateRide = (data, history) =>
  action(UPDATE_RIDE.REQUEST, {
    data,
    history,
  });
const loadAllRides = () => action(FETCH_ALL_RIDES.REQUEST);
const loadBookings = () => action(BOOKINGS.REQUEST);
const saveBookings = () => action(SAVE_BOOKING.REQUEST);

export {
  // user actions
  signIn,
  signUp,
  saveUserDetails,
  loadUserDetails,
  sendPasswordResetEmail,
  // vehicle actions
  loadUserVehicles,
  saveVehicle,
  // ride actions
  loadRidesList,
  loadRideDetails,
  showNotification,
  updateRideFilters,
  updateRide,
  createRide,
  loadAllRides,
  loadBookings,
  saveBookings,
};
