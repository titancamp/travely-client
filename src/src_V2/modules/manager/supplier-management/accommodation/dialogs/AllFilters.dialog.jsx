import { styled } from '@mui/material/styles';
import { useFormik } from 'formik';
import {
  Grid,
  Dialog,
  TextField,
  Typography,
  Autocomplete,
  DialogContent,
} from '@mui/material';
import styles from './style.module.css';
import { HotelServices, RoomServices, RoomTypes } from '../constants';
import {
  AccommodationFilterSchema,
  FilterInitialValues,
} from '../../../../../utils/schemas/tourManagment/accommodation';
import { BootstrapDialogTitle } from '../../components/bootstrapDialogTitle/BootstrapDialogTitle';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    maxWidth: 830,
    width: 830,
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    paddingTop: 30,
    paddingBottom: 50,
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function AllFiltersDialog({ onClose, data: { open } }) {
  const autoCompleteChangeHandler = (type) => (e, value) => setFieldValue(type, value);
  const formikData = {
    validationSchema: AccommodationFilterSchema(),
    initialValues: FilterInitialValues(),
  };

  const { values, errors, touched, handleBlur, handleChange, setFieldValue, setValues } =
    useFormik(formikData);

  const handleReset = () => {
    setValues({
      services: [],
      hotelServices: [],
      checkIn: '',
      checkOut: '',
      type: '',
      quantity: '',
      price: '',
      numberOfBeds: '',
      additionalBeds: '',
    });
  };

  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby='customized-dialog-title'
      open={open}
    >
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
              placeholder='Price'
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
      </DialogContent>
    </BootstrapDialog>
  );
}
