import { AttachFile } from '@mui/icons-material';
import { Chip } from '@mui/material';
import { deepPurple, green, orange, pink } from '@mui/material/colors';

import { PaymentStatus } from '../../constants';
import { TableCellWrapper } from '../sticky-table/StickyTable';
import styles from './TableCells.module.css';

// Status Cell
const StatusesCell = ({ statusNum }) => {
  let color = null;
  const statusName = PaymentStatus[statusNum];

  switch (statusNum) {
    case PaymentStatus.PartiallyPaid:
      color = orange[900];
      break;
    case PaymentStatus.FullyPaid:
      color = green[600];
      break;
    case PaymentStatus.Overdue:
      color = pink[700];
      break;
    case PaymentStatus.Unpaid:
      color = deepPurple[800];
      break;
    default:
      return (
        <Chip
          label={statusName}
          className={`${styles.canceledPayableStatus} ${styles.statusChip}`}
        />
      );
  }

  return (
    <Chip
      label={statusName}
      style={{ color, border: `1px solid ${color}` }}
      className={`${styles.whiteTableCell} ${styles.statusChip}`}
    />
  );
};

export const StatusCell = ({ value }) => (
  <TableCellWrapper>
    <StatusesCell statusNum={value} />
  </TableCellWrapper>
);

export const InvoiceAttachmentCell = () => (
  <TableCellWrapper>
    <AttachFile className={styles.attachmentImg} />
  </TableCellWrapper>
);
