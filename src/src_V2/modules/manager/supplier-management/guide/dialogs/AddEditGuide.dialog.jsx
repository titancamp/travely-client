import { CloudUpload, Email, Person } from '@mui/icons-material';
import {
  Autocomplete,
  Box,
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
import { useRef, useState } from 'react';

import {
  addGuideInitialValues,
  addGuideSchema,
} from '../../../../../utils/schemas/tourManagment/guide';
import { EndAdornment } from '../../components/endAdornment';
import TagsInput from '../../components/tag/Tag';
import { Languages } from '../../transportation/constants';
import { AddGuide, Sex } from '../constants';
import styles from './style.module.css';

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
    setFieldError,
  } = formik;

  return (
    <form onSubmit={handleSubmit} autoComplete='off'>
      <DialogTitle id='alert-dialog-title'>{editMode ? 'Edit' : 'Add'} Guide</DialogTitle>
      <DialogContent className={styles.viewTitle}>
        <Grid container>
          <Grid container item spacing={10} mb={2}>
            <Grid item xs={4}>
              <UploadImage parentRef={formik} />
            </Grid>
            <Grid item container xs={8} rowSpacing={4}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel error={errors.name && touched.name}>Name</InputLabel>
                  <OutlinedInput
                    name='name'
                    label='Name'
                    onBlur={handleBlur}
                    value={values.name}
                    onChange={handleChange}
                    error={errors.name && touched.name}
                    endAdornment={<EndAdornment icon={<Person />} />}
                  />
                  {touched.name && errors.name && (
                    <FormHelperText className={styles.helperText} error>
                      {errors.name}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
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
                    <FormHelperText error className={styles.helperText}>
                      {errors.email}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel error={errors.phone && touched.phone}>
                    Contact Phone
                  </InputLabel>
                  <OutlinedInput
                    name='phone'
                    onBlur={handleBlur}
                    value={values.phone}
                    label='Contact Phone'
                    onChange={handleChange}
                    startAdornment={<>+374&nbsp;</>}
                    error={errors.phone && touched.phone}
                  />
                  {errors.phone && touched.phone && (
                    <FormHelperText error className={styles.helperText}>
                      {errors.phone}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} mb={2}>
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
          <Grid container item xs={14} spacing={2} mb={2}>
            <Grid item xs={6}>
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
            <Grid item xs={6}>
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
            <TagsInput
              fullWidth
              name='skills'
              label='Skills'
              variant='outlined'
              placeholder='Add skill'
              tags={values.skills}
              error={errors.skills}
              setFieldValue={setFieldValue}
              setFieldError={setFieldError}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
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
        error && !parentRef.values.image?.previewImage ? styles.errorColor : ''
      }`}
    >
      <input
        type='file'
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: 'none' }}
        accept={AddGuide.acceptedFileTypes.join(', ')}
      />
      {parentRef.values.image?.previewImage ? (
        <>
          <Box
            component='img'
            className={styles.previewImage}
            alt='Guide profile picture.'
            src={parentRef.values.image?.previewImage}
          />
          {error && (
            <p className={styles.attachmentHelperText}>
              Compatible formats are .png, .jpg and file size limit is 20mb.
            </p>
          )}
        </>
      ) : (
        <Box className={styles.addAttachmentContent}>
          <Button
            className={`${styles.addAttachment} ${error ? styles.errorMessageColor : ''}`}
          >
            UPLOAD IMG
            <CloudUpload className={styles.addAttachmentIcon} />
          </Button>
          <p className={styles.attachmentText}>
            Compatible formats are .png, .jpg and file size limit is 20mb.
          </p>
        </Box>
      )}
    </Box>
  );
}
