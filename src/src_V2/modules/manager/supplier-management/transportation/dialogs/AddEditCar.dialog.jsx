import { AirlineSeatReclineNormal, ColorLens, EventSeat } from '@mui/icons-material';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';

import {
  AddCarInitialValues,
  addCarSchema,
} from '../../../../../utils/schemas/tourManagment/transportation';
import { EndAdornment } from '../../components/endAdornment';
import styles from './style.module.css';

export default function AddEditCarDialog({ onClose, onSuccess, car, editMode }) {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    onSubmit: onSuccess,
    validationSchema: addCarSchema(),
    initialValues: AddCarInitialValues(car),
  });

  return (
    <form onSubmit={handleSubmit} autoComplete='off'>
      <DialogTitle id='alert-dialog-title'>{editMode ? 'Edit' : 'Add'} Car</DialogTitle>
      <DialogContent className={styles.viewTitle}>
        <Grid container spacing={2} rowSpacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name='model'
              label='Model'
              placeholder='Model'
              onBlur={handleBlur}
              value={values.model}
              onChange={handleChange}
              error={errors.model && touched.model}
              helperText={touched.model && errors.model}
            />
          </Grid>
          <Grid container item xs={12} spacing={3}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel error={errors.color && touched.color}>Color</InputLabel>
                <OutlinedInput
                  name='color'
                  onBlur={handleBlur}
                  value={values.color}
                  label='Color'
                  onChange={handleChange}
                  error={errors.color && touched.color}
                  endAdornment={<EndAdornment icon={<ColorLens />} />}
                />
                {errors.color && touched.color && (
                  <FormHelperText error>{errors.color}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name='plate'
                label='Plate Number'
                placeholder='Plate Number'
                onBlur={handleBlur}
                value={values.plate}
                onChange={handleChange}
                error={errors.plate && touched.plate}
                helperText={touched.plate && errors.plate}
              />
            </Grid>
          </Grid>
          <Grid container item xs={12} spacing={3}>
            <Grid item xs={6}>
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
            <Grid item xs={6}>
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
        </Grid>
      </DialogContent>
      <DialogActions className={styles.dialogAction}>
        <Button onClick={onClose}>Cancel</Button>
        <Button type='submit' variant='contained'>
          {editMode ? 'Edit' : 'Add'}
        </Button>
      </DialogActions>
    </form>
  );
}
