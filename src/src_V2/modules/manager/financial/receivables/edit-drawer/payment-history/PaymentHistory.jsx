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
import { useRef, useState } from 'react';

import { ConfirmDialog, NoData, TooltipText } from '../../../../../../components';
import { receivablePaymentHistoryInitialValues as paymentHistoryInitialValues } from '../../../../../../utils/schemas';
import { DateInput } from '../../../components';
import {
  PaymentType,
  acceptedFileTypes,
  receivablePaymentHistoryColumnTypes as columnTypes,
  receivablePaymentHistoryColumns as columns,
} from '../../../constants';
import commonStyles from '../style.module.css';
import styles from './PaymentHistory.module.css';

const EditableTableCell = ({
  value,
  columnName,
  id,
  autoFocus,
  paymentHistory,
  setFieldValue,
  touched,
  errors,
  currency,
  handleBlur,
  handleUploadClick,
}) => {
  const error = errors && Object.keys(errors).length && errors[id - 1];
  const errorMessage = error && error[columnName] && touched[columnName];
  const helperText = touched && touched[columnName] && error && error[columnName];

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
        className={`adornmentInput ${styles.invoiceIdInput}`}
        name={columnName}
        value={value}
        autoFocus={autoFocus}
        onChange={({ target: { value } }) => handleHistoryChange(value, columnName)}
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
        className={`adornmentInput ${styles.priceInput}`}
        name={columnName}
        value={value}
        onChange={({ target: { value } }) => handleHistoryChange(value, columnName)}
        onBlur={handleBlur}
        error={!!errorMessage}
        helperText={helperText}
        InputProps={{
          startAdornment: <InputAdornment position='start'>{currency}</InputAdornment>,
        }}
      />
    ),
    [columnTypes.date]: (
      <DateInput
        className={styles.dateInput}
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
          className={styles.typeInput}
          name={columnName}
          value={value}
          onChange={({ target: { value } }) => handleHistoryChange(value, columnName)}
          onBlur={handleBlur}
        >
          <MenuItem value={PaymentType.Cash}>{PaymentType[1]}</MenuItem>
          <MenuItem value={PaymentType.Transfer}>{PaymentType[2]}</MenuItem>
        </Select>
      </FormControl>
    ),
    [columnTypes.attachment]: (
      <Button
        variant='outlined'
        endIcon={<CloudUpload />}
        className={styles.uploadBtn}
        name={columnName}
        onClick={() => handleUploadClick(id)}
      >
        {(value?.name && <TooltipText text={value.name} />) || 'Upload'}
      </Button>
    ),
    [columnTypes.checkbox]: (
      <Checkbox
        checked={!!value}
        className={styles.sentFlag}
        name={columnName}
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
  handleBlur,
  setFileError,
}) {
  const [deletePopupOpened, setDeletePopupOpened] = useState(false);
  const [historyIndex, setHistoryIndex] = useState(null);
  const hiddenFileInput = useRef(null);
  const historyColumns = columns();
  const columnKeys = Object.keys(historyColumns);

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

  const handleUploadClick = (id) => {
    setHistoryIndex(id);
    hiddenFileInput.current.click();
  };

  const handleAddPayment = () => {
    setFieldValue('paymentHistory', [
      ...paymentHistory,
      paymentHistoryInitialValues(paymentHistory.length + 1, true),
    ]);
  };

  const handleDeleteHistory = (index) => {
    setHistoryIndex(index);
    openDeletePopup();
  };

  const handleAddAttachment = (event) => {
    try {
      if (event.target.files) {
        const newFile = event.target.files[0];

        if (!acceptedFileTypes.includes(newFile.type) || newFile.size / 1024 ** 2 > 20) {
          return setFileError(
            `Supported file types are - ${acceptedFileTypes.join(', ')}`
          );
        } else {
          const modifiedHistory = paymentHistory.map((history) => {
            if (history.id === historyIndex) {
              history.attachment = newFile;
            }
            return history;
          });
          setFieldValue('paymentHistory', [...modifiedHistory]);
        }
      }
    } catch (error) {
      return setFileError('Upload Failed - Try again');
    }
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
                {columnKeys.map((columnKey, index) => {
                  const tooltipTxt = historyColumns[columnKey].tooltip;
                  return (
                    <TableCell align='left' key={`${columnKey}_${index}`}>
                      <Box className={tooltipTxt && styles.attachmentTableCell}>
                        {historyColumns[columnKey].label}
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
                <TableRow key={`${row.id}_${index}`}>
                  {columnKeys.map((columnKey) => {
                    const column = historyColumns[columnKey];

                    const cell = EditableTableCell({
                      value: row[columnKey],
                      columnName: columnKey,
                      id: index + 1,
                      autoFocus: row.autoFocus,
                      paymentHistory,
                      setFieldValue,
                      touched,
                      errors,
                      currency,
                      handleBlur,
                      handleUploadClick,
                    });

                    return (
                      <TableCell key={`${columnKey}_${row.id}_${index}`}>
                        {cell[column.type]}
                      </TableCell>
                    );
                  })}

                  {/*File input*/}
                  <TableCell>
                    <input
                      type='file'
                      className={styles.uploadInput}
                      ref={hiddenFileInput}
                      onChange={handleAddAttachment}
                      accept='image/*, .pdf'
                    />
                  </TableCell>

                  {/*Delete Row*/}
                  <TableCell>
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
