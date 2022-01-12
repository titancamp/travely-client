import AuthPageWrapper from '../../../components/authWrapper/authPageWrapper';
import { Formik, Form } from 'formik';
import Button from '../../../components/formUI/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import PasswordField from '../../../components/formUI/PasswordField';
import { ERROR_MESSAGES, getPasswordStrengthLevel } from '../../../utils';
import PasswordValidator from '../../../components/passwordValidator/PasswordValidator';
import { useState } from 'react';
import styles from './SignUp.module.css';
import { setNewPasswordInitialValues } from '../../../utils/schemas/auth/auth';

export default function SignUp() {
  const [passwordStrengthLevel, setPasswordStrengthLevel] = useState(0);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
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
    params.get('token') && (
      <AuthPageWrapper
        title='Welcome to Travelly'
        description='Please set a password for your account'
      >
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
    )
  );
}
