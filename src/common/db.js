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
  startAt,
  addDoc,
} from '@firebase/firestore';
import { RideStatus } from 'enums';

import * as _ from 'lodash';
import moment from 'moment';
import { DEFAULT_PAGE_SIZE } from 'util/constants';
import { getCurrentUserID } from './auth';

let lastVisibleRide;

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

const getRides = async ({ startLocation, endLocation, departure, rideId, status, pageAction, userGender }) => {
  const db = getFirestore();

  const ridesRef = collection(db, 'rides');

  const q = query(
    ridesRef,
    where('status', '==', status || RideStatus.NEW),
    where('departure', '>', moment.now()),
    orderBy('departure')
    // limit(DEFAULT_PAGE_SIZE)
    // startAt(!pageAction || !lastVisibleRide ? 1 : lastVisibleRide)
  );

  const querySnap = await getDocs(q);

  // if (!_.isEmpty(querySnap.docs)) {
  //   lastVisibleRide = querySnap.docs[querySnap.docs.length - 1];
  // }

  return querySnap.docs.map((docSnap) => docSnap.data());
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
} = {}) => {
  const db = getFirestore();
  const rideId = `${moment.now()}`;
  const ride = {
    rideId,
    start: { location: startLocation },
    destination: { location: endLocation },
    departure,
    availableSeatCount,
    details: {
      driverNote,
      route,
      totalSeatCount: availableSeatCount,
      vehicle,
    },
    driver: {
      mobileNo: driver.mobileNo,
      firstName: driver.firstName,
      lastName: driver.lastName,
      uid: getCurrentUserID(),
    },
    status: RideStatus.NEW,
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

const createBooking = async () => {};
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
