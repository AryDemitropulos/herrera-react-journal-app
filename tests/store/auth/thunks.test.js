import {
  logoutFirebase,
  registerWithEmailPassword,
  signInWithGoogle,
} from '../../../src/firebase/providers';
import {
  checkingCredentials,
  login,
  logout,
} from '../../../src/store/auth/authSlice';
import {
  checkingAuthentication,
  startCreatingUserWithEmailPassword,
  startGoogleSignIn,
  startLogout,
} from '../../../src/store/auth/thunk';
import { resetJournalStore } from '../../../src/store/journal/journalSlice';
import { authenticatedState, demoUser } from '../../fixtures/authFixtures';
jest.mock('../../../src/firebase/providers');

describe('Pruebas sobre AuthThunks', () => {
  const dispatch = jest.fn();
  beforeEach(() => jest.clearAllMocks());

  test('debe invocar el checkingCredential', async () => {
    await checkingAuthentication()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });

  test('startGoogleSignIn debe llamar checkingCredentials y login - Exito ', async () => {
    const loginData = { ok: true, user: demoUser };
    await signInWithGoogle.mockResolvedValue(loginData);

    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test('startGoogleSignIn debe llamar checkingCredentials y logout - Error ', async () => {
    const loginData = { ok: false, errorMessage: 'Un error de google' };
    await signInWithGoogle.mockResolvedValue(loginData);

    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(
      logout({ errorMessage: loginData.errorMessage })
    );
  });

  test('startCreatingUserWithEmailPassword debe llamar checkingCredentials y login - Exito ', async () => {
    const loginData = { ok: true, user: demoUser };
    await registerWithEmailPassword.mockResolvedValue(loginData);

    await startCreatingUserWithEmailPassword({
      email: demoUser.email,
      password: 'TEST_PASSWORD',
      displayName: demoUser.displayName,
    })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });
  test('startCreatingUserWithEmailPassword debe llamar checkingCredentials y logout - Error ', async () => {
    const loginData = { ok: false, errorMessage: 'Un error de firebase' };
    await registerWithEmailPassword.mockResolvedValue(loginData);

    await startCreatingUserWithEmailPassword({
      email: demoUser.email,
      password: 'TEST_PASSWORD',
      displayName: demoUser.displayName,
    })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(
      logout({ errorMessage: loginData.errorMessage })
    );
  });
  test('startLogout debe llamar resetJournalStore y logout', async () => {
    await startLogout()(dispatch);
    
    expect(logoutFirebase).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(resetJournalStore());
    expect(dispatch).toHaveBeenCalledWith(logout());
  });
});
