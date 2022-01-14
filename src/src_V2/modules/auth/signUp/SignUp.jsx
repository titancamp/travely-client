import { Formik, Form } from 'formik';
import { useLocation } from 'react-router-dom';

import Button from '../../../components/formUI/Button';
import PasswordField from '../../../components/formUI/PasswordField';
import AuthPageWrapper from '../components/authWrapper/authPageWrapper';
import PasswordValidator from '../components/passwordValidator/PasswordValidator';

import styles from './SignUp.module.css';
import { usePasswordValidation } from '../../../hooks';
import { setNewPasswordInitialValues } from '../../../utils/schemas/auth/auth';

export default function SignUp() {
  const { passwordStrengthLevel, validatePassword, validateRepeatPassword } =
    usePasswordValidation();

  const location = useLocation();
  const params = new URLSearchParams(location.search);

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
                validate={validatePassword}
              />
              <PasswordField
                name='repeatPassword'
                label='Repeat Password'
                validate={validateRepeatPassword}
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
