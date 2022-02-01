// todo find another solution for style import
import styles from '../components/sticky-table/StickyTable.module.css';

export function colorCondition(difference) {
  let style;
  if (difference > 0) {
    style = styles.positiveTableCell;
  } else if (difference < 0) {
    style = styles.negativeTableCell;
  } else {
    style = styles.neutralTableCell;
  }
  return style;
}
