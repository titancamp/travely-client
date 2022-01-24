import { useEffect } from 'react';
import { useFormik } from 'formik';
import { Box, Grid } from '@mui/material';

import TagsInput from '../../components/tag/Tag';
import { menuInitialValues } from '../../../../../utils/schemas/tourManagment/food';
import AddAttachment from '../../components/add-attachment/AddAttachment';

import styles from './style.module.css';

export default function Menu({ parentRef }) {
  const addMainInfoToParent = () => (parentRef.menu = { values, touched });
  const initializeTouchState = () => setTouched({ ...parentRef.menu.touched });

  const formik = useFormik({ initialValues: menuInitialValues(parentRef.menu.values) });
  const { values, errors, touched, setTouched, setFieldValue, setFieldError } = formik;

  useEffect(initializeTouchState, []);
  useEffect(addMainInfoToParent, [values, touched]);

  return (
    <Box>
      <Box className={styles.mnRow}>
        <label className={styles.label}>Details</label>
        <Grid container>
          <Grid item xs={5} mb={3}>
            <TagsInput
              fullWidth
              name='menuTags'
              label='Menu Tags'
              variant='outlined'
              placeholder='Add tags'
              tags={values.menuTags}
              error={errors.menuTags}
              setFieldValue={setFieldValue}
              setFieldError={setFieldError}
            />
          </Grid>
          <Grid item xs={12}>
            <AddAttachment formikRef={formik} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
