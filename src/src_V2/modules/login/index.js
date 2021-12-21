import { Box, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import loginIllustration from '../../assets/login_illustration.svg';
import logo from '../../assets/Travely.png';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

import TextField from '../../components/FormUI/TextField';
import Button from '../../components/FormUI/Button';

const INITIAL_FORM_STATE = {
  email: '',
  password: '',
};

const FORM_VALIDATION = Yup.object().shape({
  email: Yup.string().email('Invalid email.').required('Required'),
  password: Yup.string().required('Required'),
});

export default function Login() {
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          width: '45%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'rgba(0, 0, 0, 0.04)',
        }}
      >
        <Box sx={{ position: 'absolute', top: 50, left: 50 }}>
          <img src={logo} width="160" alt="" />
        </Box>
        <img style={{ maxWidth: '80%' }} src={loginIllustration} alt="" />
      </Box>
      <Box
        sx={{
          width: '55%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box sx={{ width: 386, border: '1px solid #000' }}>
          <Formik
            initialValues={{
              ...INITIAL_FORM_STATE,
            }}
            validationSchema={FORM_VALIDATION}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            <Form>
              <TextField
                name={'email'}
                label={'Email'}
                inputProps={{
                  type: 'email',
                }}
              />
              <TextField
                name={'password'}
                label={'Password'}
                inputProps={{
                  type: 'password',
                }}
              />
              <Typography align="right">
                <Link to="/restorePassword">Forgot Password?</Link>
              </Typography>
              <Button>REGISTER</Button>
            </Form>
          </Formik>
        </Box>
      </Box>
    </Box>
  );
}
