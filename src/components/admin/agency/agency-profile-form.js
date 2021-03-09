import React, { useRef, useCallback } from 'react';
import { Grid, TextField, Button, Box, Divider } from '@material-ui/core';
import { Formik } from 'formik';
import * as yup from 'yup';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import LogoUpload from '../agency/logo-upload'


const AgencyProfileSchema = yup.object().shape({
  phone: yup.number()
    .typeError('Phone must be a number')
    .required('Required')
});

export default function AgencyProfileForm() {
  const logoInput = useRef(null);
  const logoFormik = useRef(null);

  function handleBrowseLogoClick() {
    logoInput.current.click();
  }

  const logoInputChangeCallback = useCallback(
    (event) => {
      logoFormik.current.setFieldValue('file', event.currentTarget.files[0]);
    },
    []
  );

  const logoUploadMemoizedCallback = useCallback(
    ({ values }) => (
      <Box>
        <input type='file' ref={logoInput} onChange={logoInputChangeCallback} hidden />
        <Button fullWidth variant='outlined' onClick={handleBrowseLogoClick}>
          <ImageOutlinedIcon color='primary' fontSize='small' /> Browse and select logo
        </Button>
        <Divider />
        <LogoUpload file={values.file} />
      </Box>
    ), [logoInput, logoInputChangeCallback]
  );

  return (
    <Grid container
      spacing={0}
      direction='row'
      alignItems='center'
      justify='center'>
      <Formik
        initialValues={{ address: '', phone: '' }}
        validationSchema={ AgencyProfileSchema }
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
            <Grid item xs={4}>
              <form onSubmit={handleSubmit}>
                <Box m={2}>
                  <TextField
                    type='text'
                    name='address'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    label='Address'
                    variant='outlined'
                    size='small'
                    fullWidth
                  />
                  <Box color='error.main'>{errors.address && touched.address && errors.address}</Box>
                </Box>

                <Box m={2}>
                  <TextField
                    type='tel'
                    name='phone'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone}
                    label='Phone'
                    variant='outlined'
                    size='small'
                    fullWidth
                  />
                  <Box color='error.main'>{errors.phone && touched.phone && errors.phone}</Box>
                </Box>

                <Box m={2}>
                  <Formik
                    innerRef={logoFormik}
                    initialValues={{ file: null }}>
                    {logoUploadMemoizedCallback}
                  </Formik>
                </Box>

                <Box m={2}>
                  <Button type='submit' disabled={isSubmitting} variant='contained' color='primary' fullWidth>
                    Update profile
                  </Button>
                </Box>
              </form>
            </Grid>
          )}
      </Formik>
    </Grid>
  );
};