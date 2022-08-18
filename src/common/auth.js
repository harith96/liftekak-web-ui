import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  browserLocalPersistence,
  browserSessionPersistence,
  signOut as signOutFirebase,
  onAuthStateChanged,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBvoMSWLzK7CD1uqrdMWB7BMgdjteppwBg',
  authDomain: 'liftekak-ebbc2.firebaseapp.com',
  projectId: 'liftekak-ebbc2',
  storageBucket: 'liftekak-ebbc2.appspot.com',
  messagingSenderId: '1097028429256',
  appId: '1:1097028429256:web:6e8b9a5ca348ac36228cfd',
  measurementId: 'G-FDXQ1SYCY2',
};

const app = initializeApp(firebaseConfig);

export default app;

export const loginWithEmailAndPassword = async (email, password, rememberMe) => {
  const auth = getAuth();

  auth.setPersistence(rememberMe ? browserLocalPersistence : browserSessionPersistence);

  return signInWithEmailAndPassword(auth, email, password);
};

export const loginWithGoogle = async () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  provider.addScope('profile');

  const result = await signInWithPopup(auth, provider);
  return GoogleAuthProvider.credentialFromResult(result);
};

export const signUpWithEmailAndPassword = async (email, password) => {
  const auth = getAuth();

  return createUserWithEmailAndPassword(auth, email, password);
};

export const sendPasswordRestEmail = async (email) => {
  const auth = getAuth();

  console.log('reset password: ', auth);
  console.log('reset password: ', email);
  await sendPasswordResetEmail(auth, email);
};

export const getCurrentUserID = () => {
  const auth = getAuth();

  return auth.currentUser?.uid;
};

export const getAuthFullName = () => {
  const auth = getAuth();

  return auth.currentUser?.displayName;
};

export const getAuthProfilePictureURL = () => {
  const auth = getAuth();

  return auth.currentUser?.photoURL;
};

export const getUserEmail = () => {
  const auth = getAuth();

  return auth.currentUser?.email;
};

export const signOut = async () => {
  const auth = getAuth();
  return !!auth.currentUser;
};

export const isUserSignedIn = async () => {};

export const listenForAuthStateChanged = async (signedInCallback, signedOutCallback) => {
  const auth = getAuth();

  return onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('Auth User: ', user);
      if (signedInCallback) signedInCallback(user);
    } else {
      console.log('User logged out: ');
      if (signedOutCallback) signedOutCallback();
    }
  });
};
