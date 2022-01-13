import { useState } from 'react';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';

import Button from '../../../components/formUI/Button';
import PasswordField from '../../../components/formUI/PasswordField';
import AuthPageWrapper from '../../../components/authWrapper/authPageWrapper';
import PasswordValidator from '../../../components/passwordValidator/PasswordValidator';

import styles from './RestorePassword.module.css';
import { ERROR_MESSAGES, getPasswordStrengthLevel } from '../../../utils';
import { setNewPasswordInitialValues } from '../../../utils/schemas/auth/auth';

export default function SetNewPassword() {
  const [passwordStrengthLevel, setPasswordStrengthLevel] = useState(0);
  const navigate = useNavigate();

  const submitHandler = async (_, submitProps) => {
    await new Promise((res) => {
      setTimeout(res, 1000);
    });
    if (Math.random() > 0.5) {
      submitProps.setErrors({ password: 'Password error' });
    } else {
      navigate('/manager/dashboard');
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

  return (
    <AuthPageWrapper title='Set new password'>
      <Formik initialValues={setNewPasswordInitialValues()} onSubmit={submitHandler}>
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