import { useFormik } from 'formik';
import { CloudUpload } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import { Box, Grid, Button, TextField, Chip, FormHelperText } from '@mui/material';

import {
  partnershipSchema,
  partnershipInitialValues,
} from '../../../../../utils/schemas/tourManagment/accommodation';

import styles from './style.module.css';

export default function Contact({ accommodation }) {
  const formik = useFormik({
    validationSchema: partnershipSchema,
    initialValues: partnershipInitialValues(accommodation.partnership.values),
  });
  const { values, errors, touched, isValid, handleBlur, setTouched, handleChange } =
    formik;

  const initializeTouchState = () => setTouched({ ...accommodation.partnership.touched });
  const addPartnershipToAccommodation = () =>
    (accommodation.partnership = { values, isValid, touched });

  useEffect(initializeTouchState, []);
  useEffect(addPartnershipToAccommodation, [values, isValid, touched]);

  return (
    <Box className={styles.partnership}>
      <Box className={styles.mnRow}>
        <label className={styles.label}>Details</label>
        <Grid container item xs={9} spacing={3}>
          <Grid item xs={3}>
            <TextField
              fullWidth
              type='date'
              name='signInDate'
              label='Sign Date'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.signInDate}
              InputLabelProps={{ shrink: true }}
              error={errors.signInDate && touched.signInDate}
              helperText={touched.signInDate && errors.signInDate}
              inputProps={{ ...(values.expiryDate && { max: values.expiryDate }) }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              type='date'
              name='expiryDate'
              label='Expiry Date'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.expiryDate}
              InputLabelProps={{ shrink: true }}
              error={errors.expiryDate && touched.expiryDate}
              helperText={touched.expiryDate && errors.expiryDate}
              inputProps={{ ...(values.signInDate && { min: values.signInDate }) }}
            />
          </Grid>
          <Box className={styles.mnRow}>
            <Box className={styles.addAttachmentContainer}>
              <FileUploader formikRef={formik} />
            </Box>
          </Box>
        </Grid>
      </Box>
      <Box className={styles.mnRow}>
        <label className={styles.label}>Margin</label>
        <Grid container item xs={9} spacing={3}>
          <Grid item xs={3}>
            <TextField
              fullWidth
              name='percentage'
              label='Percentage'
              placeholder='Percentage'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.percentage}
              error={errors.percentage && touched.percentage}
              helperText={touched.percentage && errors.percentage}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              name='price'
              label='Fixed Price'
              placeholder='Fixed Price'
              onBlur={handleBlur}
              value={values.price}
              onChange={handleChange}
              error={errors.price && touched.price}
              helperText={touched.price && errors.price}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

const FileUploader = ({ formikRef }) => {
  const hiddenFileInput = useRef(null);
  const [files, setFiles] = useState([]);
  const acceptedFileTypes = [
    'image/png',
    'image/jpg',
    'image/jpeg',
    'application/pdf',
    '.doc',
    '.docx',
    '.xls',
    '.xlsx',
  ];

  const handleClick = () => hiddenFileInput.current.click();
  const handleDelete = (id) => () => {
    const a = files.filter((item) => item.id !== id);
    setFiles(a);
  };

  function errorHandler(key, message) {
    formikRef.setFieldError(key, message);
    setTimeout(() => formikRef.setFieldError(key, null), 5000);
  }

  function handleChange(event) {
    try {
      if (event.target.files.length + files.length > 5) {
        throw new Error('Maximum files count is 5');
      } else if (event.target.files.length) {
        const newFiles = [...event.target.files].map((file, index) => {
          if (!acceptedFileTypes.includes(file.type) || file.size / 1024 ** 2 > 20) {
            throw new Error(
              'Supported file types are .png, .jpeg, .jpg, .doc,.docx, .pdf, .xls, .xlsx'
            );
          }
          file.id = (files[files.length - 1]?.id + 1 || 1) + index;
          return file;
        });
        setFiles([...files, ...newFiles]);
      }
    } catch (error) {
      errorHandler('attachments', error.message);
    }
  }

  return (
    <Box className={styles.mnRow}>
      <Box>
        <Button className={styles.addAttachment} onClick={handleClick}>
          ADD ATTACHMENTS
          <CloudUpload style={{ marginLeft: 10 }} />
        </Button>
        {formikRef.errors.attachments && (
          <FormHelperText error sx={{ marginTop: 2 }}>
            {formikRef.errors.attachments}
          </FormHelperText>
        )}
      </Box>
      <Box style={{ marginLeft: 20, width: 600 }}>
        <Box>
          {files.map((file) => (
            <Chip
              key={file.id}
              label={file.name}
              style={{ margin: 5 }}
              onDelete={handleDelete(file.id)}
            />
          ))}
        </Box>
      </Box>
      <input
        multiple
        type='file'
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: 'none' }}
        accept='.png, .jpeg, .jpg, .doc,.docx, .pdf, .xls, .xlsx'
      />
    </Box>
  );
};
