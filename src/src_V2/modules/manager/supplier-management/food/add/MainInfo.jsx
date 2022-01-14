import {
  Box,
  Grid,
  Button,
  Checkbox,
  TextField,
  Autocomplete,
  FormControlLabel,
} from '@mui/material';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import { Map } from '@mui/icons-material';

import {
  mainInfoSchema,
  mainInfoInitialValues,
} from '../../../../../utils/schemas/tourManagment/transportation';

import styles from './style.module.css';
import { Regions } from '../../accommodation/constants';

export default function MainInfo({ parentRef, isValidate }) {
  const {
    values,
    errors,
    touched,
    isValid,
    handleBlur,
    setTouched,
    submitForm,
    handleChange,
    setFieldValue,
  } = useFormik({
    validationSchema: mainInfoSchema,
    initialValues: mainInfoInitialValues(parentRef.mainInfo.values),
  });

  const initializeTouchState = () => setTouched({ ...parentRef.mainInfo.touched });
  const autoCompleteChangeHandler = (type) => (e, value) => setFieldValue(type, value);
  const addMainInfoToParent = () => (parentRef.mainInfo = { values, isValid, touched });

  function validateForm() {
    if (isValidate) {
      submitForm();
    }
  }

  useEffect(initializeTouchState, []);
  useEffect(validateForm, [isValidate]);
  useEffect(addMainInfoToParent, [values, isValid, touched]);

  return (
    <Box className={styles.mainInfo}>
      <form>
        <Box className={styles.mnRow}>
          <label className={styles.label}>Details</label>
          <Grid container rowSpacing={3} spacing={2} mb={3}>
            <Grid item xs={6}>
              <Autocomplete
                value={values.type}
                options={[]}
                onChange={autoCompleteChangeHandler('type')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name='type'
                    label='Type*'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={errors.type && touched.type}
                    helperText={touched.type && errors.type}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name='name'
                label='Name*'
                placeholder='Name*'
                value={values.name}
                onBlur={handleBlur}
                onChange={handleChange}
                error={errors.name && touched.name}
                helperText={touched.name && errors.name}
              />
            </Grid>
          </Grid>
        </Box>
        <Box className={styles.mnRow}>
          <label className={styles.label}>Address</label>
          <Grid container mb={3} rowSpacing={3} spacing={2}>
            <Grid item xs={12}>
              <Button
                className={styles.map}
                onClick={() => ''}
                startIcon={<Map color='primary' />}
              >
                PIN ON MAP
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                options={Regions}
                value={values.region}
                onChange={autoCompleteChangeHandler('region')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name='region'
                    label='Region'
                    value={values.region}
                    onChange={handleChange}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name='city'
                label='City'
                placeholder='City'
                value={values.city}
                onBlur={handleBlur}
                onChange={handleChange}
                error={errors.city && touched.city}
                helperText={touched.city && errors.city}
              />
            </Grid>
            <Grid item xs={12} mb={3}>
              <TextField
                fullWidth
                name='address'
                label='Address'
                placeholder='Address'
                onBlur={handleBlur}
                value={values.address}
                onChange={handleChange}
                error={errors.address && touched.address}
                helperText={touched.address && errors.address}
              />
            </Grid>
          </Grid>
        </Box>
        <Box className={styles.mnRow}>
          <label className={styles.label}>Working Hours</label>
          <Grid container mb={3} rowSpacing={3} spacing={2}>
            <Grid item container spacing={3}>
              <Grid item xs={2.6}>
                <FormControlLabel
                  control={
                    <Checkbox checked={true} onChange={handleChange} name='gilad' />
                  }
                  label='Working Days'
                />
              </Grid>
              <Grid item xs={3.2}>
                <TextField
                  fullWidth
                  type='time'
                  name='checkIn'
                  label='Check In Time'
                  value={values.checkIn}
                  onChange={handleChange}
                  inputProps={{ step: 60, min: 10 }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={3.2}>
                <TextField
                  fullWidth
                  type='time'
                  name='checkIn'
                  label='Check In Time'
                  value={values.checkIn}
                  onChange={handleChange}
                  inputProps={{ step: 60, min: 10 }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>{' '}
            <Grid item container spacing={3}>
              <Grid item xs={2.6}>
                <FormControlLabel
                  control={
                    <Checkbox checked={true} onChange={handleChange} name='gilad' />
                  }
                  label='Weekend'
                />
              </Grid>
              <Grid item xs={3.2}>
                <TextField
                  fullWidth
                  type='time'
                  name='checkIn'
                  label='Check In Time'
                  value={values.checkIn}
                  onChange={handleChange}
                  inputProps={{ step: 60, min: 10 }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={3.2}>
                <TextField
                  fullWidth
                  type='time'
                  name='checkIn'
                  label='Check In Time'
                  value={values.checkIn}
                  onChange={handleChange}
                  inputProps={{ step: 60, min: 10 }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box className={styles.mnRow}>
          <label className={styles.label}>Cost</label>
          <Grid item xs={12} mb={3}>
            <TextField
              fullWidth
              name='price'
              type='number'
              variant='outlined'
              onBlur={handleBlur}
              value={values.notes}
              error={!!errors.notes}
              onChange={handleChange}
              label='Price Per Persons'
              helperText={errors.notes}
            />
          </Grid>
        </Box>
        <Box className={`${styles.mnRow} ${errors.notes ? '' : styles.helper}`}>
          <label className={styles.label}>Notes</label>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextField
                rows={4}
                fullWidth
                multiline
                name='notes'
                label='Notes'
                onBlur={handleBlur}
                value={values.notes}
                onChange={handleChange}
                error={!!errors.notes}
                helperText={errors.notes}
                FormHelperTextProps={{ className: styles.helper }}
              />
            </Grid>
          </Grid>
        </Box>
      </form>
    </Box>
  );
}
