import { ExpandMore, Map } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  Typography,
} from '@mui/material';

import { generateDate } from '../../../../../../utils';
import { PaymentStatus } from '../../../constants';
import commonStyles from '../style.module.css';
import styles from './TourDetails.module.css';

export default function TourDetails({ row }) {
  return (
    <Accordion className={commonStyles.accordion}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls='panel1a-content'
        id='panel1a-header'
        className={commonStyles.accordionSummary}
      >
        <IconButton>
          <Map />
        </IconButton>
        <Typography className={commonStyles.detailsTxt}>Tour Details</Typography>
      </AccordionSummary>
      <AccordionDetails className={commonStyles.accordionDetails}>
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
            <Box className={styles.accordionDetailTxt}>{PaymentStatus[row.status]}</Box>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
