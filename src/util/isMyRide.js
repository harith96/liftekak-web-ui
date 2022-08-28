const { getCurrentUserID } = require('common/auth');

const isMyRide = (driverUID) => driverUID !== null && driverUID === getCurrentUserID();

export default isMyRide;
