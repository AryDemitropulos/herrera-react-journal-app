import {
  authSlice,
  checkingCredentials,
  login,
  logout,
} from '../../../src/store/auth/authSlice';
import {
  authenticatedState,
  demoUser,
  initialState,
} from '../../fixtures/authFixtures';

describe('Pruebas en el authSlice', () => {
  test('debe regresar el estado inicial y llamarse auth', () => {
    const { name, getInitialState } = authSlice;
    const state = getInitialState();

    expect(name).toBe('auth');
    expect(state).toEqual(initialState);
  });

  test('debe de realizar la autenticacion', () => {
    const state = authSlice.reducer(initialState, login(demoUser));
    expect(state).toEqual({
      ...demoUser,
      status: 'authenticated',
      errorMessage: null,
    });
  });

  test('debe de realizar el logout sin argumentos', () => {
    const state = authSlice.reducer(authenticatedState, logout());
    expect(state).toEqual({
      ...initialState,
      errorMessage: undefined,
      status: 'not-authenticated',
    });
  });

  test('debe de realizar el logout con argumento', () => {
    const errorMessage = 'Credenciales no son correctas';
    const state = authSlice.reducer(
      authenticatedState,
      logout({ errorMessage })
    );
    expect(state).toEqual({
      ...initialState,
      errorMessage: errorMessage,
      status: 'not-authenticated',
    });
  });
  test('debe de cambiar el estado a checking', () => {
    const state = authSlice.reducer(authenticatedState, checkingCredentials());
    expect(state).toEqual({
      ...authenticatedState,
      status: 'checking',
    });
  });
});
