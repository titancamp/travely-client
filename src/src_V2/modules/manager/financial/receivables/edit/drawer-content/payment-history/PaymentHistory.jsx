import { CloudUpload, Delete, Error, Payment } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
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
import { useState } from 'react';

import { ConfirmDialog, NoData } from '../../../../../../../components';
import { paymentHistoryInitialValues } from '../../../../../../../utils/schemas';
import { DateInput } from '../../../../components';
import {
  PaymentType,
  receivablePaymentHistoryColumnTypes as columnTypes,
  receivablePaymentHistoryColumns as columns,
} from '../../../../constants';
import commonStyles from '../style.module.css';
import styles from './PaymentHistory.module.css';

const EditableTableCell = ({
  value,
  columnName,
  id,
  paymentHistory,
  setFieldValue,
  touched,
  errors,
  currency,
}) => {
  const error = errors && Object.keys(errors).length && errors[id - 1];

  const handleHistoryChange = (newValue, name) => {
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
        name={columnName}
        value={value}
        key={id}
        onChange={({ target: { value } }) => handleHistoryChange(value, columnName)}
        error={touched[columnName] && error[columnName]}
        helperText={touched[columnName] && error[columnName]}
      />
    ),
    [columnTypes.price]: (
      <TextField
        size='small'
        variant='outlined'
        name={columnName}
        value={value}
        key={id}
        className={styles.price}
        onChange={({ target: { value } }) => handleHistoryChange(value, columnName)}
        error={touched[columnName] && error[columnName]}
        helperText={touched[columnName] && error[columnName]}
        InputProps={{
          startAdornment: <InputAdornment position='start'>{currency}</InputAdornment>,
        }}
      />
    ),
    [columnTypes.date]: (
      <DateInput
        name='dueDate'
        value={value}
        searchHandler={(value) => handleHistoryChange(value, columnName)}
      />
    ),
    [columnTypes.select]: (
      <FormControl fullWidth>
        <Select
          size='small'
          variant='outlined'
          name={columnName}
          value={value}
          onChange={({ target: { value } }) => handleHistoryChange(value, columnName)}
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
    [columnTypes.checkbox]: (
      <Checkbox
        checked={value}
        onChange={({ target: { checked } }) => handleHistoryChange(checked, columnName)}
      />
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
  errors,
  touched,
  setFieldValue,
  currency,
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
                {columnKeys.map((c) => {
                  const tooltipTxt = historyColumns[c].tooltip;
                  return (
                    <TableCell align='left' key={c}>
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
              {paymentHistory?.map((row, i) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {columnKeys.map((columnKey) => {
                    const column = historyColumns[columnKey];

                    const cell = EditableTableCell({
                      value: row[columnKey],
                      columnName: columnKey,
                      id: i + 1,
                      paymentHistory,
                      setFieldValue,
                      touched,
                      errors,
                      currency,
                    });

                    return (
                      <TableCell
                        key={`${columnKey}_${row.id}_${i}`}
                        className={styles.historyCell}
                      >
                        {cell[column.type]}
                      </TableCell>
                    );
                  })}
                  {/*Delete Row*/}
                  <TableCell>
                    <IconButton onClick={() => handleDeleteHistory(i)}>
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
