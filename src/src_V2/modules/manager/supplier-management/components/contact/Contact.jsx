import {
  Box,
  Grid,
  InputLabel,
  FormControl,
  OutlinedInput,
  FormHelperText,
} from '@mui/material';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import { Person, LocalPhone, Email } from '@mui/icons-material';

import { EndAdornment } from '../endAdornment';
import {
  contactSchema,
  contactInitialValues,
} from '../../../../../utils/schemas/tourManagment/components';

import styles from './style.module.css';

export default function Contact({ parentRef }) {
  const formikData = {
    validationSchema: contactSchema,
    initialValues: contactInitialValues(parentRef.contact.values),
  };
  const initializeTouchState = () => setTouched({ ...parentRef.contact.touched });
  const addContactAccommodation = () =>
    (parentRef.contact = { values, isValid, touched });

  const { values, errors, touched, isValid, handleBlur, setTouched, handleChange } =
    useFormik(formikData);

  useEffect(initializeTouchState, []);
  useEffect(addContactAccommodation, [values, isValid, touched]);

  return (
    <form>
      <Box className={styles.mnRow}>
        <label className={styles.label}>Details</label>
        <Grid container>
          <Grid item xs={12}>
            <FormControl fullWidth className={styles.ctField}>
              <InputLabel error={errors.person && touched.person}>
                Contact Person
              </InputLabel>
              <OutlinedInput
                name='person'
                onBlur={handleBlur}
                value={values.person}
                label='Contact Person'
                onChange={handleChange}
                error={errors.person && touched.person}
                endAdornment={<EndAdornment icon={<Person />} />}
              />
              {touched.person && errors.person && (
                <FormHelperText error>{errors.person}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth className={styles.ctField}>
              <InputLabel error={errors.phone && touched.phone}>Contact Phone</InputLabel>
              <OutlinedInput
                name='phone'
                onBlur={handleBlur}
                value={values.phone}
                label='Contact Phone'
                onChange={handleChange}
                error={errors.phone && touched.phone}
                endAdornment={<EndAdornment icon={<LocalPhone />} />}
              />
              {errors.phone && touched.phone && (
                <FormHelperText error>{errors.phone}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth className={styles.ctField}>
              <InputLabel error={errors.email && touched.email}>Contact Email</InputLabel>
              <OutlinedInput
                name='email'
                onBlur={handleBlur}
                value={values.email}
                label='Contact Email'
                onChange={handleChange}
                error={errors.email && touched.email}
                endAdornment={<EndAdornment icon={<Email />} />}
              />
              {errors.email && touched.email && (
                <FormHelperText error>{errors.email}</FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}
