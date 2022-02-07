import { Box, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';

import {
  partnershipInitialValues,
  partnershipSchema,
} from '../../../../../utils/schemas/tourManagment/components';
import AddAttachment from '../add-attachment/AddAttachment';
import styles from './style.module.css';

export default function Partnership({ parentRef }) {
  const formik = useFormik({
    validationSchema: partnershipSchema,
    initialValues: partnershipInitialValues(parentRef.partnership.values),
  });
  const { values, errors, touched, isValid, handleBlur, setTouched, handleChange } =
    formik;

  const initializeTouchState = () => setTouched({ ...parentRef.partnership.touched });
  const addPartnershipToAccommodation = () =>
    (parentRef.partnership = { values, isValid, touched });

  useEffect(initializeTouchState, []);
  useEffect(addPartnershipToAccommodation, [values, isValid, touched]);

  return (
    <Box className={styles.partnership}>
      <Box className={styles.mnRow}>
        <label className={styles.label}>Details</label>
        <Grid container spacing={3}>
          <Grid item xs={2.5}>
            <TextField
              fullWidth
              type='date'
              name='signInDate'
              label='Sign Date'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.signInDate}
              InputLabelProps={{ shrink: true }}
              error={errors.signInDate && touched.signInDate}
              helperText={touched.signInDate && errors.signInDate}
              inputProps={{ ...(values.expiryDate && { max: values.expiryDate }) }}
            />
          </Grid>
          <Grid item xs={2.5}>
            <TextField
              fullWidth
              type='date'
              name='expiryDate'
              label='Expiry Date'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.expiryDate}
              InputLabelProps={{ shrink: true }}
              error={errors.expiryDate && touched.expiryDate}
              helperText={touched.expiryDate && errors.expiryDate}
              inputProps={{ ...(values.signInDate && { min: values.signInDate }) }}
            />
          </Grid>
          <Grid item container mb={2}>
            <AddAttachment formikRef={formik} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
