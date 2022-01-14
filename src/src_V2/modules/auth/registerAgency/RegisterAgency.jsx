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
import { usePasswordValidation } from '../../../hooks';

export default function RegisterAgency() {
  const [done, setIsDone] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState('');
  const { passwordStrengthLevel, validatePassword, validateRepeatPassword } =
    usePasswordValidation();

  const submitHandler = ({ email }) => {
    setEnteredEmail(email);
    setIsDone(true);
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
            <PasswordField name='password' label='Password' validate={validatePassword} />
            <PasswordField
              name='repeatPassword'
              label='Repeat Password'
              validate={validateRepeatPassword}
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
