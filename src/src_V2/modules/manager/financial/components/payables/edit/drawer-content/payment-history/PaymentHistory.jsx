import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  InputLabel,
  MenuItem,
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
import { useState, useCallback } from 'react';

import creditCard from '../../../../../../../../assets/icons/credit-card.png';
import commonStyles from '../style.module.css';
import styles from './PaymentHistory.module.css';
import tableStyles from '../../../table/PayableTable.module.css';
import { generateDate } from '../../../../../../../../utils';
import { NoData, LoadingSpinner, TooltipText } from '../../../../../../../../components';
import { TableBodyWrapper, TableCellWrapper } from '../../../table/PayableTable';

const inputTypes = {
  text: 'text',
  price: 'price',
  date: 'date',
  select: 'select',
  file: 'file',
};

const columns = [
  { id: 'invoiceId', label: 'Invoice ID' },
  { id: 'paidAmount', label: 'Paid Amount' },
  { id: 'paymentDate', label: 'Payment Date' },
  { id: 'paymentType', label: 'Payment Type' },
  { id: 'attachment', label: 'Attachment' },
];

const EditableTableCell = ({ rowValue, type, inputLabel }) => {
  const [input, setInput] = useState(rowValue);

  return (
    <TableCellWrapper>
      {(() => {
        switch (type) {
          case inputTypes.text:
            return (
              <TextField
                label={inputLabel}
                size='small'
                variant='outlined'
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            );
          case inputTypes.price:
            return (
              <TextField
                label={inputLabel}
                size='small'
                variant='outlined'
                value={input}
              />
            );
          case inputTypes.date:
            return (
              <TextField
                label={inputLabel}
                size='small'
                variant='outlined'
                value={input}
              />
            );
          case inputTypes.select:
            return (
              <>
                <InputLabel id='demo-simple-select-label'>Type</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={rowValue}
                  onChange={(e) => setInput(e.value)}
                  autoWidth
                  label='Type'
                >
                  <MenuItem value={'Cash'}>Cash</MenuItem>
                  <MenuItem value={'Transfer'}>Transfer</MenuItem>
                </Select>
              </>
            );
          case inputTypes.file:
            return (
              <TextField
                label={inputLabel}
                size='small'
                variant='outlined'
                value={input}
              />
            );
          default:
            return <TooltipText text={input || ''} />;
        }
      })()}
    </TableCellWrapper>
  );
};

export default function PaymentHistory({ history }) {
  const loading = false;
  const [data, setData] = useState(history || []);

  const addPayment = useCallback(() => {
    setData((d) => {
      return [
        {
          invoiceId: '',
          paidAmount: '',
          paymentDate: '',
          paymentType: 'Cash',
          attachment: null,
        },
        ...d,
      ];
    });
  }, [data]);

  const AddPaymentBtn = useCallback(() => {
    return (
      <Button variant='contained' onClick={addPayment}>
        + Add payment
      </Button>
    );
  }, [addPayment]);

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
            {history?.length && (
              <span className={commonStyles.detailsCount}>({history.length})</span>
            )}
          </Typography>
        </Box>
        {/* <Box>{history?.length && <AddPaymentBtn />}</Box> */}
        <Box>
          <AddPaymentBtn />
        </Box>
      </AccordionSummary>
      <AccordionDetails className={commonStyles.accordionDetails}>
        <Box>
          <TableContainer className={tableStyles.tableContainer}>
            <Table aria-labelledby='tableTitle' padding='none'>
              <TableHead className={tableStyles.tableHead}>
                <TableRow>
                  {columns.map((headCell) => (
                    <TableCell
                      align='left'
                      key={headCell.id}
                      className={`${tableStyles.tableCell} ${tableStyles.tableHeaderCell}`}
                    >
                      <TooltipText text={headCell.label} />
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {data.length ? (
                <>
                  {/*Usual Rows*/}
                  <TableBody className={`${tableStyles.tableBody}`}>
                    {data.map((row) => {
                      return (
                        <>
                          <TableRow key={row.invoiceId} className={tableStyles.tableRow}>
                            <EditableTableCell
                              rowValue={row.invoiceId}
                              type={inputTypes.text}
                              inputLabel={'Invoice ID'}
                            />
                            <EditableTableCell
                              rowValue={row.paidAmount}
                              type={inputTypes.text}
                              inputLabel={'Paid Amount'}
                            />
                            <EditableTableCell
                              rowValue={generateDate(row.paymentDate)}
                              /* type={inputTypes.date} */ inputLabel={'Payment Date'}
                            />
                            <EditableTableCell
                              rowValue={row.paymentType}
                              type={inputTypes.select}
                              inputLabel={'Payment Type'}
                            />
                            <EditableTableCell
                              rowValue={row.attachment}
                              /* type={inputTypes.file} */ inputLabel={'Attachment'}
                            />
                          </TableRow>
                        </>
                      );
                    })}
                  </TableBody>
                </>
              ) : loading ? (
                // todo hide scroll when loading and there is no data
                <TableBodyWrapper>
                  {/*Loading*/}
                  {/*todo correct loading styles*/}
                  <LoadingSpinner />
                </TableBodyWrapper>
              ) : (
                <TableBodyWrapper rowClassName={tableStyles.whiteTableCell}>
                  {/*No Data*/}
                  <Box className={tableStyles.noData}>
                    <NoData />
                  </Box>
                </TableBodyWrapper>
              )}
            </Table>
          </TableContainer>
          {/* {!history?.length && (
            <Box className={styles.noDataBox}>
              <NoData className={styles.noData} />
              <AddPaymentBtn />
            </Box>
          )} */}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
