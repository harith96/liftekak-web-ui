import { action } from 'reduxHelpers';
import {
  USER,
  SHOW_NOTIFICATION,
  RIDE,
  RIDES,
  UPDATE_RIDE_FILTERS,
  UPDATE_RIDE,
  SAVE_RIDE,
  FETCH_ALL_RIDES,
  SIGN_IN,
  SIGN_UP,
  SAVE_USER_DETAILS,
  SAVE_VEHICLE,
  USER_VEHICLES,
  RESET_PASSWORD,
  BOOKINGS,
  SAVE_BOOKING,
  MY_RIDES,
  CITIES,
} from './actionTypes';

export const signIn = (provider, signInDetails) => action(SIGN_IN.REQUEST, { provider, signInDetails });
export const signUp = (email, password) => action(SIGN_UP.REQUEST, { email, password });
export const sendPasswordResetEmail = (email) => action(RESET_PASSWORD.REQUEST, { email });
export const saveUserDetails = (data) => action(SAVE_USER_DETAILS.REQUEST, { data });
export const loadUserDetails = () => action(USER.REQUEST);

export const saveVehicle = (vehicle, callback) =>
  action(SAVE_VEHICLE.REQUEST, {
    vehicle,
    callback,
  });
export const loadUserVehicles = () => action(USER_VEHICLES.REQUEST);

export const showNotification = (message, description, notificationType) =>
  action(SHOW_NOTIFICATION, { message, description, className: notificationType });
export const loadRidesList = (pageAction) => action(RIDES.REQUEST, { pageAction });
export const loadMyRides = (pageAction) => action(MY_RIDES.REQUEST, { pageAction });
export const loadRideDetails = (selectedRideId) => action(RIDE.REQUEST, { selectedRideId });
export const saveRide = (data, history) => action(SAVE_RIDE.REQUEST, { data, history });
export const updateRideFilters = (filters) => action(UPDATE_RIDE_FILTERS.REQUEST, { filters });
export const updateRide = (data, history) =>
  action(UPDATE_RIDE.REQUEST, {
    data,
    history,
  });
export const loadAllRides = () => action(FETCH_ALL_RIDES.REQUEST);
export const loadBookings = () => action(BOOKINGS.REQUEST);
export const saveBookings = () => action(SAVE_BOOKING.REQUEST);
export const loadCities = ({ engNameQuery } = {}) => action(CITIES.REQUEST, { engNameQuery });
