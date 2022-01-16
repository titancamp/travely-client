import { useState } from 'react';
import { useFormik } from 'formik';
import { Typography, TextField, Button } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';

import SetNewPassword from './SetNewPassword';
import VerifyEmail from '../components/verifyEmail/VerifyEmail';
import AuthPageWrapper from '../components/authWrapper/authPageWrapper';

import {
  restorePasswordInitialValues,
  restorePasswordValidationSchema,
} from '../../../utils/schemas/auth/auth';
import styles from './RestorePassword.module.css';

export default function RestorePassword() {
  const submitHandler = ({ email }) => {
    setEnteredEmail(email);
    setIsDone(true);
  };

  const { getFieldProps, errors, touched, isSubmitting, handleSubmit } = useFormik({
    initialValues: restorePasswordInitialValues(),
    validationSchema: restorePasswordValidationSchema(),
    onSubmit: submitHandler,
    validateOnMount: true,
  });

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [done, setIsDone] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState('');
  const navigate = useNavigate();

  const goBackHandler = () => {
    setIsDone(false);
  };

  return token ? (
    <SetNewPassword />
  ) : done ? (
    <VerifyEmail onGoBack={goBackHandler} email={enteredEmail} />
  ) : (
    <AuthPageWrapper title='Restore Password'>
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
        <Button
          type='submit'
          variant='contained'
          fullWidth
          size={'large'}
          disabled={isSubmitting}
        >
          SEND
        </Button>
        <div className={styles.goBackWrapper}>
          <Typography
            className={styles.goBack}
            variant='body2'
            align='center'
            onClick={() => navigate(-1)}
          >
            &#8592; Back to Login
          </Typography>
        </div>
      </form>
    </AuthPageWrapper>
  );
}
