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
} from './actionTypes';

const loadUserDetails = (userId) => action(USER.REQUEST, { userId });

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
  loadUserDetails,
  loadRidesDetails,
  loadRideDetails,
  showNotification,
  updateRideFilters,
  updateRide,
  createRide,
  loadAllRides,
};
