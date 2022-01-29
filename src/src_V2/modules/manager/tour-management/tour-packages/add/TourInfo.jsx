import { Autocomplete, Box, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik';

import { Statuses } from '../constants';
import styles from './style.module.css';

export default function TourInfo() {
  const { values, errors, touched, handleBlur, handleChange, setFieldValue } = useFormik({
    initialValues: {},
  });
  const autoCompleteChangeHandler = (type) => (e, value) => setFieldValue(type, value);

  return (
    <Box className={styles.tourInfo}>
      <form>
        <Box className={styles.mnRow}>
          <label className={styles.label}>Details</label>
          <Grid container rowSpacing={3} spacing={2} mb={3}>
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
              <Autocomplete
                value={values.status}
                options={Statuses}
                onChange={autoCompleteChangeHandler('status')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name='status'
                    label='Status'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={errors.status && touched.status}
                    helperText={touched.status && errors.v}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Box>
        <Box className={`${styles.mnRow} ${errors.notes ? '' : styles.helper}`}>
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
                FormHelperTextProps={{ className: styles.helper }}
              />
            </Grid>
          </Grid>
        </Box>
      </form>
    </Box>
  );
}
