import {
  Box,
  InputLabel,
  FormControl,
  OutlinedInput,
  FormHelperText,
} from '@mui/material';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import { Person, LocalPhone, Email } from '@mui/icons-material';

import { EndAdornment } from '../../components/endAdornment';
import {
  contactSchema,
  contactInitialValues,
} from '../../../../../utils/schemas/tourManagment/accommodation';

import styles from './style.module.css';

export default function Contact({ accommodation }) {
  const formikData = {
    validationSchema: contactSchema,
    initialValues: contactInitialValues(accommodation.contact.values),
  };
  const initializeTouchState = () => setTouched({ ...accommodation.contact.touched });
  const addContactAccommodation = () =>
    (accommodation.contact = { values, isValid, touched });

  const { values, errors, touched, isValid, handleBlur, setTouched, handleChange } =
    useFormik(formikData);

  useEffect(initializeTouchState, []);
  useEffect(addContactAccommodation, [values, isValid, touched]);

  return (
    <form>
      <Box className={styles.mnRow}>
        <label className={styles.label}>Details</label>
        <Box>
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
        </Box>
      </Box>
    </form>
  );
}
