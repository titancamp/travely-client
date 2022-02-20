import { Close } from '@mui/icons-material';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';

import styles from './NotesInput.module.css';

export default function NotesInput({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  setFieldValue,
}) {
  const handleClearNotes = () => {
    setFieldValue('notes', '');
  };

  return (
    <TextField
      name='notes'
      label='Type in'
      variant='outlined'
      minRows={3}
      multiline
      fullWidth
      className={styles.notesTextArea}
      value={values.notes}
      onBlur={handleBlur}
      onChange={handleChange}
      error={errors.notes && touched.notes}
      helperText={touched.notes && errors.notes}
      InputProps={{
        endAdornment: (
          <>
            <Box className={styles.lengthSection}>
              <p>{`${values?.notes?.length || 0}/500 letter`}</p>
            </Box>
            <InputAdornment position='end' onClick={handleClearNotes}>
              <IconButton aria-label='close' className={styles.clearNote}>
                <Close />
              </IconButton>
            </InputAdornment>
          </>
        ),
      }}
    />
  );
}
