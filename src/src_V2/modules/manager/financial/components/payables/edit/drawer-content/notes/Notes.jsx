import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  TextareaAutosize,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import notesImage from '../../../../../../../../assets/notes.png';
import commonStyles from '../style.module.css';
import styles from './Notes.module.css';

export default function Notes({ row }) {
  console.log(row);
  return (
    <Accordion className={commonStyles.accordion}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className={commonStyles.accordionSummary}
      >
        <Box
          component="img"
          alt="Notes"
          src={notesImage}
          className={`${styles.notesImg} ${commonStyles.panelImg}`}
        />
        <Typography className={commonStyles.detailsTxt}>Notes</Typography>
      </AccordionSummary>
      <AccordionDetails className={commonStyles.accordionDetails}>
        <Box>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            placeholder="Type in..."
            className={styles.notesTextArea}
            value={row.notes}
          />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
