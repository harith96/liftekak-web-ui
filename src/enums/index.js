const UserRole = {
  DRIVER: 'DRIVER',
  PASSENGER: 'PASSENGER',
  ADMIN: 'ADMIN',
};

const AdminLevel = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  COOPERATE_ADMIN: 'COOPERATE_ADMIN',
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
  ON_GOING: 'ON_GOING',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  EXPIRED: 'EXPIRED',
};

export { UserRole, NotificationType, SortOrder, RideStatus, AdminLevel };
