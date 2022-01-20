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
  // InputAdornment,
  FormHelperText,
} from '@mui/material';
import { useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Person, Email, CloudUpload } from '@mui/icons-material';

import {
  addGuideSchema,
  addGuideInitialValues,
} from '../../../../../utils/schemas/tourManagment/guide';
import { EndAdornment } from '../../components/endAdornment';

import styles from './style.module.css';
import { AddGuide, Sex } from '../constants';
import { Languages } from '../../transportation/constants';
import TagsInput from '../../components/tag/Tag';

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
    submitForm,
    handleSubmit,
    handleChange,
    setFieldValue,
    setFieldError,
  } = formik;

  return (
    <form onSubmit={handleSubmit} autoComplete='off'>
      <DialogTitle id='alert-dialog-title'>{editMode ? 'Edit' : 'Add'} Guide</DialogTitle>
      <DialogContent className={styles.viewTitle}>
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
                    <FormHelperText className={styles.helperText} error>
                      {errors.person}
                    </FormHelperText>
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
                    <FormHelperText error className={styles.helperText}>
                      {errors.email}
                    </FormHelperText>
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
      <DialogActions className={styles.dialogAction}>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={submitForm} variant='contained'>
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
