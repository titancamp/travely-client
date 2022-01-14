import {
  Box,
  Grid,
  Button,
  TextField,
  InputLabel,
  FormControl,
  DialogTitle,
  Autocomplete,
  OutlinedInput,
  DialogActions,
  DialogContent,
  FormHelperText,
} from '@mui/material';
import { useRef, useState } from 'react';
import { useFormik } from 'formik';
import { LocalPhone, Person, Email } from '@mui/icons-material';

import {
  addGuideSchema,
  addGuideInitialValues,
} from '../../../../../utils/schemas/tourManagment/guide';
import { EndAdornment } from '../../components/endAdornment';

import styles from './style.module.css';
import { AddGuide, Sex } from '../constants';
import { Languages } from '../../transportation/constants';

export default function AddEditGuideDialog({ onClose, onSuccess, guide, editMode }) {
  const autoCompleteChangeHandler = (type) => (e, value) => setFieldValue(type, value);

  const formik = useFormik({
    onSubmit: onSuccess,
    validationSchema: addGuideSchema(),
    initialValues: addGuideInitialValues(guide),
  });

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    handleChange,
    setFieldValue,
  } = formik;

  return (
    <form onSubmit={handleSubmit} autoComplete='off'>
      <DialogTitle id='alert-dialog-title'>{editMode ? 'Edit' : 'Add'} Guide</DialogTitle>
      <DialogContent>
        <Grid container rowSpacing={3}>
          <Grid item container xs={11}>
            <Grid item xs={6}>
              <UploadImage parentRef={formik} />
            </Grid>
            <Grid item container xs={6} spacing={0}>
              <Grid item xs={12}>
                <FormControl fullWidth className={styles.ctField}>
                  <InputLabel error={errors.person && touched.person}>
                    Contact Person
                  </InputLabel>
                  <OutlinedInput
                    name='person'
                    onBlur={handleBlur}
                    value={values.person}
                    label='Contact Person'
                    onChange={handleChange}
                    error={errors.person && touched.person}
                    endAdornment={<EndAdornment icon={<Person />} />}
                  />
                  {touched.person && errors.person && (
                    <FormHelperText error>{errors.person}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth className={styles.ctField}>
                  <InputLabel error={errors.email && touched.email}>
                    Contact Email
                  </InputLabel>
                  <OutlinedInput
                    name='email'
                    onBlur={handleBlur}
                    value={values.email}
                    label='Contact Email'
                    onChange={handleChange}
                    error={errors.email && touched.email}
                    endAdornment={<EndAdornment icon={<Email />} />}
                  />
                  {errors.email && touched.email && (
                    <FormHelperText error>{errors.email}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth className={styles.ctField}>
                  <InputLabel error={errors.phone && touched.phone}>
                    Contact Phone
                  </InputLabel>
                  <OutlinedInput
                    name='phone'
                    onBlur={handleBlur}
                    value={values.phone}
                    label='Contact Phone'
                    onChange={handleChange}
                    error={errors.phone && touched.phone}
                    endAdornment={<EndAdornment icon={<LocalPhone />} />}
                  />
                  {errors.phone && touched.phone && (
                    <FormHelperText error>{errors.phone}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
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
          <Grid container item xs={14} spacing={2}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                name='experience'
                label='Experience'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.experience}
                error={errors.experience && touched.experience}
                helperText={touched.experience && errors.experience}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                name='age'
                label='Age'
                value={values.age}
                onBlur={handleBlur}
                onChange={handleChange}
                error={errors.age && touched.age}
                helperText={touched.age && errors.age}
              />
            </Grid>
            <Grid item xs={4}>
              <Autocomplete
                options={Sex}
                value={values.sex}
                onChange={autoCompleteChangeHandler('sex')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name='sex'
                    label='Sex'
                    value={values.sex}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={errors.sex && touched.sex}
                    helperText={touched.sex && errors.sex}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name='skills'
              label='Skills'
              value={values.skills}
              onBlur={handleBlur}
              onChange={handleChange}
              error={errors.skills && touched.skills}
              helperText={touched.skills && errors.skills}
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

function UploadImage({ parentRef }) {
  const hiddenFileInput = useRef(null);
  const [error, setError] = useState('');

  const handleClick = () => hiddenFileInput.current.click();

  function handleChange(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (
      !AddGuide.acceptedFileTypes.includes(file.type) ||
      file.size > AddGuide.fileSize
    ) {
      return setError(AddGuide.errorMessage);
    }

    parentRef.setFieldValue('image', {
      currentFile: file,
      previewImage: URL.createObjectURL(file),
    });
  }

  return (
    <Box
      onClick={handleClick}
      className={`${styles.uploadImageContainer} ${
        error ? styles.errorMessageColor : ''
      }`}
    >
      <input
        type='file'
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: 'none' }}
        accept={AddGuide.acceptedFileTypes.join(', ')}
      />
      {error && <>{error}</>}
      {parentRef.values.image?.previewImage && (
        <Box
          component='img'
          className={styles.previewImage}
          alt='The house from the offer.'
          src={parentRef.values.image?.previewImage}
        />
      )}
    </Box>
  );
}
