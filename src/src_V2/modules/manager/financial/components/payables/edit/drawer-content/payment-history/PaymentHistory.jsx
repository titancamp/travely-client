import { Accordion, AccordionSummary, Box, Button, Typography } from '@mui/material';

import creditCard from '../../../../../../../../assets/credit-card.png';
import commonStyles from '../style.module.css';
import styles from './PaymentHistory.module.css';

export default function PaymentHistory({ row }) {
  console.log(row);
  return (
    <Accordion className={commonStyles.accordion} expanded={true}>
      <AccordionSummary
        aria-controls="panel1a-content"
        id="panel1a-header"
        className={`${commonStyles.accordionSummary} ${styles.accordionBox}`}
      >
        <Box className={styles.paymentBox}>
          <Box
            component="img"
            alt="Payment History"
            src={creditCard}
            className={`${styles.cardImg} ${commonStyles.panelImg}`}
          />
          <Typography className={commonStyles.detailsTxt}>
            Payment History{' '}
            {row.paymentHistory?.length && (
              <span className={commonStyles.detailsCount}>({row.paymentHistory.length})</span>
            )}
          </Typography>
        </Box>
        <Box>
          {row.paymentHistory?.length && <Button variant="contained">+ Add payment</Button>}
        </Box>
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
