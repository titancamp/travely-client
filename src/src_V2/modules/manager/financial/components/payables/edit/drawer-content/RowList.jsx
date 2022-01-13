import { Box, Button, Divider, InputAdornment, Stack, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useFormik } from 'formik';

import { rowListInitialValues, rowListSchema } from '../../../../../../../utils/schemas';
import TourDetails from './tour-details/TourDetails';
import PaymentHistory from './payment-history/PaymentHistory';
import Notes from './notes/Notes';
import styles from './RowList.module.css';

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

export default function RowList({ row, onClose }) {
  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    validationSchema: rowListSchema,
    initialValues: rowListInitialValues(row),
  });

  return (
    <form onSubmit={handleSubmit}>
      {/*Header*/}
      <Box className={styles.mainBox}>
        <div className={styles.textDiv}>
          <div className={`${styles.payableId} ${styles.mainText}`}>
            Payable ID: {row.payableId}
          </div>
          <div className={styles.supplierName}>Supplier Name: {row.supplier}</div>
        </div>
        <div className={styles.closeBtnDiv}>
          <CloseIcon onClick={onClose} className={styles.closeBtn} />
        </div>
      </Box>

      {/*Layout*/}
      <Box className={styles.layout}>
        <Box className={styles.layoutDistance}>
          <Stack
            className={styles.generalInfo}
            direction='row'
            divider={<Divider orientation='vertical' flexItem />}
            spacing={2}
          >
            <CostBox currency={row.currency} cost={row.plannedCost} text='Planned Cost' />
            <CostBox currency={row.currency} cost={row.actualCost} text='Actual Cost' />
            <CostBox currency={row.currency} cost={row.difference} text='Difference' />
            <CostBox currency={row.currency} cost={row.paidCost} text='Paid Amount' />
            <CostBox
              currency={row.currency}
              cost={row.remaining}
              text='Remaining'
              className={styles.primaryColor}
            />
          </Stack>
        </Box>

        <Box className={styles.layoutDistance}>
          <Box className={styles.editableFields}>
            <TextField
              name='actualCost'
              label='Actual Cost'
              variant='outlined'
              size='small'
              className={styles.actualCostControl}
              value={values.actualCost}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.actualCost}
              helperText={errors.actualCost}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>{row.currency}</InputAdornment>
                ),
              }}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Box className={styles.dueDatePicker}>
                <DesktopDatePicker
                  name='dueDate'
                  label='Due date'
                  inputFormat='dd/MM/yyyy'
                  value={values.dueDate}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Box>
            </LocalizationProvider>
          </Box>
        </Box>

        <Box className={styles.layoutDistance}>
          <TourDetails row={row} />
        </Box>

        <Box className={styles.layoutDistance}>
          <PaymentHistory history={row.paymentHistory} />
        </Box>

        <Box className={styles.layoutDistance}>
          <Notes
            values={values}
            errors={errors}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
        </Box>
      </Box>

      {/*Footer*/}
      <Box className={`${styles.mainBox} ${styles.footerBox}`}>
        <div className={styles.btnDiv}>
          <Button variant='outlined' onClick={onClose}>
            Cancel
          </Button>
          <Button className={styles.saveBtn} variant='contained'>
            Save
          </Button>
        </div>
      </Box>
    </form>
  );
}
