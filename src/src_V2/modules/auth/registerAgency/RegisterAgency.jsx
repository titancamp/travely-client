import { useState } from 'react';
import { Formik, Form } from 'formik';
import { Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import Button from '../../../components/formUI/Button';
import VerifyEmail from '../../../components/verifyEmail';
import TextField from '../../../components/formUI/TextField';
import PasswordField from '../../../components/formUI/PasswordField';
import AuthPageWrapper from '../../../components/authWrapper/authPageWrapper';
import PasswordValidator from '../../../components/passwordValidator/PasswordValidator';

import {
  registerAgencySchema,
  registerAgencyInitialValues,
} from '../../../utils/schemas/auth/auth';
import { ROUTES } from '../../../app/routes';
import styles from './RegisterAgency.module.css';
import { ERROR_MESSAGES, getPasswordStrengthLevel } from '../../../utils';

export default function RegisterAgency() {
  const [passwordStrengthLevel, setPasswordStrengthLevel] = useState(0);
  const [enteredEmail, setEnteredEmail] = useState('');

  const [done, setIsDone] = useState(false);

  const submitHandler = async (values, submitProps) => {
    await new Promise((res) => {
      setTimeout(res, 1000);
    });
    if (Math.random() > 0.5) {
      submitProps.setErrors({ email: 'Email Error' });
    } else {
      setEnteredEmail(values.email);
      setIsDone(true);
    }
  };

  const validatePasswordHandler = (password) => {
    const strengthLevel = getPasswordStrengthLevel(password);
    setPasswordStrengthLevel(strengthLevel);
    if (!password) return ERROR_MESSAGES.required;
    if (strengthLevel < 31) return ERROR_MESSAGES.password;
  };

  const validateRepeatPasswordHandler = (repeatPassword, values) => {
    if (!repeatPassword) return ERROR_MESSAGES.required;
    if (repeatPassword !== values.password) return ERROR_MESSAGES.repeatPassword;
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
            <Link component={RouterLink} to={ROUTES.LOGIN}>
              {'Log in'}
            </Link>
          </Typography>
        </Form>
      </Formik>
    </AuthPageWrapper>
  );
}
