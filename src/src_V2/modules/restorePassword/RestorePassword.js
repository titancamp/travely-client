import { Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import AuthPageWrapper from '../../components/authWrapper/authPageWrapper';
import { Formik, Form } from 'formik';
import TextField from '../../components/FormUI/TextField';
import Button from '../../components/FormUI/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SetNewPassword from './SetNewPassword';
import VerifyEmail from '../../components/verifyEmail';
import {
  restorePasswordInitialValues,
  restorePasswordSchema,
} from '../../utils/schemas/auth/auth';
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
    <AuthPageWrapper title={'Restore Password'}>
      <Formik
        initialValues={restorePasswordInitialValues()}
        validationSchema={restorePasswordSchema()}
        onSubmit={submitHandler}
      >
        <Form>
          <TextField name={'email'} label={'Email'} type={'email'} />
          <Button>SEND</Button>
          <div className={styles.goBackWrapper}>
            <Typography
              className={styles.goBack}
              variant='body2'
              align={'center'}
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
