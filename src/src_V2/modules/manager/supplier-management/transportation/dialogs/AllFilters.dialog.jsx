import { AirlineSeatReclineNormal, EventSeat } from '@mui/icons-material';
import {
  Autocomplete,
  Button,
  DialogActions,
  DialogContent,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';

import {
  FilterInitialValues,
  TransportationFiltersSchema,
} from '../../../../../utils/schemas/tourManagment/components';
import {
  BootstrapDialog,
  BootstrapDialogTitle,
} from '../../components/bootstrapDialogTitle/BootstrapDialogTitle';
import { EndAdornment } from '../../components/endAdornment';
import { Languages, License, TransportationTypes } from '../constants';
import { AllFiltersDialogStyles } from './DialogStyles';
import styles from './style.module.css';

export default function AllFiltersDialog({ onClose, data: { open } }) {
  const autoCompleteChangeHandler = (type) => (e, value) => setFieldValue(type, value);
  const formikData = {
    validationSchema: TransportationFiltersSchema(),
    initialValues: FilterInitialValues(),
  };

  const { values, errors, touched, handleBlur, handleChange, setFieldValue, setValues } =
    useFormik(formikData);

  const handleReset = () => {
    setValues(FilterInitialValues());
  };

  return (
    <form autoComplete='off'>
      <BootstrapDialog onClose={onClose} open={open} styles={AllFiltersDialogStyles}>
        <BootstrapDialogTitle
          handleReset={handleReset}
          onClose={onClose}
          className={`${styles.container} ${styles.header}`}
        >
          Filters
        </BootstrapDialogTitle>
        <DialogContent dividers className={styles.container}>
          <Grid item xs={4}>
            <Autocomplete
              className={styles.input}
              multiple
              options={License}
              value={values.license}
              onChange={autoCompleteChangeHandler('license')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name='license'
                  label='License Type'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={errors.license && touched.license}
                  helperText={touched.license && errors.license}
                />
              )}
            />
          </Grid>
          <Grid item xs={8}>
            <Autocomplete
              multiple
              options={Languages}
              value={values.languages}
              onChange={autoCompleteChangeHandler('languages')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name='languages'
                  label='Languages'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.languages}
                  error={errors.languages && touched.languages}
                  helperText={touched.languages && errors.languages}
                />
              )}
            />
          </Grid>
          <Grid className={styles.dashedBorder} />
          <Typography className={styles.roomTitle}>CARS</Typography>
          <Grid container item xs={12} spacing={3}>
            <Grid item xs={4} className={styles.select}>
              <Autocomplete
                onChange={handleChange}
                name='Car'
                disablePortal
                options={TransportationTypes}
                renderInput={(params) => <TextField {...params} label='Car' />}
                onBlur={handleBlur}
                value={values.car}
                error={errors.car && touched.car}
                helperText={touched.car && errors.car}
              />
            </Grid>
            <Grid item xs={4} className={styles.input}>
              <TextField
                fullWidth
                name='model'
                label='Model'
                placeholder='Plate Number'
                onBlur={handleBlur}
                value={values.model}
                onChange={handleChange}
                error={errors.model && touched.model}
                helperText={touched.model && errors.model}
              />
            </Grid>
          </Grid>
          <Grid container item xs={12} spacing={3}>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel error={errors.seats && touched.seats}>
                  Number of Seats
                </InputLabel>
                <OutlinedInput
                  name='seats'
                  onBlur={handleBlur}
                  value={values.seats}
                  label='Number of Seats'
                  onChange={handleChange}
                  error={errors.seats && touched.seats}
                  endAdornment={<EndAdornment icon={<EventSeat />} />}
                />
                {errors.seats && touched.seats && (
                  <FormHelperText error>{errors.seats}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel error={errors.carSeats && touched.carSeats}>
                  Number of Car Seats
                </InputLabel>
                <OutlinedInput
                  name='carSeats'
                  onBlur={handleBlur}
                  value={values.carSeats}
                  label='Number of Car Seats'
                  onChange={handleChange}
                  error={errors.carSeats && touched.carSeats}
                  endAdornment={<EndAdornment icon={<AirlineSeatReclineNormal />} />}
                />
                {errors.carSeats && touched.carSeats && (
                  <FormHelperText error>{errors.carSeats}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className={styles.container}>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onClose} type='submit' variant='contained'>
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </form>
  );
}
