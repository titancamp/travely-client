import { AttachMoney } from '@mui/icons-material';
import {
  Autocomplete,
  Button,
  DialogActions,
  DialogContent,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';

import {
  AccommodationFilterSchema,
  FilterInitialValues,
} from '../../../../../utils/schemas/tourManagment/accommodation';
import {
  BootstrapDialog,
  BootstrapDialogTitle,
} from '../../components/bootstrapDialogTitle/BootstrapDialogTitle';
import { AllFiltersDialogStyles } from '../../transportation/dialogs/DialogStyles';
import { HotelServices, RoomServices, RoomTypes } from '../constants';
import styles from './style.module.css';

export default function AllFiltersDialog({ onClose, data: { open } }) {
  const autoCompleteChangeHandler = (type) => (e, value) => setFieldValue(type, value);
  const formikData = {
    validationSchema: AccommodationFilterSchema(),
    initialValues: FilterInitialValues(),
  };

  const { values, errors, touched, handleBlur, handleChange, setFieldValue, setValues } =
    useFormik(formikData);

  const handleReset = () => {
    setValues(FilterInitialValues());
  };

  return (
    <BootstrapDialog onClose={onClose} open={open} styles={AllFiltersDialogStyles}>
      <BootstrapDialogTitle
        onClose={onClose}
        className={`${styles.container} ${styles.header}`}
        handleReset={handleReset}
      >
        Filters
      </BootstrapDialogTitle>
      <DialogContent dividers className={styles.container}>
        <Grid item xs={12}>
          <Autocomplete
            multiple
            options={RoomServices}
            value={values.services}
            onChange={autoCompleteChangeHandler('services')}
            renderInput={(params) => (
              <TextField
                {...params}
                name='services'
                label='Room Services'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.services}
                FormHelperTextProps={{
                  className: styles.helperText,
                }}
              />
            )}
          />
        </Grid>
        <Grid container item xs={6} spacing={2} className={styles.timeBlock}>
          <Grid item xs={6}>
            <FormControl className={styles.priceInp}>
              <InputLabel>Price from</InputLabel>
              <OutlinedInput
                name='priceFrom'
                type='number'
                startAdornment={
                  <InputAdornment position='start'>
                    <AttachMoney />
                  </InputAdornment>
                }
                label='Price from'
                placeholder='AMD'
                onBlur={handleBlur}
                value={values.priceFrom}
                onChange={handleChange}
                error={errors.priceFrom && touched.priceFrom}
                helperText={touched.priceFrom && errors.priceFrom}
                FormHelperTextProps={{
                  className: styles.helperText,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl className={styles.priceInp}>
              <InputLabel>Price to</InputLabel>
              <OutlinedInput
                name='priceTo'
                type='number'
                startAdornment={
                  <InputAdornment position='start'>
                    <AttachMoney />
                  </InputAdornment>
                }
                label='Price to'
                placeholder='AMD'
                onBlur={handleBlur}
                value={values.priceFrom}
                onChange={handleChange}
                error={errors.priceTo && touched.priceTo}
                helperText={touched.priceTo && errors.priceTo}
                FormHelperTextProps={{
                  className: styles.helperText,
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container item xs={6} spacing={2} className={styles.timeBlock}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type='time'
              defaultValue='00:00'
              label='Check In Time'
              inputProps={{ step: 300 }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type='time'
              defaultValue='00:00'
              hiddenLabel={true}
              label='Check In Time'
              inputProps={{ step: 300 }}
            />
          </Grid>
        </Grid>
        <Grid className={styles.dashedBorder} />
        <Typography className={styles.roomTitle}>ROOMS</Typography>
        <Grid container spacing={2} rowSpacing={3}>
          <Grid item xs={4}>
            <Autocomplete
              onChange={handleChange}
              name='type'
              className={styles.roomType}
              disablePortal
              options={RoomTypes}
              renderInput={(params) => <TextField {...params} label='Type*' />}
              onBlur={handleBlur}
              value={values.type}
              error={errors.type && touched.type}
              helperText={touched.type && errors.type}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              type='number'
              name='quantity'
              label='Quantity'
              placeholder='Quantity'
              onBlur={handleBlur}
              value={values.quantity}
              onChange={handleChange}
              error={errors.quantity && touched.quantity}
              helperText={touched.quantity && errors.quantity}
              FormHelperTextProps={{
                className: styles.helperText,
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              name='price'
              type='number'
              label='Price'
              placeholder='AMD'
              onBlur={handleBlur}
              value={values.price}
              onChange={handleChange}
              error={errors.price && touched.price}
              helperText={touched.price && errors.price}
              FormHelperTextProps={{
                className: styles.helperText,
              }}
            />
          </Grid>
          <Grid item container xs={8}>
            <Grid item xs={4}>
              <TextField
                className={styles.numberOfBeds}
                name='beds'
                type='number'
                label='Number of Beds'
                placeholder='Number of Beds'
                onBlur={handleBlur}
                value={values.numberOfBeds}
                onChange={handleChange}
                error={errors.numberOfBeds && touched.numberOfBeds}
                helperText={touched.numberOfBeds && errors.numberOfBeds}
                FormHelperTextProps={{
                  className: styles.helperText,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name='additionalBeds'
                type='number'
                label='Additional Beds'
                placeholder='Additional Beds'
                onBlur={handleBlur}
                value={values.numberOfBeds}
                onChange={handleChange}
                error={errors.additionalBeds && touched.additionalBeds}
                helperText={touched.additionalBeds && errors.additionalBeds}
                FormHelperTextProps={{
                  className: styles.helperText,
                }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              options={HotelServices}
              value={values.hotelServices}
              onChange={autoCompleteChangeHandler('hotelServices')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name='hotelServices'
                  label='Hotel Services'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.hotelServices}
                  FormHelperTextProps={{
                    className: styles.helperText,
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
        <div className={styles.actions}></div>
      </DialogContent>
      <DialogActions className={styles.container}>
        <Button onClick={onClose}>Cancel</Button>
        <Button type='submit' variant='contained'>
          Save
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
