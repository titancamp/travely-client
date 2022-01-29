import { Button, Link, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { Link as RouterLink } from 'react-router-dom';

import {
  LoginInitialValues,
  loginValidationSchema,
} from '../../../utils/schemas/auth/auth';
import AuthPageWrapper from '../components/authWrapper/authPageWrapper';
import { ROUTES } from '../routes';
import styles from './Login.module.css';

export default function Login() {
  const { getFieldProps, errors, touched, isSubmitting, handleSubmit } = useFormik({
    initialValues: LoginInitialValues(),
    validationSchema: loginValidationSchema(),
  });

  return (
    <AuthPageWrapper title='Welcome to Travely'>
      <form onSubmit={handleSubmit}>
        <TextField
          name='email'
          label='Email'
          type='email'
          fullWidth
          margin='normal'
          error={!!(touched.email && errors.email)}
          helperText={touched.email && errors.email}
          {...getFieldProps('email')}
        />
        <TextField
          name='password'
          label='Password'
          type='password'
          fullWidth
          margin='normal'
          error={!!(touched.password && errors.password)}
          helperText={touched.password && errors.password}
          {...getFieldProps('password')}
        />
        <Typography align='right' className={styles.forgotPassword}>
          <Link
            color='inherit'
            variant='body2'
            underline='none'
            component={RouterLink}
            to={`/${ROUTES.RESTORE_PASSWORD}`}
          >
            Forgot Password?
          </Link>
        </Typography>
        <Button
          type='submit'
          variant='contained'
          fullWidth
          size={'large'}
          disabled={isSubmitting}
        >
          LOGIN
        </Button>
        <Typography>
          {'Don\'t have an account? '}
          <Link component={RouterLink} to={`/${ROUTES.REGISTER_AGENCY}`}>
            Sign Up
          </Link>
        </Typography>
      </form>
    </AuthPageWrapper>
  );
}
