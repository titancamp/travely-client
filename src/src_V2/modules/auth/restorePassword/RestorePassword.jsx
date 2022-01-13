import { useState } from 'react';
import { Formik, Form } from 'formik';
import { Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import SetNewPassword from './SetNewPassword';
import Button from '../../../components/formUI/Button';
import VerifyEmail from '../../../components/verifyEmail';
import TextField from '../../../components/formUI/TextField';
import AuthPageWrapper from '../../../components/authWrapper/authPageWrapper';

import {
  restorePasswordSchema,
  restorePasswordInitialValues,
} from '../../../utils/schemas/auth/auth';
import styles from './RestorePassword.module.css';

export default function RestorePassword() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [done, setIsDone] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (values) => {
    await new Promise((res) => {
      setTimeout(res, 1000);
    });
    setEnteredEmail(values.email);
    setIsDone(true);
  };

  const goBackHandler = () => {
    setIsDone(false);
  };

  return params.get('token') ? (
    <SetNewPassword />
  ) : done ? (
    <VerifyEmail onGoBack={goBackHandler} email={enteredEmail} />
  ) : (
    <AuthPageWrapper title='Restore Password'>
      <Formik
        initialValues={restorePasswordInitialValues()}
        validationSchema={restorePasswordSchema()}
        onSubmit={submitHandler}
        validateOnMount
      >
        <Form>
          <TextField name='email' label='Email' type='email' />
          <Button>SEND</Button>
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
        </Form>
      </Formik>
    </AuthPageWrapper>
  );
}
