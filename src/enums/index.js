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
  NEW: 'NEW',
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

const Gender = {
  MALE: 'Male',
  FEMALE: 'Female',
  OTHER: 'Other',
};

const PageAction = {
  NEXT: 'NEXT',
  BACK: 'BACK',
};

export { UserRole, NotificationType, SortOrder, RideStatus, SignInProvider, FirebaseError, Gender, PageAction };
