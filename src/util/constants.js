export const DOWNLOAD_DATE_PATTERN = 'DD_MMM_YYYY_hh_mm_ss';
export const DEFAULT_PAGE_SIZE = 20;
export const DATE_PATTERN = 'YYYY-MM-DD';
export const DATE_PATTERN_DISPLAY = 'DD MMMM YYYY';
export const COMMENT_TIME_PATTERN = 'DD MMMM YYYY hh:mm:ss';

export const ITEM_SEARCH_INDICES = ['description', 'brand', 'pack', 'size', 'supc', 'mfgProductNumber', 'gtin'];
export const BATCH_DOWNLOAD_COLUMNS = [
  'batchId',
  'supc',
  'brand',
  'description',
  'size',
  'gtin',
  'pack',
  'mfgProductNumber',
  'loyaltyPoints',
  // 'growthPoints',
  'seasonalPoints',
  'newRewardPoints',
];
export const FILTER_ALL = 'All';
export const NOT_APPLICABLE = 'N/A';

export const APP_ROUTES = {
  USER: '/user',
  LOGIN: '/login',
  CREATE_RIDE: '/create-ride',
  UPDATE_RIDE: '/update-ride', // /update-ride/:id
  RIDES_LIST: '/rides',
  RIDE_VIEW: '/ride', // /ride/:id
  CREATE_BOOKING: '/book-ride',
  UPDATE_BOOKING: '/update-booking',
  BOOKINGS: '/bookings',
  VEHICLES: '/vehicles',
};

export const MAX_PASSENGER_SEAT_COUNTS_BY_VEHICLE_TYPE = {
  CAR: 4,
  VAN: 20,
  MOTOR_BIKE: 1,
  BUS: 96,
  THREE_WHEEL: 3,
  OTHER: 20,
};

export const ISO_DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]';

export const BAD_REQUEST_STATUS = 400;
export const NOT_FOUND_STATUS = 404;
export const USER_NOT_AUTHORIZED_STATUS = 401;

export const RidesTabs = {
  ALL_RIDES: 'all-rides',
  MY_RIDES: 'my-rides',
};
