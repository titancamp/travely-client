import { Button } from '@mui/material';
import { useFormik } from 'formik';

import PasswordField from '../../../components/formUI/PasswordField';
import {
  setNewPasswordInitialValues,
  setNewPasswordValidationSchema,
} from '../../../utils/schemas/auth/auth';
import AuthPageWrapper from '../components/authWrapper/authPageWrapper';
import PasswordValidator from '../components/passwordValidator/PasswordValidator';
import styles from './RestorePassword.module.css';

export default function SetNewPassword() {
  const { getFieldProps, errors, touched, isSubmitting, handleSubmit } = useFormik({
    initialValues: setNewPasswordInitialValues(),
    validationSchema: setNewPasswordValidationSchema(),
  });

  return (
    <AuthPageWrapper title='Set new password'>
      <form onSubmit={handleSubmit}>
        <div className={styles.fieldsWrapper}>
          <PasswordField
            name='password'
            label='Password'
            fullWidth
            margin='normal'
            error={!!(touched.password && errors.password)}
            helperText={touched.password && errors.password}
            {...getFieldProps('password')}
          />
          <PasswordField
            name='repeatPassword'
            label='Repeat Password'
            fullWidth
            margin='normal'
            error={!!(touched.repeatPassword && errors.repeatPassword)}
            helperText={touched.repeatPassword && errors.repeatPassword}
            {...getFieldProps('repeatPassword')}
          />
        </div>
        <PasswordValidator password={getFieldProps('password').value} />
        <Button
          type='submit'
          variant='contained'
          fullWidth
          size={'large'}
          disabled={isSubmitting}
        >
          CONFIRM
        </Button>
      </form>
    </AuthPageWrapper>
  );
}
