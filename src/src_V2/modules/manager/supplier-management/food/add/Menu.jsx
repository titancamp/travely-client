import { useEffect } from 'react';
import { useFormik } from 'formik';
import { Box, Grid, Autocomplete, TextField } from '@mui/material';

import styles from './style.module.css';
import { Languages } from '../../transportation/constants';
import { menuInitialValues } from '../../../../../utils/schemas/tourManagment/food';
import AddAttachment from '../../components/add-attachment/AddAttachment';

export default function Guides({ parentRef }) {
  const autoCompleteChangeHandler = (type) => (e, value) => setFieldValue(type, value);
  const addMainInfoToParent = () => (parentRef.mainInfo = { values, touched });
  const initializeTouchState = () => setTouched({ ...parentRef.mainInfo.touched });

  const formik = useFormik({ initialValues: menuInitialValues(parentRef.menu.values) });
  const { values, errors, touched, handleBlur, handleChange, setFieldValue, setTouched } =
    formik;

  useEffect(initializeTouchState, []);
  useEffect(addMainInfoToParent, [values, touched]);

  return (
    <Box>
      <Box className={styles.mnRow}>
        <label className={styles.label}>Details</label>
        <Grid container>
          <Grid item xs={5} mb={3}>
            <Autocomplete
              multiple
              options={Languages}
              value={values.menuTags}
              onChange={autoCompleteChangeHandler('menuTags')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name='menuTags'
                  label='Guides Tags'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.menuTags}
                  error={errors.menuTags && touched.menuTags}
                  helperText={touched.menuTags && errors.menuTags}
                />
              )}
            />
          </Grid>
          <Box className={styles.mnRow}>
            <AddAttachment formikRef={formik} />
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
