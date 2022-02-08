import { TableCell } from '@mui/material';

import { TooltipText } from '../../../../../../components';
import { generateArrayByRange, moneyMask } from '../../../../../../utils';
import { TableCellWrapper, TooltipTableCell } from '../../../components';
import { PaymentType } from '../../../constants';
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

export const DifferenceCell = ({ value, styleName }) => (
  <TableCell
    className={`${styles.tableCell} ${colorCondition(value)} ${
      styleName && styles[styleName]
    }`}
  >
    <TooltipText text={moneyMask(value)} />
  </TableCell>
);

export const PaymentTypeCell = ({ value }) => (
  <TooltipTableCell rowValue={PaymentType[value]} />
);

const EmptyTableCellWrapper = ({ count }) =>
  generateArrayByRange(1, count).map((el, index) => <TableCellWrapper key={index} />);

export const EmptyCell = ({ count = 1 }) => <EmptyTableCellWrapper count={count} />;
