import { Box, Button, Divider, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import TourDetails from './tour-details/TourDetails';
import PaymentHistory from './payment-history/PaymentHistory';
import Notes from './notes/Notes';
import styles from './RowList.module.css';

const CostBox = ({ currency, cost, text }) => {
  return (
    <Box className={styles.costBox}>
      <Box className={styles.costAmount}>
        {currency} {cost}
      </Box>
      <Box className={styles.costTxt}>{text}</Box>
    </Box>
  );
};

export default function RowList({ row, onClose }) {
  return (
    <>
      {/*Header*/}
      <Box className={styles.mainBox}>
        <div className={styles.textDiv}>
          <div className={`${styles.payableId} ${styles.mainText}`}>
            Payable ID: {row.payableId}
          </div>
          <div className={styles.supplierName}>Supplier Name: {row.supplier}</div>
        </div>
        <div className={styles.closeBtnDiv}>
          <CloseIcon onClick={onClose} iconStyle={styles.closeBtn} />
        </div>
      </Box>

      {/*Layout*/}
      <Box className={styles.layout}>
        <Box className={styles.layoutDistance}>
          <Stack
            className={styles.generalInfo}
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >
            <CostBox currency={row.currency} cost={row.plannedCost} text="Planned Cost" />
            <CostBox currency={row.currency} cost={row.actualCost} text="Actual Cost" />
            <CostBox currency={row.currency} cost={row.difference} text="Difference" />
            <CostBox currency={row.currency} cost={row.paidCost} text="Paid Amount" />
            <CostBox currency={row.currency} cost={row.remaining} text="Remaining" />
          </Stack>
        </Box>

        <Box className={styles.layoutDistance}>
          <TourDetails row={row} />
        </Box>

        <Box className={styles.layoutDistance}>
          <PaymentHistory row={row} />
        </Box>

        <Box className={styles.layoutDistance}>
          <Notes row={row} />
        </Box>
      </Box>

      {/*Footer*/}
      <Box className={`${styles.mainBox} ${styles.footerBox}`}>
        <div className={styles.btnDiv}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button className={styles.saveBtn} variant="contained">
            Save
          </Button>
        </div>
      </Box>
    </>
  );
}
