import { useState } from 'react';
import { Formik, Form } from 'formik';
import { useLocation } from 'react-router-dom';

import Button from '../../../components/formUI/Button';
import PasswordField from '../../../components/formUI/PasswordField';
import AuthPageWrapper from '../components/authWrapper/authPageWrapper';
import PasswordValidator from '../components/passwordValidator/PasswordValidator';

import styles from './SignUp.module.css';
import { ERROR_MESSAGES, getPasswordStrengthLevel } from '../../../utils';
import { setNewPasswordInitialValues } from '../../../utils/schemas/auth/auth';

export default function SignUp() {
  const [passwordStrengthLevel, setPasswordStrengthLevel] = useState(0);
  const location = useLocation();
  const params = new URLSearchParams(location.search);

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

  return (
    params.get('token') && (
      <AuthPageWrapper
        title='Welcome to Travely'
        description='Please set a password for your account'
      >
        <Formik initialValues={setNewPasswordInitialValues()} onSubmit={() => {}}>
          <Form>
            <div className={styles.fieldsWrapper}>
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
            <Button>CONFIRM</Button>
          </Form>
        </Formik>
      </AuthPageWrapper>
    )
  );
}
