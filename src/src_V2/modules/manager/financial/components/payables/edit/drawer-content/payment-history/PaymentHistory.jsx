import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from '@mui/material';

import creditCard from '../../../../../../../../assets/credit-card.png';
import commonStyles from '../style.module.css';
import styles from './PaymentHistory.module.css';
import { NoData } from '../../../../../../../../components';

const AddPaymentBtn = () => <Button variant="contained">+ Add payment</Button>;

export default function PaymentHistory({ history }) {
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
            {history?.length && (
              <span className={commonStyles.detailsCount}>({history.length})</span>
            )}
          </Typography>
        </Box>
        <Box>{history?.length && <AddPaymentBtn />}</Box>
      </AccordionSummary>
      <AccordionDetails className={commonStyles.accordionDetails}>
        <Box>
          {!history?.length && (
            <Box className={styles.noDataBox}>
              <NoData className={styles.noData} />
              <AddPaymentBtn />
            </Box>
          )}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
