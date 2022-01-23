import { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
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
  Tooltip,
  Typography,
} from '@mui/material';
import { Error, Delete, CloudUpload, Payment } from '@mui/icons-material';
import { DatePicker } from '@mui/lab';

import { ConfirmDialog, NoData } from '../../../../../../../../components';
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
  columnName,
  id,
  paymentHistory,
  currency,
  setFieldValue,
  touched,
  errors,
  handleBlur,
}) => {
  const error = errors && Object.keys(errors).length && errors[id - 1];
  const errorMessage = error && error[columnName] && touched[columnName];
  const helperText = touched && touched[columnName] && error && error[columnName];

  const handleChange = (newValue, name) => {
    const newHistories = paymentHistory.map((history) => {
      if (history.id === id) {
        history[name] = newValue;
      }
      return history;
    });
    setFieldValue('paymentHistory', JSON.parse(JSON.stringify(newHistories)));
  };

  return {
    [columnTypes.text]: (
      <TextField
        size='small'
        variant='outlined'
        className={'adornmentInput'}
        name={columnName}
        value={value}
        onChange={({ target: { value } }) => handleChange(value, columnName)}
        onBlur={handleBlur}
        error={!!errorMessage}
        helperText={helperText}
        InputProps={{
          startAdornment: <InputAdornment position='start'>#</InputAdornment>,
        }}
      />
    ),
    [columnTypes.price]: (
      <TextField
        size='small'
        variant='outlined'
        type='number'
        className={'adornmentInput'}
        name={columnName}
        value={value}
        onChange={({ target: { value } }) => handleChange(value, columnName)}
        onBlur={handleBlur}
        error={!!errorMessage}
        helperText={helperText}
        InputProps={{
          startAdornment: <InputAdornment position='start'>{currency}</InputAdornment>,
        }}
      />
    ),
    [columnTypes.date]: (
      <Box className={commonStyles.dueDatePicker}>
        <DatePicker
          inputFormat='dd/MM/yyyy'
          className={styles.date}
          name={columnName}
          value={value}
          onChange={(newValue) => handleChange(newValue?.toString(), columnName)}
          renderInput={(params) => <TextField {...params} />}
        />
      </Box>
    ),
    [columnTypes.select]: (
      <FormControl fullWidth>
        <Select
          size='small'
          variant='outlined'
          name={columnName}
          value={value}
          onChange={({ target: { value } }) => handleChange(value, columnName)}
          onBlur={handleBlur}
        >
          <MenuItem value={PaymentType.Cash}>{PaymentType[1]}</MenuItem>
          <MenuItem value={PaymentType.Transfer}>{PaymentType[2]}</MenuItem>
        </Select>
      </FormControl>
    ),
    [columnTypes.file]: (
      <Button variant='outlined' endIcon={<CloudUpload />} className={styles.uploadBtn}>
        Upload
      </Button>
    ),
  };
};

const AddPaymentBtn = ({ addPaymentHandler }) => (
  <Button variant='contained' onClick={addPaymentHandler}>
    + Add payment
  </Button>
);

export default function PaymentHistory({
  paymentHistory = [],
  currency,
  errors,
  touched,
  setFieldValue,
  handleBlur,
}) {
  const [deletePopupOpened, setDeletePopupOpened] = useState(false);
  const [historyIndex, setHistoryIndex] = useState(null);
  const historyColumns = columns();
  const columnKeys = Object.keys(historyColumns);

  const handleAddPayment = () => {
    setFieldValue('paymentHistory', [
      ...paymentHistory,
      paymentHistoryInitialValues(paymentHistory.length + 1),
    ]);
  };

  const openDeletePopup = () => {
    setDeletePopupOpened(true);
  };

  const closeDeletePopup = () => {
    setDeletePopupOpened(false);
  };

  const deleteHistoryByIndex = () => {
    paymentHistory.splice(historyIndex, 1);
    setFieldValue('paymentHistory', [...paymentHistory]);
  };

  const deleteHistory = () => {
    closeDeletePopup();
    deleteHistoryByIndex();
  };

  const handleDeleteHistory = (index) => {
    setHistoryIndex(index);
    openDeletePopup();
  };

  return (
    <Accordion className={commonStyles.accordion} expanded={true}>
      <AccordionSummary
        aria-controls='panel1a-content'
        id='panel1a-header'
        className={`${commonStyles.accordionSummary} ${styles.accordionBox}`}
      >
        <Box className={styles.paymentBox}>
          <IconButton>
            <Payment />
          </IconButton>
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
                {columnKeys.map((c, index) => {
                  const tooltipTxt = historyColumns[c].tooltip;
                  return (
                    <TableCell align='left' key={`${c}_${index}`}>
                      <Box className={tooltipTxt && styles.attachmentTableCell}>
                        {historyColumns[c].label}
                        {tooltipTxt && (
                          <Tooltip title={tooltipTxt}>
                            <IconButton>
                              <Error />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Box>
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {paymentHistory?.map((row, index) => (
                <TableRow key={`${row.name}_${index}`}>
                  {columnKeys.map((columnKey) => {
                    const column = historyColumns[columnKey];

                    const cell = EditableTableCell({
                      value: row[columnKey],
                      columnName: columnKey,
                      id: index + 1,
                      paymentHistory,
                      currency,
                      setFieldValue,
                      touched,
                      errors,
                      handleBlur,
                    });

                    return (
                      <TableCell
                        key={`${columnKey}_${row.id}`}
                        className={styles.historyCell}
                      >
                        {cell[column.type]}
                      </TableCell>
                    );
                  })}
                  {/*Delete Row*/}
                  <TableCell key={`delete_${row.id}`}>
                    <IconButton onClick={() => handleDeleteHistory(index)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
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

      {/*Delete History popup*/}
      <ConfirmDialog
        open={deletePopupOpened}
        title='Delete Item'
        message='Are you sure you want to delete selected payment?'
        confirmButton={{ focus: false, txt: 'Delete', color: 'error' }}
        onClose={closeDeletePopup}
        onConfirm={deleteHistory}
      />
    </Accordion>
  );
}
