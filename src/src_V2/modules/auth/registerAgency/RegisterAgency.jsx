import { Button, Link, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import PasswordField from '../../../components/formUI/PasswordField';
import PasswordValidator from '../../../components/passwordValidator/PasswordValidator';
import {
  registerAgencyInitialValues,
  registerAgencyValidationSchema,
} from '../../../utils/schemas/auth/auth';
import AuthPageWrapper from '../components/authWrapper/authPageWrapper';
import VerifyEmail from '../components/verifyEmail/VerifyEmail';
import { ROUTES } from '../routes';
import styles from './RegisterAgency.module.css';

export default function RegisterAgency() {
  const submitHandler = ({ email }) => {
    setEnteredEmail(email);
    setIsDone(true);
  };

  const { getFieldProps, errors, touched, isSubmitting, handleSubmit } = useFormik({
    initialValues: registerAgencyInitialValues(),
    validationSchema: registerAgencyValidationSchema(),
    onSubmit: submitHandler,
    validateOnMount: true,
  });

  const [done, setIsDone] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState('');

  const goBackHandler = () => {
    setIsDone(false);
  };

  return done ? (
    <VerifyEmail email={enteredEmail} onGoBack={goBackHandler} />
  ) : (
    <AuthPageWrapper title='Register your Travel Agency!'>
      <form onSubmit={handleSubmit}>
        <div className={styles.fieldsWrapper}>
          <TextField
            name='agencyName'
            label='Agency Name'
            fullWidth
            margin='normal'
            error={!!(touched.agencyName && errors.agencyName)}
            helperText={touched.agencyName && errors.agencyName}
            {...getFieldProps('agencyName')}
          />
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
            name='ownerName'
            label='Your Name'
            fullWidth
            margin='normal'
            error={!!(touched.ownerName && errors.ownerName)}
            helperText={touched.ownerName && errors.ownerName}
            {...getFieldProps('ownerName')}
          />
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
          REGISTER
        </Button>
        <Typography>
          {'Already have an account? '}
          <Link component={RouterLink} to={`/${ROUTES.LOGIN}`}>
            Log in
          </Link>
        </Typography>
      </form>
    </AuthPageWrapper>
  );
}
