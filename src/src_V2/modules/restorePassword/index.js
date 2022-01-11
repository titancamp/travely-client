import { Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import AuthPageWrapper from '../../components/authWrapper/authPageWrapper';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import TextField from '../../components/FormUI/TextField';
import Button from '../../components/FormUI/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SetNewPassword from './SetNewPassword';

const initialValues = {
  email: '',
};

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email.').required('Required'),
});

export default function RestorePassword() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [done, setIsDone] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async () => {
    await new Promise((res) => {
      setTimeout(res, 1000);
    });
    setIsDone(true);
  };

  return params.get('token') ? (
    <SetNewPassword />
  ) : done ? (
    <div>DONE</div>
  ) : (
    <AuthPageWrapper title={'Restore Password'}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        <Form>
          <TextField name={'email'} label={'Email'} type={'email'} />
          <Button>SEND</Button>
          <Typography
            sx={{
              marginTop: '20px',
              fontSize: '14px',
              cursor: 'pointer',
            }}
            align={'center'}
            onClick={() => navigate(-1)}
          >
            &#8592; Back to Login
          </Typography>
        </Form>
      </Formik>
    </AuthPageWrapper>
  );
}
