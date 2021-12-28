import { useFormik } from 'formik';
import { Map } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { Box, TextField, Autocomplete, Grid, Button } from '@mui/material';

import DialogManager from '../dialogs/Index';
import { AccommodationTypes, HotelServices } from '../constants';
import {
  mainInfoSchema,
  mainInfoInitialValues,
} from '../../../../../utils/schemas/tourManagment/accommodation';

import styles from './style.module.css';

export default function MainInfo({ accommodation }) {
  const [dialogManagerState, onShowHideDialog] = useState({ open: false });
  const formikData = {
    validationSchema: mainInfoSchema,
    initialValues: mainInfoInitialValues(accommodation.mainInfo.values),
  };

  const autoCompleteChangeHandler = (type) => (e, value) => setFieldValue(type, value);
  const initializeTouchState = () => setTouched({ ...accommodation.mainInfo.touched });
  const addMainInfoToAccommodation = () =>
    (accommodation.mainInfo = { values, isValid, touched });

  const {
    values,
    errors,
    touched,
    isValid,
    handleBlur,
    setTouched,
    handleChange,
    setFieldValue,
  } = useFormik(formikData);

  function openMapDialog() {
    onShowHideDialog({
      open: true,
      mode: 'map',
    });
  }

  useEffect(initializeTouchState, []);
  useEffect(addMainInfoToAccommodation, [values, isValid, touched]);

  return (
    <Box className={styles.mainInfo}>
      <form>
        <Box className={styles.mnRow}>
          <label className={styles.label}>Details</label>
          <Grid container rowSpacing={3} spacing={2}>
            <Grid item xs={6}>
              <Autocomplete
                value={values.type}
                options={AccommodationTypes}
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
            <Grid container item xs={6} mb={3} spacing={2} rowSpacing={3}>
              <Grid item xs={6}>
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
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type='time'
                  name='checkOut'
                  label='Check Out Time'
                  value={values.checkOut}
                  onChange={handleChange}
                  inputProps={{ step: 60 }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box className={styles.mnRow}>
          <label className={styles.label}>Address</label>
          <Grid container mb={3} rowSpacing={3} spacing={2}>
            <Grid item xs={12}>
              <Button
                className={styles.map}
                onClick={openMapDialog}
                startIcon={<Map color='primary' />}
              >
                PIN ON MAP
              </Button>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name='region'
                label='Region'
                placeholder='Region'
                onBlur={handleBlur}
                value={values.region}
                onChange={handleChange}
                error={errors.region && touched.region}
                helperText={touched.region && errors.region}
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
            <Grid item xs={12}>
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
          <label className={styles.label}>Services</label>
          <Grid container mb={3} spacing={2}>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={HotelServices}
                value={values.services}
                onChange={autoCompleteChangeHandler('services')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name='services'
                    label='Hotel Services'
                    value={values.services}
                    onChange={handleChange}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Box>
        <Box className={styles.mnRow}>
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
              />
            </Grid>
          </Grid>
        </Box>
      </form>
      <DialogManager data={dialogManagerState} onShowHideDialog={onShowHideDialog} />
    </Box>
  );
}
