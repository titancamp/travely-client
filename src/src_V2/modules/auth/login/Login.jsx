import { Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AuthPageWrapper from '../../../components/authWrapper/authPageWrapper';
import { Formik, Form } from 'formik';
import TextField from '../../../components/formUI/TextField';
import Button from '../../../components/formUI/Button';
import { useNavigate } from 'react-router-dom';
import PasswordField from '../../../components/formUI/PasswordField';
import {
  LoginInitialValues,
  loginPasswordSchema,
} from '../../../utils/schemas/auth/auth';
import styles from './Login.module.css';
import { ROUTES } from '../../../app/routes';

export default function Login() {
  const navigate = useNavigate();

  const submitHandler = async (_, submitProps) => {
    await new Promise((res) => {
      setTimeout(res, 1000);
    });
    if (Math.random() > 0.5) {
      submitProps.setErrors({ email: ' ', password: 'Password Error' });
    } else {
      navigate('/manager/dashboard');
    }
  };

  return (
    <AuthPageWrapper title='Welcome to Travelly'>
      <Formik
        initialValues={LoginInitialValues()}
        validationSchema={loginPasswordSchema()}
        onSubmit={submitHandler}
      >
        <Form>
          <TextField name='email' label='Email' type='email' />
          <PasswordField name='password' label='Password' />
          <Typography align='right' className={styles.forgotPassword}>
            <Link
              color='inherit'
              variant='body2'
              underline='none'
              component={RouterLink}
              to={ROUTES.RESTORE_PASSWORD}
            >
              Forgot Password?
            </Link>
          </Typography>
          <Button>LOGIN</Button>
          <Typography>
            {"Don't have an account? "}
            <Link component={RouterLink} to={ROUTES.REGISTER_AGENCY}>
              {'Sign Up'}
            </Link>
          </Typography>
        </Form>
      </Formik>
    </AuthPageWrapper>
  );
}
