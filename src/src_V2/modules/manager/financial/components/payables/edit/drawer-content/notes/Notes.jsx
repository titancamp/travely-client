import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { ExpandMore, Close, RateReview } from '@mui/icons-material';

import commonStyles from '../style.module.css';
import styles from './Notes.module.css';

export default function Notes({
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
    <Accordion className={commonStyles.accordion}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls='panel1a-content'
        id='panel1a-header'
        className={commonStyles.accordionSummary}
      >
        <IconButton>
          <RateReview />
        </IconButton>
        <Typography className={commonStyles.detailsTxt}>Notes</Typography>
      </AccordionSummary>
      <AccordionDetails className={commonStyles.accordionDetails}>
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
                  <p>{!!values?.notes?.length && `${values.notes.length}/500 letter`}</p>
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
      </AccordionDetails>
    </Accordion>
  );
}
