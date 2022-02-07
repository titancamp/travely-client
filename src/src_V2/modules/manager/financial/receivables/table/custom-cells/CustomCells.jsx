import { CheckCircle, RemoveCircle } from '@mui/icons-material';

import { TableCellWrapper } from '../../../components';
import styles from './CustomCells.module.css';

const InvoiceSent = () => (
  <div className={styles.invoiceFlag}>
    <CheckCircle className={styles.sentIcon} />
    <p>Sent</p>
  </div>
);

const InvoiceNotSent = () => (
  <div className={styles.invoiceFlag}>
    <RemoveCircle className={styles.notSentIcon} />
    <p>Not sent</p>
  </div>
);

export const InvoiceSentFlag = ({ value }) => {
  return (
    <TableCellWrapper>{value ? <InvoiceSent /> : <InvoiceNotSent />}</TableCellWrapper>
  );
};
