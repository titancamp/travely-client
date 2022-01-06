import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import pathImage from '../../../../../../../../assets/path.png';
import { generateDate } from '../../../../../../../../utils';
import styles from './TourDetails.module.css';

export default function TourDetails({ row }) {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className={styles.detailsAccordion}
      >
        <Box component="img" alt="Tour Details" src={pathImage} className={styles.pathImg} />
        <Typography className={styles.detailsTxt}>Tour Details</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box className={styles.accordionDetails}>
          <Box className={styles.accordionDetailItems}>
            <Box>Tour ID</Box>
            <Box className={styles.accordionDetailTxt}>{row.tourId}</Box>
          </Box>
          <Box className={styles.accordionDetailItems}>
            <Box>Tour Name</Box>
            <Box className={styles.accordionDetailTxt}>{row.tourName}</Box>
          </Box>
          <Box className={styles.accordionDetailItems}>
            <Box>Tour Ready Date</Box>
            <Box className={styles.accordionDetailTxt}>{generateDate(row.readyDate)}</Box>
          </Box>
          <Box className={styles.accordionDetailItems}>
            <Box>Tour Status</Box>
            <Box className={styles.accordionDetailTxt}>{row.status}</Box>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
