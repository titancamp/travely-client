import { Box, Grid, Button, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import { CloudUpload } from '@mui/icons-material';

import {
  partnershipSchema,
  partnershipInitialValues,
} from '../../../../../utils/schemas/tourManagment/accommodation';

import styles from './style.module.css';

//TODO handle the attachments functionality
//TODO read and implement FRD requirements

export default function Contact({ accommodation }) {
  const formikData = {
    validationSchema: partnershipSchema,
    initialValues: partnershipInitialValues(accommodation.partnership.values),
  };
  const initializeTouchState = () => setTouched({ ...accommodation.partnership.touched });
  const addPartnershipToAccommodation = () =>
    (accommodation.partnership = { values, isValid, touched });

  const { values, errors, touched, handleBlur, isValid, setTouched, handleChange } =
    useFormik(formikData);

  useEffect(initializeTouchState, []);
  useEffect(addPartnershipToAccommodation, [values, isValid, touched]);

  return (
    <Box>
      <Box className={styles.mnRow}>
        <label className={styles.label}>Details</label>
        <Grid container item xs={7} spacing={3}>
          <Grid item xs={4}>
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
            />
          </Grid>
          <Grid item xs={4}>
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
            />
          </Grid>
        </Grid>
      </Box>
      <Box className={styles.mnRow}>
        <label className={styles.label} />
        <Box className={styles.addAttachmentContainer}>
          <Button className={styles.addAttachment}>
            ADD ATTACHMENTS
            <CloudUpload />
          </Button>
        </Box>
      </Box>
      <Box className={styles.mnRow}>
        <label className={styles.label}>Margin</label>
        <Grid container item xs={7} spacing={3}>
          <Grid item xs={4}>
            <TextField
              fullWidth
              name='percentage'
              label='Percentage'
              placeholder='Percentage'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.percentage}
              error={errors.percentage && touched.percentage}
              helperText={touched.percentage && errors.percentage}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              name='price'
              label='Fixed Price'
              placeholder='Fixed Price'
              onBlur={handleBlur}
              value={values.price}
              onChange={handleChange}
              error={errors.price && touched.price}
              helperText={touched.price && errors.price}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
