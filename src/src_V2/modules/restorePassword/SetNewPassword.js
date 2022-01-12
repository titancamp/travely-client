import AuthPageWrapper from '../../components/authWrapper/authPageWrapper';
import { Formik, Form } from 'formik';
import Button from '../../components/FormUI/Button';
import { useNavigate } from 'react-router-dom';
import PasswordField from '../../components/FormUI/PasswordField';
// import { useState } from 'react';
import { ERROR_MESSAGES, getPasswordStrengthLevel } from '../../utils';
import PasswordValidator from '../../components/passwordValidator/PasswordValidator';
import { useState } from 'react';
import styles from './RestorePassword.module.css';

const initialValues = {
  password: '',
  repeatPassword: '',
};

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
    <AuthPageWrapper title={'Set new password'}>
      <Formik initialValues={initialValues} onSubmit={submitHandler}>
        <Form>
          <div className={styles.fieldsWrapper}>
            <PasswordField
              name={'password'}
              label={'Password'}
              validate={validatePasswordHandler}
            />
            <PasswordField
              name={'repeatPassword'}
              label={'Repeat Password'}
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
