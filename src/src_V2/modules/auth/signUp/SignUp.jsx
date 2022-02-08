import { Button } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import PasswordField from '../../../components/formUI/PasswordField';
import PasswordValidator from '../../../components/passwordValidator/PasswordValidator';
import {
  setNewPasswordInitialValues,
  setNewPasswordValidationSchema,
} from '../../../utils/schemas/auth/auth';
import AuthPageWrapper from '../components/authWrapper/authPageWrapper';
import { ROUTES } from '../routes';
import styles from './SignUp.module.css';

export default function SignUp() {
  const { getFieldProps, errors, touched, isSubmitting, handleSubmit } = useFormik({
    initialValues: setNewPasswordInitialValues(),
    validationSchema: setNewPasswordValidationSchema(),
  });
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchParams.get('token')) {
      navigate(`/${ROUTES.LOGIN}`, { replace: true });
    }
  }, []);

  return (
    <AuthPageWrapper
      title='Welcome to Travely'
      description='Please set a password for your account'
    >
      <form onSubmit={handleSubmit}>
        <div className={styles.fieldsWrapper}>
          <PasswordField
            name='password'
            label='Password'
            fullWidth
            margin='normal'
            error={!!(touched.password && errors.password)}
            helperText={touched.password && errors.password}
            {...getFieldProps('password')}
          />
          <PasswordField
            name='repeatPassword'
            label='Repeat Password'
            fullWidth
            margin='normal'
            error={!!(touched.repeatPassword && errors.repeatPassword)}
            helperText={touched.repeatPassword && errors.repeatPassword}
            {...getFieldProps('repeatPassword')}
          />
        </div>
        <PasswordValidator password={getFieldProps('password').value} />
        <Button
          type='submit'
          variant='contained'
          fullWidth
          size={'large'}
          disabled={isSubmitting}
        >
          CONFIRM
        </Button>
      </form>
    </AuthPageWrapper>
  );
}
