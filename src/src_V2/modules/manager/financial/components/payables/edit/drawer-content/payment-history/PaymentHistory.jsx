import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/lab';

import creditCard from '../../../../../../../../assets/icons/credit-card.png';
import { NoData } from '../../../../../../../../components';
// import Upload from '../../../../../../supplier-management/components/add-attachment/AddAttachment';
import { paymentHistoryInitialValues } from '../../../../../../../../utils/schemas';
import {
  paymentHistoryColumns as columns,
  paymentHistoryColumnTypes as columnTypes,
  PaymentType,
} from '../../../../../constants';
import commonStyles from '../style.module.css';
import styles from './PaymentHistory.module.css';

const EditableTableCell = ({
  value,
  label,
  columnName,
  id,
  paymentHistory,
  setFieldValue,
}) => {
  const handleChange = (newValue, name) => {
    paymentHistory.forEach((history) => {
      if (history.id === id) {
        history[name] = newValue;
      }
    });
    setFieldValue('paymentHistory', paymentHistory);
  };

  return {
    [columnTypes.text]: (
      <TextField
        size='small'
        variant='outlined'
        label={label}
        name={columnName}
        value={value}
        key={id}
        onChange={({ target: { value } }) => handleChange(value, columnName)}
      />
    ),
    [columnTypes.price]: (
      <TextField
        size='small'
        variant='outlined'
        label={label}
        name={columnName}
        value={value}
        key={id}
        onChange={({ target: { value } }) => handleChange(value, columnName)}
      />
    ),
    [columnTypes.date]: (
      <Box className={commonStyles.dueDatePicker}>
        <DatePicker
          inputFormat='dd/MM/yyyy'
          label={label}
          name={columnName}
          value={value}
          key={id}
          onChange={(newValue) => handleChange(newValue.toString(), columnName)}
          renderInput={(params) => <TextField {...params} />}
        />
      </Box>
    ),
    [columnTypes.select]: (
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Payment Type</InputLabel>
        <Select
          size='small'
          variant='outlined'
          label={label}
          name={columnName}
          value={value}
          key={id}
          onChange={({ target: { value } }) => handleChange(value, columnName)}
        >
          <MenuItem value={PaymentType.Cash}>{PaymentType[1]}</MenuItem>
          <MenuItem value={PaymentType.Transfer}>{PaymentType[2]}</MenuItem>
        </Select>
      </FormControl>
    ),
    // [columnTypes.file]: <Upload formikRef={{ errors: {} }} label='Upload' />,
  };
};

const AddPaymentBtn = ({ addPaymentHandler }) => (
  <Button variant='contained' onClick={addPaymentHandler}>
    + Add payment
  </Button>
);

export default function PaymentHistory({
  values,
  // errors,
  // touched,
  // handleBlur,
  setFieldValue,
}) {
  const paymentHistory = values?.paymentHistory || [];
  const historyColumns = columns();
  const columnKeys = Object.keys(historyColumns);

  const handleAddPayment = () => {
    setFieldValue('paymentHistory', [
      ...paymentHistory,
      paymentHistoryInitialValues(paymentHistory.length + 1),
    ]);
  };

  return (
    <Accordion className={commonStyles.accordion} expanded={true}>
      <AccordionSummary
        aria-controls='panel1a-content'
        id='panel1a-header'
        className={`${commonStyles.accordionSummary} ${styles.accordionBox}`}
      >
        <Box className={styles.paymentBox}>
          <Box
            component='img'
            alt='Payment History'
            src={creditCard}
            className={`${styles.cardImg} ${commonStyles.panelImg}`}
          />
          <Typography className={commonStyles.detailsTxt}>
            Payment History{' '}
            {!!paymentHistory?.length && (
              <span className={commonStyles.detailsCount}>({paymentHistory.length})</span>
            )}
          </Typography>
        </Box>
        <Box>
          {!!paymentHistory?.length && (
            <AddPaymentBtn addPaymentHandler={handleAddPayment} />
          )}
        </Box>
      </AccordionSummary>
      <AccordionDetails className={commonStyles.accordionDetails}>
        <TableContainer component={Paper}>
          <Table className={styles.historyTable}>
            <TableHead>
              <TableRow>
                {columnKeys.map((c) => (
                  <TableCell align='left' key={c}>
                    {historyColumns[c].label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paymentHistory.map((row, i) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {columnKeys.map((columnKey) => {
                    const column = historyColumns[columnKey];

                    const cell = EditableTableCell({
                      value: row[columnKey],
                      label: column.label,
                      columnName: columnKey,
                      id: i + 1,
                      paymentHistory,
                      setFieldValue,
                    });

                    return (
                      <TableCell key={`${columnKey}_${row.id}_${i}`}>
                        {cell[column.type]}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {!paymentHistory?.length && (
          <Box className={styles.noDataBox}>
            <NoData className={styles.noData} />
            <AddPaymentBtn addPaymentHandler={handleAddPayment} />
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
