const RewardType = {
  LOYALTY: 'LOYALTY',
  SEASONAL: 'SEASONAL',
  // GROWTH: 'GROWTH',
};

const BatchStatus = {
  OPEN: 'OPEN',
  PENDING: 'PENDING',
  REVIEWED: 'REVIEWED',
  APPROVED: 'APPROVED',
  // ARCHIVED: 'ARCHIVED',
  REJECTED: 'REJECTED',
  // EXPIRED: 'EXPIRED',
  PARTIAL: 'PARTIAL',
  // CANCELLED: 'CANCELLED',
};

const UserRole = {
  MASTER_VENDOR: 'MASTER_VENDOR',
  SYSCO_ASSOCIATE: 'SYSCO_ASSOCIATE',
  ADMIN: 'admin',
};

const VendorLevel = {
  MASTER: 'MASTER',
};
const BatchType = {
  OPCO: 'OPCO',
  NATIONAL: 'NATIONAL',
  REGIONAL: 'REGIONAL',
  MULTI: 'MULTI',
  REGIONAL_M: 'REGIONAL_M',
};

const BatchDownloadNames = {
  // GROWTH: 'Growth',
  LOYALTY: 'Loyalty',
  SEASONAL: 'Seasonal',
};

// Antd notification types
const NotificationTypes = {
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

const DisplayedUserRole = {
  MASTER_VENDOR: 'Vendor',
  SYSCO_ASSOCIATE: 'Sysco Associate',
};

export {
  BatchStatus,
  UserRole,
  RewardType,
  VendorLevel,
  BatchType,
  BatchDownloadNames,
  NotificationTypes,
  SortOrder,
  RideStatus,
  DisplayedUserRole,
};
