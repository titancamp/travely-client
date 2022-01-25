import { useFormik } from 'formik';
import { styled } from '@mui/material/styles';
import {
  Grid,
  Dialog,
  TextField,
  Autocomplete,
  DialogContent,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import styles from './style.module.css';
import { Languages } from '../constants';
import {
  FilterInitialValues,
  FoodFiltersSchema,
} from '../../../../../utils/schemas/tourManagment/food';
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
    validationSchema: FoodFiltersSchema(),
    initialValues: FilterInitialValues(),
  };

  const { values, errors, touched, handleBlur, handleChange, setFieldValue, setValues } =
    useFormik(formikData);

  const handleReset = () => {
    setValues({
      menu: [],
      checkIn: '',
    });
  };

  return (
    <form autoComplete='off'>
      <BootstrapDialog onClose={onClose} open={open}>
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
                name='checkIn'
                label='Check In Time'
                value={values.checkIn}
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
                name='checkIn'
                label='Check In Time'
                value={values.checkIn}
                onChange={handleChange}
                inputProps={{ step: 60, min: 10 }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </DialogContent>
      </BootstrapDialog>
    </form>
  );
}
