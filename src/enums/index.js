const UserRole = {
  DRIVER: 'DRIVER',
  PASSENGER: 'PASSENGER',
  ADMIN: 'ADMIN',
};

// Antd notification types
const NotificationType = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
};

const SortOrder = {
  DESC: 'DESC',
  ASC: 'ASC',
};

const RideStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  EXPIRED: 'EXPIRED',
};

const SignInProvider = {
  EMAIL_PASSWORD: 'EMAIL_PASSWORD',
  GOOGLE: 'GOOGLE',
};

const FirebaseError = {
  USER_NOT_FOUND: 'auth/user-not-found',
};

export { UserRole, NotificationType, SortOrder, RideStatus, SignInProvider, FirebaseError };
