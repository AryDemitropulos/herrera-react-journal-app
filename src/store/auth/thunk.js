import {
  logoutFirebase,
  registerWithEmailPassword,
  signInWithGoogle,
  startLoginWithEmailPassword,
} from '../../firebase/providers';
import { checkingCredentials, login, logout } from './authSlice';

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const result = await signInWithGoogle();

    if (!result.ok) {
      return dispatch(logout({ errorMessage: result.errorMessage }));
    }

    dispatch(login({ ...result }));
  };
};

export const startCreatingUserWithEmailPassword = ({
  email,
  password,
  displayName,
}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const result = await registerWithEmailPassword({
      email,
      password,
      displayName,
    });

    if (!result.ok) {
      return dispatch(logout({ errorMessage: result.errorMessage }));
    }

    dispatch(login({ ...result }));
  };
};

export const loginWithEmailPassword = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const result = await startLoginWithEmailPassword(email, password);

    if (!result.ok) {
      return dispatch(logout({ errorMessage: result.errorMessage }));
    }

    dispatch(login({ ...result }));
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase();
    dispatch(logout());
  };
};
