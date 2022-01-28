import { Map } from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';

import {
  mainInfoInitialValues,
  mainInfoSchema,
} from '../../../../../utils/schemas/tourManagment/food';
import { Regions } from '../../accommodation/constants';
import { FoodTypes } from '../constant';
import styles from './style.module.css';

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

  const validateForm = () => isValidate && submitForm();
  const initializeTouchState = () => setTouched({ ...parentRef.mainInfo.touched });
  const autoCompleteChangeHandler = (type) => (e, value) => setFieldValue(type, value);
  const addMainInfoToParent = () => (parentRef.mainInfo = { values, isValid, touched });

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
                options={FoodTypes}
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
                onClick={() => ''}
                className={styles.map}
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
                  label='Working Days'
                  control={
                    <Checkbox
                      name='workingDays'
                      checked={values.workingDays}
                      onChange={handleChange}
                    />
                  }
                />
              </Grid>
              <Grid item xs={3.2}>
                <TextField
                  fullWidth
                  type='time'
                  label='Check In Time'
                  name='checkInWorkingDay'
                  onChange={handleChange}
                  disabled={!values.workingDays}
                  value={values.checkInWorkingDay}
                  inputProps={{ step: 60, min: 10 }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={3.2}>
                <TextField
                  fullWidth
                  type='time'
                  label='Check Out Time'
                  name='checkOutWorkingDay'
                  onChange={handleChange}
                  disabled={!values.workingDays}
                  value={values.checkOutWorkingDay}
                  inputProps={{ step: 60, min: 10 }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>{' '}
            <Grid item container spacing={3}>
              <Grid item xs={2.6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name='weekends'
                      onChange={handleChange}
                      checked={values.weekends}
                    />
                  }
                  label='Weekend'
                />
              </Grid>
              <Grid item xs={3.2}>
                <TextField
                  fullWidth
                  type='time'
                  name='checkInWeekend'
                  label='Check In Time'
                  onChange={handleChange}
                  value={values.checkInWeekend}
                  disabled={!values.weekends}
                  inputProps={{ step: 60, min: 10 }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={3.2}>
                <TextField
                  fullWidth
                  type='time'
                  name='checkOutWeekend'
                  label='Check Out Time'
                  onChange={handleChange}
                  disabled={!values.weekends}
                  value={values.checkOutWeekend}
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
              variant='outlined'
              onBlur={handleBlur}
              value={values.price}
              error={!!errors.price}
              onChange={handleChange}
              helperText={errors.price}
              label='~ Price per Persons'
            />
          </Grid>
        </Box>
        <Box className={`${styles.mnRow} ${errors.notes ? '' : styles.helper}`}>
          <label className={styles.label}>Notes</label>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                name='notes'
                label='Notes'
                onBlur={handleBlur}
                value={values.notes}
                error={!!errors.notes}
                onChange={handleChange}
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
