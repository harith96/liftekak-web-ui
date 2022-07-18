import { setDoc, getDoc, getDocs, getFirestore, doc, writeBatch } from '@firebase/firestore';

import { getCurrentUserID } from './auth';

const saveUserDetails = async (userDetails) => {
  const uid = getCurrentUserID();

  const db = getFirestore();

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

const getRides = async ({ parameters: { startLocation, endLocation, departure, driver } }) => {};
const getRide = async (rideId) => {};
const createRide = async () => {};

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
