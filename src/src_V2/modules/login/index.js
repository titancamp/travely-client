import { Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AuthPageWrapper from '../../components/authWrapper/authPageWrapper';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import TextField from '../../components/FormUI/TextField';
import Button from '../../components/FormUI/Button';
import { useNavigate } from 'react-router-dom';
import PasswordField from '../../components/FormUI/PasswordField';

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email.').required('Required'),
  password: Yup.string().required('Required'),
});

export default function Login() {
  const navigate = useNavigate();

  const submitHandler = async (_, submitProps) => {
    await new Promise((res) => {
      setTimeout(res, 1000);
    });
    if (Math.random() > 0.5) {
      submitProps.setErrors({ email: ' ', password: 'Wrong email or password' });
    } else {
      navigate('/manager/dashboard');
    }
  };

  return (
    <AuthPageWrapper title={'Welcome to Travelly'}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        <Form>
          <TextField name={'email'} label={'Email'} type={'email'} />
          <PasswordField name={'password'} label={'Password'} />
          <Typography
            align={'right'}
            sx={{
              marginBottom: '20px',
              fontSize: '14px',
            }}
          >
            <Link component={RouterLink} to="/restorePassword">
              Forgot Password?
            </Link>
          </Typography>
          <Button>REGISTER</Button>
          <Typography
            sx={{
              marginTop: '20px',
              fontSize: '14px',
            }}
          >
            {"Don't have an account? "}
            <Link component={RouterLink} to="/signUp">
              {'Sign Up'}
            </Link>
          </Typography>
        </Form>
      </Formik>
    </AuthPageWrapper>
  );
}
