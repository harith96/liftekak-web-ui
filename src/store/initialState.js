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
    data: null,
    error: null,
  },
  saveVehicles: {
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
      sort: null,
      opco: 'All',
      status: 'All',
      startDate: null,
      rideId: null,
      endDate: null,
      page: 1,
      rewardType: 'All',
    },
    error: null,
  },
  rides: {
    fetching: true,
    data: [],
    error: null,
  },
  ride: {
    fetching: true,
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
  createRide: {
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
};
export default initialState;
