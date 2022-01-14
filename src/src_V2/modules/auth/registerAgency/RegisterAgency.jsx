import { useState } from 'react';
import { Formik, Form } from 'formik';
import { Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import Button from '../../../components/formUI/Button';
import TextField from '../../../components/formUI/TextField';
import VerifyEmail from '../components/verifyEmail/VerifyEmail';
import PasswordField from '../../../components/formUI/PasswordField';
import AuthPageWrapper from '../components/authWrapper/authPageWrapper';
import PasswordValidator from '../components/passwordValidator/PasswordValidator';

import { ROUTES } from '../routes';
import {
  registerAgencySchema,
  registerAgencyInitialValues,
} from '../../../utils/schemas/auth/auth';
import styles from './RegisterAgency.module.css';
import { ERROR_MESSAGES, getPasswordStrengthLevel } from '../../../utils';

export default function RegisterAgency() {
  const [passwordStrengthLevel, setPasswordStrengthLevel] = useState(0);
  const [enteredEmail, setEnteredEmail] = useState('');

  const [done, setIsDone] = useState(false);

  const submitHandler = ({ email }) => {
    setEnteredEmail(email);
    setIsDone(true);
  };

  const validatePasswordHandler = (password) => {
    const strengthLevel = getPasswordStrengthLevel(password);
    setPasswordStrengthLevel(strengthLevel);
    if (!password) return ERROR_MESSAGES.required;
    if (strengthLevel < 31) return ERROR_MESSAGES.password;
  };

  const validateRepeatPasswordHandler = (repeatPassword, { password }) => {
    if (!repeatPassword) return ERROR_MESSAGES.required;
    if (repeatPassword !== password) return ERROR_MESSAGES.repeatPassword;
  };

  const goBackHandler = () => {
    setIsDone(false);
  };

  return done ? (
    <VerifyEmail email={enteredEmail} onGoBack={goBackHandler} />
  ) : (
    <AuthPageWrapper title='Register your Travel Agency!'>
      <Formik
        initialValues={registerAgencyInitialValues()}
        validationSchema={registerAgencySchema()}
        onSubmit={submitHandler}
        validateOnMount
      >
        <Form>
          <div className={styles.fieldsWrapper}>
            <TextField name='agencyName' label='Agency Name' />
            <TextField name='email' label='Email' type='email' />
            <TextField name='ownerName' label='Your Name' />
            <PasswordField
              name='password'
              label='Password'
              validate={validatePasswordHandler}
            />
            <PasswordField
              name='repeatPassword'
              label='Repeat Password'
              validate={validateRepeatPasswordHandler}
            />
          </div>
          <PasswordValidator passedLevel={passwordStrengthLevel} />
          <Button>REGISTER</Button>
          <Typography>
            {'Already have an account? '}
            <Link component={RouterLink} to={`/${ROUTES.LOGIN}`}>
              Log in
            </Link>
          </Typography>
        </Form>
      </Formik>
    </AuthPageWrapper>
  );
}
