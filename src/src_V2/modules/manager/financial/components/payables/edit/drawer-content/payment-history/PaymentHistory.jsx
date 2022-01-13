import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControl,
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

import { useState } from 'react';

import creditCard from '../../../../../../../../assets/icons/credit-card.png';
import commonStyles from '../style.module.css';
import styles from './PaymentHistory.module.css';
import tableStyles from '../../../table/PayableTable.module.css';
// import { generateDate } from '../../../../../../../../utils';
import { NoData, LoadingSpinner, TooltipText } from '../../../../../../../../components';
import { TableBodyWrapper /* TableCellWrapper */ } from '../../../table/PayableTable';
import Upload from '../../../../../../supplier-management/components/add-attachment/AddAttachment';

const columnTypes = {
  text: 'text',
  price: 'price',
  date: 'date',
  select: 'select',
  file: 'file',
};

const columns = {
  invoiceId: {
    label: 'Invoice ID',
    type: columnTypes.text,
  },
  paidAmount: {
    label: 'Paid Amount',
    type: columnTypes.price,
  },
  paymentDate: {
    label: 'Payment Date',
    type: columnTypes.date,
  },
  paymentType: {
    label: 'Payment Type',
    type: columnTypes.select,
  },
  attachment: {
    label: 'Attachment',
    type: columnTypes.file,
  },
};

const EditableTableCell = ({ data, text }) => {
  // const [input, setInput] = useState(data);

  const onChange = ({ target: { value } }) => {
    console.log(value);

    // setInput(value);
  };

  return {
    [columnTypes.text]: (
      <TextField
        label={text}
        size='small'
        variant='outlined'
        value={data}
        onChange={(e) => onChange(e)}
      />
    ),
    [columnTypes.price]: (
      <TextField label={text} size='small' variant='outlined' value={data} />
    ),
    [columnTypes.date]: null,
    [columnTypes.select]: (
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Type</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={data}
          onChange={(e) => onChange(e)}
          label='Type'
          size='small'
          variant='outlined'
        >
          <MenuItem value={'Cash'}>Cash</MenuItem>
          <MenuItem value={'Transfer'}>Transfer</MenuItem>
        </Select>
      </FormControl>
    ),
    [columnTypes.file]: <Upload formikRef={{ errors: {} }} label='Upload' />,
    // [columnTypes.icon]: <AttachFile />
  };
};

export default function PaymentHistory({ history }) {
  const loading = false;
  const [data, setData] = useState(history || []);

  console.log(data);

  const addPayment = () => {
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
  };

  const AddPaymentBtn = () => {
    return (
      <Button variant='contained' onClick={addPayment}>
        + Add payment
      </Button>
    );
  };

  const columnKeys = Object.keys(columns);

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
                  {columnKeys.map((c) => (
                    <TableCell
                      align='left'
                      key={c}
                      className={`${tableStyles.tableCell} ${tableStyles.tableHeaderCell}`}
                    >
                      <TooltipText text={columns[c].label} />
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {data.length ? (
                /*Usual Rows*/
                <TableBody className={`${tableStyles.tableBody}`}>
                  {data.map((row, i) => {
                    return (
                      <TableRow key={`${row.id}_${i}`} className={tableStyles.tableRow}>
                        {columnKeys.map((c) => {
                          const column = columns[c];
                          const cell = EditableTableCell({
                            data: row[c],
                            text: column.label,
                          });

                          return (
                            <TableCell
                              key={`${c}_${row.id}_${i}`}
                              className={tableStyles.tableCell}
                            >
                              {cell[column.type]}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              ) : loading ? (
                // todo hide scroll when loading and there is no data
                <TableBodyWrapper>
                  {/*Loading*/}
                  {/*todo correct loading styles*/}
                  <LoadingSpinner />
                </TableBodyWrapper>
              ) : (
                /*No Data*/
                <TableBody>
                  <TableRow className={tableStyles.whiteTableCell}>
                    <TableCell colSpan={columnKeys.length}>
                      <Box className={tableStyles.noDataBox}>
                        <NoData className={styles.noData} />
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableBody>
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
