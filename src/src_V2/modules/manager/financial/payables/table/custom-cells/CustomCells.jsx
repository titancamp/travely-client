import { AttachFile } from '@mui/icons-material';
import { Chip, TableCell } from '@mui/material';
import { deepPurple, green, orange, pink } from '@mui/material/colors';

import { TooltipText } from '../../../../../../components';
import { generateArrayByRange, moneyMask } from '../../../../../../utils';
import { TableCellWrapper, TooltipTableCell } from '../../../components';
import { PaymentStatus, PaymentType } from '../../../constants';
import styles from './CustomCells.module.css';

export function colorCondition(difference) {
  if (difference > 0) {
    return styles.positiveTableCell;
  } else if (difference < 0) {
    return styles.negativeTableCell;
  } else {
    return styles.neutralTableCell;
  }
}

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

export const DifferenceCell = ({ value, styleName }) => (
  <TableCell
    className={`${styles.tableCell} ${colorCondition(value)} ${
      styleName && styles[styleName]
    }`}
  >
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

const EmptyTableCellWrapper = ({ count }) =>
  generateArrayByRange(1, count).map((el, index) => <TableCellWrapper key={index} />);

export const EmptyCell = ({ count = 1 }) => <EmptyTableCellWrapper count={count} />;
