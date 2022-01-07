import { Accordion, AccordionSummary, Box, Typography } from '@mui/material';
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
      {/*<AccordionDetails>*/}
      {/*  <Box className={styles.accordionDetails}>*/}
      {/*    <Box className={styles.accordionDetailItems}>*/}
      {/*      <Box>Tour ID</Box>*/}
      {/*      <Box className={styles.accordionDetailTxt}>{row.tourId}</Box>*/}
      {/*    </Box>*/}
      {/*    <Box className={styles.accordionDetailItems}>*/}
      {/*      <Box>Tour Name</Box>*/}
      {/*      <Box className={styles.accordionDetailTxt}>{row.tourName}</Box>*/}
      {/*    </Box>*/}
      {/*    <Box className={styles.accordionDetailItems}>*/}
      {/*      <Box>Tour Ready Date</Box>*/}
      {/*      <Box className={styles.accordionDetailTxt}>{generateDate(row.readyDate)}</Box>*/}
      {/*    </Box>*/}
      {/*    <Box className={styles.accordionDetailItems}>*/}
      {/*      <Box>Tour Status</Box>*/}
      {/*      <Box className={styles.accordionDetailTxt}>*/}
      {/*        {PaymentStatus[row.status].toUpperCase()}*/}
      {/*      </Box>*/}
      {/*    </Box>*/}
      {/*  </Box>*/}
      {/*</AccordionDetails>*/}
    </Accordion>
  );
}
