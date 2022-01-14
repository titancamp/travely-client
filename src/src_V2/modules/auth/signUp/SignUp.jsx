import { useEffect } from 'react';
import { Formik, Form } from 'formik';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Button from '../../../components/formUI/Button';
import PasswordField from '../../../components/formUI/PasswordField';
import AuthPageWrapper from '../components/authWrapper/authPageWrapper';
import PasswordValidator from '../components/passwordValidator/PasswordValidator';

import { ROUTES } from '../routes';
import styles from './SignUp.module.css';
import { usePasswordValidation } from '../../../hooks';
import { setNewPasswordInitialValues } from '../../../utils/schemas/auth/auth';

export default function SignUp() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { passwordStrengthLevel, validatePassword, validateRepeatPassword } =
    usePasswordValidation();

  useEffect(() => {
    if (!searchParams.get('token')) {
      navigate(`/${ROUTES.LOGIN}`, { replace: true });
    }
  }, []);

  return (
    <AuthPageWrapper
      title='Welcome to Travely'
      description='Please set a password for your account'
    >
      <Formik initialValues={setNewPasswordInitialValues()} onSubmit={() => {}}>
        <Form>
          <div className={styles.fieldsWrapper}>
            <PasswordField name='password' label='Password' validate={validatePassword} />
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
  );
}
