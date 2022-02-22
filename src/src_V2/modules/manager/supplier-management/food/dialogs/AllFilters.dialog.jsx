import { AttachMoney } from '@mui/icons-material';
import {
  Autocomplete,
  Button,
  Checkbox,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';

import {
  FilterInitialValues,
  FoodFiltersSchema,
} from '../../../../../utils/schemas/tourManagment/food';
import {
  BootstrapDialog,
  BootstrapDialogTitle,
} from '../../components/bootstrapDialogTitle/BootstrapDialogTitle';
import { AllFiltersDialogStyles } from '../../transportation/dialogs/DialogStyles';
import { Languages } from '../constants';
import styles from './style.module.css';

export default function AllFiltersDialog({ onClose, data: { open } }) {
  const autoCompleteChangeHandler = (type) => (e, value) => setFieldValue(type, value);
  const formikData = {
    validationSchema: FoodFiltersSchema(),
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
          onClose={onClose}
          handleReset={handleReset}
          className={`${styles.container} ${styles.header}`}
        >
          Filters
        </BootstrapDialogTitle>
        <DialogContent dividers className={styles.container}>
          <Grid item xs={8}>
            <Autocomplete
              multiple
              options={Languages}
              value={values.menu}
              onChange={autoCompleteChangeHandler('menu')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name='menu'
                  label='Menu'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.menu}
                  error={errors.menu && touched.menu}
                  helperText={touched.menu && errors.menu}
                />
              )}
            />
          </Grid>
          <Grid container item xs={8} className={styles.priceBlock}>
            <Grid item xs={5}>
              <FormControl className={styles.priceInp}>
                <InputLabel>Price from</InputLabel>
                <OutlinedInput
                  placeholder='AMD'
                  name='priceFrom'
                  type='number'
                  startAdornment={
                    <InputAdornment position='start'>
                      <AttachMoney />
                    </InputAdornment>
                  }
                  label='Price from'
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
            <Grid item xs={5}>
              <FormControl className={styles.priceInp}>
                <InputLabel>Price to</InputLabel>
                <OutlinedInput
                  placeholder='AMD'
                  name='priceTo'
                  type='number'
                  startAdornment={
                    <InputAdornment position='start'>
                      <AttachMoney />
                    </InputAdornment>
                  }
                  label='Price to'
                  onBlur={handleBlur}
                  value={values.priceTo}
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
          <Grid className={styles.dashedBorder} />
          <Typography className={styles.roomTitle}>Working Hours</Typography>
          <Grid className={styles.workingHoursSection} item container spacing={3}>
            <Grid item xs={2.6}>
              <FormControlLabel
                control={<Checkbox name='gilad' />}
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
                name='checkOut'
                label='Check Out Time'
                value={values.checkOut}
                onChange={handleChange}
                inputProps={{ step: 60, min: 10 }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
          <Grid item container spacing={3}>
            <Grid item xs={2.6}>
              <FormControlLabel control={<Checkbox name='gilad' />} label='Weekend' />
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
                name='checkOut'
                label='Check Out Time'
                value={values.checkOut}
                onChange={handleChange}
                inputProps={{ step: 60, min: 10 }}
                InputLabelProps={{ shrink: true }}
              />
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
