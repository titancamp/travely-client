import { useState } from 'react';
import { Formik, Form } from 'formik';

import Button from '../../../components/formUI/Button';
import PasswordField from '../../../components/formUI/PasswordField';
import AuthPageWrapper from '../components/authWrapper/authPageWrapper';
import PasswordValidator from '../components/passwordValidator/PasswordValidator';

import styles from './RestorePassword.module.css';
import { ERROR_MESSAGES, getPasswordStrengthLevel } from '../../../utils';
import { setNewPasswordInitialValues } from '../../../utils/schemas/auth/auth';

export default function SetNewPassword() {
  const [passwordStrengthLevel, setPasswordStrengthLevel] = useState(0);

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
    <AuthPageWrapper title='Set new password'>
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
  );
}
