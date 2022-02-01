import { AttachFile } from '@mui/icons-material';
import { Chip, TableCell } from '@mui/material';
import { deepPurple, green, orange, pink } from '@mui/material/colors';

import { TooltipText } from '../../../../../../components';
import { moneyMask } from '../../../../../../utils';
import { TableCellWrapper, TooltipTableCell } from '../../../components';
import { PaymentStatus, PaymentType } from '../../../constants';
import { colorCondition } from '../../../utils/table';
import styles from './CustomCells.module.css';

const PayableStatuses = ({ statusNum }) => {
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

const InvoiceAttachment = ({ attachment }) => (
  <>{attachment ? <AttachFile className={styles.attachmentImg} /> : '--'}</>
);

export const InvoiceAttachmentCell = ({ value }) => (
  <TableCellWrapper>
    <InvoiceAttachment attachment={value} />
  </TableCellWrapper>
);

export const DifferenceCell = ({ value }) => (
  <TableCell className={`${styles.tableCell} ${colorCondition(value)}`}>
    <TooltipText text={moneyMask(value)} />
  </TableCell>
);

export const StatusCell = ({ value }) => (
  <TableCellWrapper>
    <PayableStatuses statusNum={value} />
  </TableCellWrapper>
);

export const PaymentTypeCell = ({ value }) => (
  <TooltipTableCell rowValue={PaymentType[value]} />
);
