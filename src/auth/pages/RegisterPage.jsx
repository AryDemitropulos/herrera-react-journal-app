import { useForm } from '../../hooks';
import { Link as RouterLink } from 'react-router-dom';
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailPassword } from '../../store/auth';

const initialFormState = {
  displayName: 'TEST',
  email: 'test2@test.com',
  password: '123456',
};

const formValidations = {
  email: [(value = '') => value.includes('@'), 'El correo debe de tener una @'],
  password: [
    (value = '') => value.length >= 6,
    'La contraseña debe de tener mas de 6 caracteres',
  ],
  displayName: [(value = '') => value.length > 0, 'El nombre es obligatorio'],
};

export const RegisterPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const {
    formState,
    displayName,
    email,
    password,
    displayNameError,
    emailError,
    passwordError,
    isFormValid,
    onInputChange,
  } = useForm(initialFormState, formValidations);

  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector((store) => store.auth);

  const isCheckingAuthentication = useMemo(
    () => status === 'checking',
    [status]
  );

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    dispatch(startCreatingUserWithEmailPassword(formState));
  };

  return (
    <AuthLayout title='Register'>
      <h1>Is Valid: {isFormValid ? 'TRUE' : 'FALSE'}</h1>
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Nombre Completo'
              type='text'
              placeholder='John Doe'
              fullWidth
              name='displayName'
              value={displayName}
              onChange={onInputChange}
              error={formSubmitted && !!displayNameError}
              helperText={displayNameError}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Correo'
              type='email'
              placeholder='correo@google.com'
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
              error={formSubmitted && !!emailError}
              helperText={emailError}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Contraseña'
              type='password'
              placeholder='Contraseña'
              fullWidth
              name='password'
              value={password}
              onChange={onInputChange}
              error={formSubmitted && !!passwordError}
              helperText={passwordError}
            />
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
            {errorMessage && (
              <Grid item xs={12}>
                <Alert severity='error'>{errorMessage}</Alert>
              </Grid>
            )}
            <Grid item xs={12}>
              <Button
                disabled={isCheckingAuthentication}
                type='submit'
                variant='contained'
                fullWidth
              >
                Crear Cuenta
              </Button>
            </Grid>
          </Grid>
          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{ mr: 1 }}>Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color='inherit' to='/auth/login'>
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
