import { Button, TextField, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { Container } from '../../../components';
import { managerSidebarConfig } from '../config';
import * as Yup from 'yup';

import styles from './account.module.css';

const INITIAL_FORM_STATE = {
  name: '',
  position: '',
  email: '',
  phone: '',
};

const FORM_VALIDATION = Yup.object().shape({
  email: Yup.string().email('Invalid email.').required('Required'),
  position: Yup.string().max('256'),
  phone: Yup.number().min(8).max(8),
});

export default function Account() {
  return (
    <Container managerSidebarConfig={managerSidebarConfig}>
      <div className={styles['page-wrapper']}>
        <Typography variant="h6">My Account</Typography>
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
            <Button>Change Password</Button>
          </Form>
        </Formik>
      </div>
    </Container>
  );
}
