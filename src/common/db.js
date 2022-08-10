import {
  setDoc,
  getDoc,
  getDocs,
  getFirestore,
  doc,
  writeBatch,
  FieldValue,
  collection,
  query,
  where,
  limit,
  orderBy,
  serverTimestamp,
  startAfter,
  startAt,
} from '@firebase/firestore';
import { PageAction, RideStatus } from 'enums';

import * as _ from 'lodash';
import moment from 'moment';
import { DEFAULT_PAGE_SIZE } from 'util/constants';
import buildRouteIndex, { buildRouteIndexString } from 'util/buildRouteIndex';
import buildPassengerPreferenceDB from 'util/buildPassengerPreferenceDB';
import { getCurrentUserID, getUserEmail } from './auth';
import DocPagination from './util/DocPagination';

const allRidesPagination = new DocPagination();
const myRidesPagination = new DocPagination();

const incrementCounter = (resource) => {
  const db = getFirestore();
  const increment = FieldValue.increment(1);

  // Document reference
  const counterDocRef = doc(db, 'counters', `${resource}-counter`);

  // Update read count
  counterDocRef.update({ count: increment });
};

const saveUserDetails = async (userDetails) => {
  const uid = getCurrentUserID();

  const db = getFirestore();

  await setDoc(doc(db, 'users', uid), { ...userDetails, email: getUserEmail() }, { merge: true });
};

const getUserDetails = async () => {
  const uid = getCurrentUserID();

  const db = getFirestore();

  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);

  return userSnap.data();
};

const getUserVehicles = async () => {
  const uid = getCurrentUserID();
  const db = getFirestore();

  const vehicles = [];

  const userVehiclesRef = collection(db, `users/${uid}/vehicles`);

  const q = query(userVehiclesRef, where('isDeleted', '==', false), orderBy('isDefaultVehicle', 'desc'));

  const querySnap = await getDocs(q);

  querySnap.forEach((snap) => vehicles.push(snap.data()));

  return vehicles;
};

const makeVehicleDefaultVehicle = async (vehicle, batch) => {
  const uid = getCurrentUserID();

  const db = getFirestore();
  const vehicleDocs = await getDocs(
    query(collection(db, `users/${uid}/vehicles`), where('isDefaultVehicle', '==', true))
  );

  vehicleDocs.forEach((vehicleDoc) =>
    batch.set(doc(db, `users/${uid}/vehicles`, vehicleDoc.id), { isDefaultVehicle: false }, { merge: true })
  );

  batch.set(doc(db, 'users', uid), { defaultVehicle: vehicle }, { merge: true });
};

const saveVehicle = async ({
  type,
  brand,
  model,
  color,
  registrationNo,
  passengerSeatCount,
  isDefaultVehicle = false,
  isDeleted = false,
  fuelType,
} = {}) => {
  const uid = getCurrentUserID();

  const db = getFirestore();

  const vehicle = {
    type,
    brand,
    model,
    color,
    registrationNo,
    passengerSeatCount,
    isDefaultVehicle,
    isDeleted,
    fuelType,
  };

  const batch = writeBatch(db);
  if (isDefaultVehicle) await makeVehicleDefaultVehicle(vehicle, batch);

  const vehicleId = registrationNo;

  await batch.set(doc(db, `users/${uid}/vehicles`, vehicleId), vehicle);

  await batch.commit();
};

const getRides = async ({
  startTown,
  destinationTown,
  departureFrom,
  departureUntil,
  availableSeatCount,
  pageAction,
  userGender,
  vehicleType,
}) => {
  if (!userGender) return [];
  if (!pageAction) allRidesPagination.reset();

  const db = getFirestore();

  const ridesRef = collection(db, 'rides');
  const queries = [
    startTown && !destinationTown && where('details.route', 'array-contains', startTown),
    !startTown && destinationTown && where('details.route', 'array-contains', destinationTown),
    startTown &&
      destinationTown &&
      where('indices.route', 'array-contains', buildRouteIndexString([startTown, destinationTown])),
    departureFrom && where('departure', '>=', departureFrom.valueOf()),
    departureUntil && where('departure', '<=', departureUntil.valueOf()),
    vehicleType && where('details.vehicle.type', '==', vehicleType),
    where(`details.passengerPreference.${userGender}`, '==', true),
    where('status', '==', RideStatus.NEW),
    where('departure', '>', moment.now()),
    where('seatsAvailable', '==', true),
    orderBy('departure'),
    pageAction === PageAction.NEXT && startAfter(allRidesPagination.currentPageLastDoc),
    pageAction === PageAction.BACK && startAt(allRidesPagination.getPreviousPageFirstDoc()),
    limit(DEFAULT_PAGE_SIZE),
  ].filter((v) => v);
  const q = query(ridesRef, ...queries);

  const querySnap = await getDocs(q);

  if (!_.isEmpty(querySnap.docs)) {
    allRidesPagination.updatePagination(querySnap.docs);
    const rides = querySnap.docs.map((docSnap) => docSnap.data());
    return _.isNumber(availableSeatCount)
      ? rides.filter((ride) => ride.details.availableSeatCount >= availableSeatCount)
      : rides;
  }

  return [];
};

const getMyRides = async ({
  startTown,
  destinationTown,
  departureFrom,
  departureUntil,
  rideStatus = RideStatus.NEW,
  pageAction,
  vehicleType,
  uid,
}) => {
  if (!uid) return [];
  if (!pageAction) myRidesPagination.reset();

  const db = getFirestore();

  const ridesRef = collection(db, 'rides');
  const queries = [
    startTown && !destinationTown && where('details.route', 'array-contains', startTown),
    !startTown && destinationTown && where('details.route', 'array-contains', destinationTown),
    startTown &&
      destinationTown &&
      where('indices.route', 'array-contains', buildRouteIndexString([startTown, destinationTown])),
    departureFrom && where('departure', '>=', departureFrom.valueOf()),
    departureUntil && where('departure', '<=', departureUntil.valueOf()),
    vehicleType && where('details.vehicle.type', '==', vehicleType),
    where(`driver.uid`, '==', uid),
    rideStatus && where('status', '==', rideStatus),
    orderBy('departure'),
    pageAction === PageAction.NEXT && startAfter(myRidesPagination.currentPageLastDoc),
    pageAction === PageAction.BACK && startAt(myRidesPagination.getPreviousPageFirstDoc()),
    limit(DEFAULT_PAGE_SIZE),
  ].filter((v) => v);
  const q = query(ridesRef, ...queries);

  const querySnap = await getDocs(q);

  if (!_.isEmpty(querySnap.docs)) {
    myRidesPagination.updatePagination(querySnap.docs);
    return querySnap.docs.map((docSnap) => docSnap.data());
  }

  return [];
};

const getRide = async (rideId) => {
  const db = getFirestore();
  const rideRef = doc(db, 'rides', rideId);

  const docSnap = await getDoc(rideRef);

  return docSnap.data();
};

const saveRide = async ({
  startLocation,
  endLocation,
  departure,
  note: driverNote,
  route,
  availableSeatCount,
  driver,
  vehicle,
  passengerPreference,
  rideId,
} = {}) => {
  const db = getFirestore();
  const ride = {
    rideId,
    departure,
    details: {
      start: { location: startLocation },
      destination: { location: endLocation },
      availableSeatCount,
      driverNote,
      route,
      totalSeatCount: availableSeatCount,
      vehicle,
      passengerPreference: buildPassengerPreferenceDB(passengerPreference),
    },
    driver: {
      mobileNo: driver.mobileNo,
      firstName: driver.firstName,
      lastName: driver.lastName,
      uid: getCurrentUserID(),
    },
    status: RideStatus.NEW,
    seatsAvailable: true,
    indices: {
      route: buildRouteIndex(route),
    },
  };

  await setDoc(doc(db, 'rides', rideId), ride);
};

const createBooking = async ({ ride, pickupLocation, dropLocation, note, user }) => {
  const uid = getCurrentUserID();

  const db = getFirestore();
  const bookingId = moment.now();
  const booking = {
    bookingId,
    ride,
    details: {
      pickupLocation,
      dropLocation,
      passengerNote: note,
    },
    user: {
      uid,
      firstName: user.firstName,
      lastName: user.lastName,
      mobileNo: user.mobileNo,
    },
    bookedTimestamp: serverTimestamp,
  };

  await setDoc(doc(db, `bookings`, bookingId), booking);
};

const getBookings = async () => {};

export {
  getUserDetails,
  saveUserDetails,
  getUserVehicles,
  saveVehicle,
  getRides,
  getRide,
  saveRide,
  createBooking,
  getBookings,
  getMyRides,
};
