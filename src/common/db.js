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

  const userVehiclesRef = doc(db, 'users', uid).collection('vehicles');

  const querySnap = await getDocs(userVehiclesRef);

  querySnap.forEach((snap) => vehicles.push(snap.data()));

  return vehicles;
};

const saveVehicles = async (vehicles = []) => {
  const uid = getCurrentUserID();
  const db = getFirestore();

  const batch = writeBatch(db);

  vehicles.forEach((vehicle) => {
    const vehicleRef = doc(db, 'users', uid).collection('vehicles').doc(vehicle.licenseNo);
    batch.set(vehicleRef, vehicle, { merge: true });
  });

  await batch.commit();
};

const deleteVehicles = async (vehicles = []) => {
  const uid = getCurrentUserID();
  const db = getFirestore();

  const batch = writeBatch(db);

  vehicles.forEach((vehicle) => {
    const vehicleRef = doc(db, 'users', uid).collection('vehicles').doc(vehicle.licenseNo);
    batch.delete(vehicleRef);
  });

  await batch.commit();
};

const getRides = async ({ startLocation, endLocation, departure, rideId, status, pageAction, userGender }) => {
  const db = getFirestore();

  const ridesRef = collection(db, 'rides');

  console.log(moment.now());

  const q = query(
    ridesRef,
    where('status', '==', status || RideStatus.NEW),
    where('departure', '>', moment.now())
    // orderBy('departure')
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
} = {}) => {
  // incrementCounter('rides');

  const db = getFirestore();
  const rideId = `${moment.now()}`;
  const ride = {
    rideId,
    start: { location: startLocation },
    destination: { location: endLocation },
    departure,
    details: { driverNote, route, availableSeatCount, totalSeatCount: availableSeatCount },
    driver,
    status: RideStatus.NEW,
  };

  await setDoc(doc(db, 'rides', rideId), ride);
};

const createBooking = async () => {};
const getBookings = async () => {};

export {
  getUserDetails,
  saveUserDetails,
  getUserVehicles,
  saveVehicles,
  deleteVehicles,
  getRides,
  getRide,
  createRide,
  createBooking,
  getBookings,
};
