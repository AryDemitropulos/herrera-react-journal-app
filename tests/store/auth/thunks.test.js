import { checkingCredentials } from '../../../src/store/auth/authSlice';
import { checkingAuthentication } from '../../../src/store/auth/thunk';
jest.mock('../../../src/firebase/providers');

describe('Pruebas sobre AuthThunks', () => {
  test('debe invocar el checkingCredential', async () => {
    const dispatch = jest.fn();
    await checkingAuthentication()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });
});
