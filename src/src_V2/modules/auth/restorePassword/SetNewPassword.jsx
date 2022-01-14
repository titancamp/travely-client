import { Formik, Form } from 'formik';

import Button from '../../../components/formUI/Button';
import PasswordField from '../../../components/formUI/PasswordField';
import AuthPageWrapper from '../components/authWrapper/authPageWrapper';
import PasswordValidator from '../components/passwordValidator/PasswordValidator';

import styles from './RestorePassword.module.css';
import { usePasswordValidation } from '../../../hooks';
import { setNewPasswordInitialValues } from '../../../utils/schemas/auth/auth';

export default function SetNewPassword() {
  const { passwordStrengthLevel, validatePassword, validateRepeatPassword } =
    usePasswordValidation();

  return (
    <AuthPageWrapper title='Set new password'>
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
