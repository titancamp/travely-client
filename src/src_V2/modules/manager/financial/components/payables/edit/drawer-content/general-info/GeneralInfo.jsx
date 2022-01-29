import { Box, Divider, Stack } from '@mui/material';

import { moneyMask } from '../../../../../../../../utils';
import {
  actualCountedCost,
  differenceCost,
  remainingCost,
} from '../../../../../utils/cost';
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

export default function GeneralInfo({ actualCost, row }) {
  const { currency, plannedCost, paidCost } = row;

  return (
    <Stack
      className={styles.generalInfo}
      direction='row'
      divider={<Divider orientation='vertical' flexItem />}
      spacing={2}
    >
      <CostBox currency={currency} cost={moneyMask(plannedCost)} text='Planned Cost' />
      <CostBox
        currency={currency}
        cost={moneyMask(actualCountedCost(actualCost))}
        text='Actual Cost'
      />
      <CostBox
        currency={currency}
        cost={moneyMask(differenceCost(plannedCost, actualCost))}
        text='Difference'
      />
      <CostBox currency={currency} cost={moneyMask(paidCost)} text='Paid Amount' />
      <CostBox
        currency={currency}
        cost={moneyMask(remainingCost(actualCost, paidCost))}
        text='Remaining'
        className={commonStyles.primaryColor}
      />
    </Stack>
  );
}
