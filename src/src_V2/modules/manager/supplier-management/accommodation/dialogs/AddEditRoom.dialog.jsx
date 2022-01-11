import { useFormik } from 'formik';
import {
  Grid,
  Button,
  TextField,
  DialogTitle,
  Autocomplete,
  DialogActions,
  DialogContent,
} from '@mui/material';

import {
  addRoomSchema,
  AddRoomInitialValues,
} from '../../../../../utils/schemas/tourManagment/accommodation';
import { RoomTypes, RoomServices } from '../constants';
import styles from './style.module.css';

export default function AddEditRoomDialog({ onClose, onSuccess, room, editMode }) {
  const autoCompleteChangeHandler = (type) => (e, value) => setFieldValue(type, value);

  const formikData = {
    onSubmit: onSuccess,
    validationSchema: addRoomSchema(),
    initialValues: AddRoomInitialValues(room),
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    setFieldValue,
    handleSubmit,
  } = useFormik(formikData);

  return (
    <form onSubmit={handleSubmit} autoComplete='off'>
      <DialogTitle id='alert-dialog-title'>{editMode ? 'Edit' : 'Add'} Room</DialogTitle>
      <DialogContent className={styles.viewTitle}>
        <Grid container spacing={2} rowSpacing={3}>
          <Grid item xs={6}>
            <Autocomplete
              options={RoomTypes}
              value={values.type}
              onChange={autoCompleteChangeHandler('type')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name='type'
                  label='Type*'
                  value={values.type}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={errors.type && touched.type}
                  helperText={touched.type && errors.type}
                />
              )}
            />
          </Grid>
          <Grid item xs={3}>
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
              disabled={!values.quantity}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              name='beds'
              type='number'
              autoComplete='off'
              label='Number of Beds'
              placeholder='Number of Beds'
              onBlur={handleBlur}
              value={values.beds}
              onChange={handleChange}
              error={errors.beds && touched.beds}
              helperText={touched.beds && errors.beds}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              type='number'
              name='additionalBeds'
              label='Additional Beds'
              placeholder='Additional Beds'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.additionalBeds}
              error={errors.additionalBeds && touched.additionalBeds}
              helperText={touched.additionalBeds && errors.additionalBeds}
            />
          </Grid>
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
                />
              )}
            />
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
