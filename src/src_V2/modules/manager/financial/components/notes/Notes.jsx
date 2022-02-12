import { Close, ExpandMore, RateReview } from '@mui/icons-material';
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
import { useState } from 'react';

import { useScrollIntoView } from '../../../../../utils/hooks';
import commonStyles from '../../payables/edit-drawer/style.module.css';
import styles from './Notes.module.css';

export default function Notes({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  setFieldValue,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const detailsRef = useScrollIntoView(isExpanded, { behavior: 'smooth' });

  const handleAccordionClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleClearNotes = () => {
    setFieldValue('notes', '');
  };

  return (
    <Accordion
      className={commonStyles.accordion}
      onClick={handleAccordionClick}
      expanded={isExpanded}
      ref={detailsRef}
    >
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
      </AccordionDetails>
    </Accordion>
  );
}
