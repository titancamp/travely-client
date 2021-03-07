import React, {useRef, useCallback}  from 'react';
import { makeStyles } from '@material-ui/core/styles'; 
import { Grid, TextField, Button, Box } from '@material-ui/core';
import { Formik } from 'formik';
import * as yup from 'yup';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import LogoUpload from '../agency/logo-upload'


const AgencyProfileSchema = yup.object().shape({
  phone: yup.string()
     .required('Required')
     .matches(
      /^[+]{1}374{1}[0-9]{8}$/,
      'Country calling code is +374 followed by 8 digits.'
    )
});

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '50ch'
    },
  },
  btn: {
    textTransform: 'none',
    width: '100%',
    marginBottom: '3%'
  }
}));
 
 export default function AgencyProfileForm() {
  const classes = useStyles();

  const logoInput = useRef(null);
  const logoFormik = useRef(null);

  function handleBrowseLogoClick() {
    logoInput.current.click();
  }

  const logoInputChangeCallback = useCallback(
    (event) => {
      logoFormik.current.setFieldValue('file', event.currentTarget.files[0]); },
      []
  );

  const logoUploadMemoizedCallback = useCallback(
    ({ values }) =>(
      <Box>
      <input type='file' ref={logoInput} className={classes.btn} onChange={logoInputChangeCallback} hidden />
            <Button className={classes.btn} variant='outlined' onClick={handleBrowseLogoClick}>
              <ImageOutlinedIcon color='primary' fontSize='small' /> Browse and select logo
            </Button>
          <LogoUpload file={values.file} />
    </Box> 
    ), [logoInput, classes.btn, logoInputChangeCallback]
  );

  return (
   <Grid container
          spacing={0}
          direction='column'
          alignItems='center'
          justify='center'
          style={{ minHeight: '30vh' }}>
     <Formik
       initialValues={{ address: '', phone: '' }}
       validationSchema = { AgencyProfileSchema }
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
         <form className={classes.root} onSubmit={handleSubmit}>
           <TextField
             type='text'
             name='address'
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.email}
             label='Address' 
             variant='outlined' 
             size ='small'
           />
           <Box color='error.main'>{errors.address && touched.address && errors.address}</Box>
           <TextField
             type='tel'
             name='phone'
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.phone}
             label='Phone' 
             variant='outlined' 
             size ='small'
           />
           <Box color='error.main'>{errors.phone && touched.phone && errors.phone}</Box>
           
           <Formik 
            innerRef={logoFormik}
            initialValues={{ file: null }}>
              {logoUploadMemoizedCallback}
            </Formik>
           <Button type='submit' disabled={isSubmitting} variant='contained' color='primary'>
             Update profile
           </Button>
         </form>
        </Grid>
       )}
     </Formik>
   </Grid> 
   );
 };