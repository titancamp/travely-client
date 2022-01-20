import { useFormik } from 'formik';
import { Map } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Button,
  TextField,
  InputLabel,
  FormControl,
  Autocomplete,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
} from '@mui/material';
import { Person, Email } from '@mui/icons-material';

import DialogManager from '../dialogs/Index';
import { EndAdornment } from '../../components/endAdornment';
import {
  mainInfoSchema,
  mainInfoInitialValues,
} from '../../../../../utils/schemas/tourManagment/guide';

import styles from './style.module.css';
import { Regions } from '../../accommodation/constants';

export default function MainInfo({ parentRef, isValidate }) {
  const [dialogManagerState, onShowHideDialog] = useState({ open: false });
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

  function openMapDialog() {
    onShowHideDialog({
      open: true,
      mode: 'map',
    });
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
          <label className={styles.label}>Contacts</label>
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
                <InputLabel error={errors.phone && touched.phone}>
                  Contact Phone
                </InputLabel>
                <OutlinedInput
                  name='phone'
                  onBlur={handleBlur}
                  value={values.phone}
                  label='Contact Phone'
                  onChange={handleChange}
                  startAdornment={<>+374&nbsp;</>}
                  error={errors.phone && touched.phone}
                />
                {errors.phone && touched.phone && (
                  <FormHelperText error>{errors.phone}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth className={styles.ctField}>
                <InputLabel error={errors.email && touched.email}>
                  Contact Email
                </InputLabel>
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
          <label className={styles.label}>Cost</label>
          <Grid item xs={12} mb={3}>
            <TextField
              fullWidth
              name='price'
              type='number'
              variant='outlined'
              onBlur={handleBlur}
              value={values.price}
              error={!!errors.price}
              onChange={handleChange}
              label='Price Per Persons'
              helperText={errors.price}
              InputProps={{
                startAdornment: <InputAdornment position='start'>AMD ~</InputAdornment>,
              }}
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
