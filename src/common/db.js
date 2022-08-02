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
  endBefore,
  endAt,
  startAt,
} from '@firebase/firestore';
import { PageAction, RideStatus } from 'enums';

import * as _ from 'lodash';
import moment from 'moment';
import { DEFAULT_PAGE_SIZE } from 'util/constants';
import buildRouteIndex, { buildRouteIndexString } from 'util/buildRouteIndex';
import buildPassengerPreferenceDB from 'util/buildPassengerPreferenceDB';
import { getCurrentUserID } from './auth';

const firstVisibleRides = [];
let lastVisibleRide;

const incrementCounter = (resource) => {
  const db = getFirestore();
  const increment = FieldValue.increment(1);

  // Document reference
  const counterDocRef = doc(db, 'counters', `${resource}-counter`);

  // Update read count
  counterDocRef.update({ count: increment });
};

const getPreviousFirstDoc = () => {
  const prevFirstDoc =
    firstVisibleRides.length > 1 ? firstVisibleRides[firstVisibleRides.length - 2] : firstVisibleRides[0];

  firstVisibleRides.pop();

  return prevFirstDoc;
};

const saveUserDetails = async (userDetails) => {
  const uid = getCurrentUserID();

  const db = getFirestore();
  console.log(userDetails);

  await setDoc(doc(db, 'users', uid), userDetails, { merge: true });
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

  const querySnap = await getDocs(userVehiclesRef);

  querySnap.forEach((snap) => vehicles.push(snap.data()));

  return vehicles;
};

const deleteVehicles = async (vehicles = []) => {
  const uid = getCurrentUserID();
  const db = getFirestore();

  const batch = writeBatch(db);

  vehicles.forEach((vehicle) => {
    const vehicleRef = doc(db, 'users', uid).collection('vehicles').doc(vehicle.registrationNo);
    batch.delete(vehicleRef);
  });

  await batch.commit();
};

const getRides = async ({
  startTown,
  endTown,
  departureFrom,
  departureUntil,
  availableSeatCount,
  pageAction,
  userGender,
  vehicleType,
}) => {
  if (!userGender) return [];
  if (!pageAction) {
    lastVisibleRide = null;
    firstVisibleRides.length = 0;
  }

  const db = getFirestore();

  const ridesRef = collection(db, 'rides');
  const queries = [
    startTown && !endTown && where('details.route', 'array-contains', startTown),
    !startTown && endTown && where('details.route', 'array-contains', endTown),
    startTown && endTown && where('indices.route', 'array-contains', buildRouteIndexString([startTown, endTown])),
    departureFrom && where('departure', '>=', departureFrom),
    departureUntil && where('departure', '<=', departureUntil),
    vehicleType && where('details.vehicle.type', '==', vehicleType),
    where(`details.passengerPreference.${userGender}`, '==', true),
    where('status', '==', RideStatus.NEW),
    // where('departure', '>', moment.now()),
    where('seatsAvailable', '==', true),
    orderBy('departure'),
    pageAction === PageAction.NEXT && startAfter(lastVisibleRide),
    pageAction === PageAction.BACK && startAt(getPreviousFirstDoc()),
    limit(DEFAULT_PAGE_SIZE),
  ].filter((v) => v);
  const q = query(ridesRef, ...queries);

  const querySnap = await getDocs(q);

  if (!_.isEmpty(querySnap.docs)) {
    const [firstDoc] = querySnap.docs;
    if (firstDoc.data().rideId !== firstVisibleRides[firstVisibleRides.length - 1]?.data().rideId)
      firstVisibleRides.push(firstDoc);
    lastVisibleRide = querySnap.docs[querySnap.docs.length - 1];
    const rides = querySnap.docs.map((docSnap) => docSnap.data());
    return _.isNumber(availableSeatCount)
      ? rides.filter((ride) => ride.details.availableSeatCount >= availableSeatCount)
      : rides;
  }

  return null;
};

const getRide = async (rideId) => {
  const db = getFirestore();
  const rideRef = doc(db, 'rides', rideId);

  const docSnap = await getDoc(rideRef);

  return docSnap.data();
};

const createRide = async ({
  startLocation,
  endLocation,
  departure,
  note: driverNote,
  route,
  availableSeatCount,
  driver,
  vehicle,
  passengerPreference,
} = {}) => {
  const db = getFirestore();
  const rideId = `${moment.now()}`;
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

const saveVehicle = async ({
  type,
  brand,
  model,
  color,
  registrationNo,
  passengerSeatCount,
  isDefaultVehicle,
} = {}) => {
  const uid = getCurrentUserID();

  const db = getFirestore();
  const vehicleId = registrationNo;
  const vehicle = {
    type,
    brand,
    model,
    color,
    registrationNo,
    passengerSeatCount,
    isDefaultVehicle,
  };

  await setDoc(doc(db, `users/${uid}/vehicles`, vehicleId), vehicle);

  if (isDefaultVehicle) await setDoc(doc(db, 'users', uid), { defaultVehicle: vehicle }, { merge: true });
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
  deleteVehicles,
  getRides,
  getRide,
  createRide,
  createBooking,
  getBookings,
};
