import { async } from '@firebase/util';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { FirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    const { displayName, email, photoURL, uid } = result.user;

    return { ok: true, displayName, email, photoURL, uid };
  } catch (error) {
    return { ok: false, errorMessage: error.message };
  }
};

export const registerWithEmailPassword = async ({
  email,
  password,
  displayName,
}) => {
  try {
    const result = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { photoURL, uid } = result.user;

    await updateProfile(FirebaseAuth.currentUser, { displayName });

    return { ok: true, email, photoURL, uid, displayName };
  } catch (error) {
    console.log(error);
    return { ok: false, errorMessage: error.message };
  }
};

export const startLoginWithEmailPassword = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { displayName, photoURL, uid } = result.user;

    return { ok: true, displayName, email, photoURL, uid };
  } catch (error) {
    return { ok: false, errorMessage: error.message };
  }
};

export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut();
};
