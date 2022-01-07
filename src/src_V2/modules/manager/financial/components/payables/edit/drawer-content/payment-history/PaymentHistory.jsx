import { Accordion, AccordionSummary, Box, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import creditCard from '../../../../../../../../assets/credit-card.png';
import commonStyles from '../style.module.css';
import styles from './PaymentHistory.module.css';

export default function PaymentHistory({ row }) {
  console.log(row);
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className={commonStyles.detailsAccordion}
      >
        <Box
          component="img"
          alt="Payment History"
          src={creditCard}
          className={`${styles.cardImg} ${commonStyles.panelImg}`}
        />
        <Typography className={commonStyles.detailsTxt}>Payment History</Typography>
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
