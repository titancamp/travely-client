import { Box, Divider, Stack } from '@mui/material';

import { remainingCost } from '../../../../utils/cost';
import commonStyles from '../style.module.css';
import styles from './GeneralInfo.module.css';

const CostBox = ({ currency, cost, text, className }) => {
  return (
    <Box className={`${styles.costBox} ${className && className}`}>
      <Box className={styles.costAmount}>
        {currency} {cost}
      </Box>
      <Box className={styles.costTxt}>{text}</Box>
    </Box>
  );
};

export default function GeneralInfo({ values, row }) {
  const { currency, totalAmount, paidAmount } = row;

  return (
    <Stack
      className={styles.generalInfo}
      direction='row'
      divider={<Divider orientation='vertical' flexItem />}
      spacing={2}
    >
      <CostBox currency={currency} cost={totalAmount} text='Total Amount' />
      <CostBox currency={currency} cost={paidAmount} text='Paid Amount' />
      <CostBox
        currency={currency}
        cost={remainingCost(values.totalAmount, row.paidAmount)}
        text='Remaining'
        className={commonStyles.primaryColor}
      />
    </Stack>
  );
}
