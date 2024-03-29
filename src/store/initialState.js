import { RideStatus } from 'enums';

const initialState = {
  signIn: {
    fetching: false,
    data: null,
    error: null,
  },
  signUp: {
    fetching: false,
    data: null,
    error: null,
  },
  sendPasswordResetEmail: {
    fetching: false,
    data: null,
    error: null,
  },
  saveUserDetails: {
    fetching: false,
    data: null,
    error: null,
  },
  userVehicles: {
    fetching: false,
    data: [],
    error: null,
  },
  saveVehicle: {
    fetching: false,
    data: null,
    error: null,
  },
  user: {
    fetching: false,
    data: {
      email: null,
      userId: null,
      name: null,
      userRole: null,
      vendorList: [],
    },
    error: null,
  },
  updateRide: {
    fetching: false,
    data: [],
    error: null,
  },
  rideFilters: {
    fetching: true,
    data: {
      startTown: '',
      destinationTown: '',
      departureFrom: null,
      departureUntil: null,
      availableSeatCount: 1,
      vehicleType: null,
      rideStatus: RideStatus.NEW,
    },
    error: null,
  },
  rides: {
    fetching: true,
    data: [],
    error: null,
  },
  myRides: {
    fetching: true,
    data: [],
    error: null,
  },
  ride: {
    fetching: false,
    data: {
      rideId: null,
      startDate: 0,
      endDate: 0,
      associateName: null,
      comments: null,
      rewardType: null,
      status: null,
      items: [],
    },
    error: null,
  },
  saveRide: {
    fetching: false,
    data: {
      rideId: null,
      startDate: 0,
      endDate: 0,
      associateName: null,
      comments: null,
      rewardType: null,
      status: null,
    },
    error: null,
  },
  bookings: {
    fetching: false,
    data: [],
    error: null,
  },
  saveBooking: {
    fetching: false,
    data: null,
    error: null,
  },
  cities: {
    fetching: false,
    data: [],
    error: null,
  },
};
export default initialState;
