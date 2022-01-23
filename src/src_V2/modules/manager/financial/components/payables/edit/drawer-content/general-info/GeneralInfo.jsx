import { Box, Divider, Stack } from '@mui/material';

import { differenceCost, remainingCost } from '../../../../../utils/cost';
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
  const { currency, plannedCost, paidCost } = row;

  return (
    <Stack
      className={styles.generalInfo}
      direction='row'
      divider={<Divider orientation='vertical' flexItem />}
      spacing={2}
    >
      <CostBox currency={currency} cost={plannedCost} text='Planned Cost' />
      <CostBox currency={currency} cost={values.actualCost} text='Actual Cost' />
      <CostBox
        currency={currency}
        cost={differenceCost(plannedCost, values.actualCost)}
        text='Difference'
      />
      <CostBox currency={currency} cost={paidCost} text='Paid Amount' />
      <CostBox
        currency={currency}
        cost={remainingCost(values.actualCost, row.paidCost)}
        text='Remaining'
        className={commonStyles.primaryColor}
      />
    </Stack>
  );
}
