import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  TextField,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import notesImage from '../../../../../../../../assets/icons/notes.png';
import commonStyles from '../style.module.css';
import styles from './Notes.module.css';

export default function Notes({ values, errors, handleChange, handleBlur }) {
  return (
    <Accordion className={commonStyles.accordion}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1a-content'
        id='panel1a-header'
        className={commonStyles.accordionSummary}
      >
        <Box
          component='img'
          alt='Notes'
          src={notesImage}
          className={`${styles.notesImg} ${commonStyles.panelImg}`}
        />
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
          error={!!errors.notes}
          helperText={errors.notes}
          InputProps={{
            endAdornment: (
              <Box className={styles.lengthSection}>
                <p>{!!values?.notes?.length && `${values.notes.length}/200 letter`}</p>
              </Box>
            ),
          }}
        />
      </AccordionDetails>
    </Accordion>
  );
}
