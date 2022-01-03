import { useEffect, useRef, useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Paper,
  Checkbox,
  Tooltip,
  Typography,
  Toolbar,
  Chip,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { deepPurple, green, orange, pink } from '@mui/material/colors';

import { Container, Layout, LoadingSpinner, NoData } from '../../../../../components';
import { useHoverTooltip } from '../../../../../hooks';
import payablesList from '../../mock/payable';
import { managerSidebarConfig } from '../../../config';
import { PaymentStatus, PaymentType } from '../../constants';
import { generateDate } from '../../../../../utils';
import attachmentImage from '../../../../../assets/attachment.png';
import styles from './Payables.module.css';

const rowsPerPageOptions = [20, 50, 100];

const columns = [
  { id: 'paymentId', label: 'Payment ID' },
  { id: 'tourId', label: 'Tour ID' },
  { id: 'tourNam', label: 'Tour name' },
  { id: 'supplier', label: 'Supplier' },
  { id: 'plannedCost', label: 'Planed cost' },
  { id: 'actualCost', label: 'Actual cost' },
  { id: 'difference', label: 'Difference' },
  { id: 'paidCost', label: 'Paid' },
  { id: 'remaining', label: 'Remaining' },
  { id: 'status', label: 'Status' },
  { id: 'createdDate', label: 'Created date' },
  { id: 'invoiceId', label: 'Invoice ID' },
  { id: 'dueDate', label: 'Due date' },
  { id: 'paymentDate', label: 'Payment date' },
  { id: 'paymentType', label: 'Payment type' },
  { id: 'invoiceAttachment', label: 'Invoice Attachment' },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function TooltipText({ text }) {
  const textElementRef = useRef();

  const hoverStatus = useHoverTooltip(text, textElementRef);

  return (
    <Tooltip title={text} interactive="true" disableHoverListener={!hoverStatus}>
      <div ref={textElementRef} className={styles.tooltip}>
        {text}
      </div>
    </Tooltip>
  );
}

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar className={styles.toolbar}>
      {!!numSelected && (
        <Typography component="div">
          <span className={styles.selectedCountText}>Selected rows</span>{' '}
          <span className={styles.selectedCountNum}>{numSelected}</span>
        </Typography>
      )}
    </Toolbar>
  );
}

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className={styles.tableHead}>
      <TableRow>
        <TableCell padding="checkbox" className={styles.tableCheckboxCell}>
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {columns.map((headCell) => (
          <TableCell
            align="left"
            key={headCell.id}
            className={`${styles.tableCell} ${styles.tableHeaderCell}`}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <TooltipText text={headCell.label} />
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function TableCellWrapper({ children }) {
  return <TableCell className={styles.tableCell}>{children}</TableCell>;
}

function TooltipTableCell({ rowValue }) {
  return (
    <TableCellWrapper>
      <TooltipText text={rowValue} />
    </TableCellWrapper>
  );
}

function PayableStatuses({ statusNum }) {
  let color = null;
  const statusName = PaymentStatus[statusNum];

  switch (statusNum) {
    case PaymentStatus['Partially Paid']:
      color = orange[900];
      break;
    case PaymentStatus.Paid:
      color = green[600];
      break;
    case PaymentStatus.Overdue:
      color = pink[700];
      break;
    case PaymentStatus.Unpaid:
      color = deepPurple[800];
      break;
    default:
      return <Chip label={statusName} className={styles.canceledPayableStatus} />;
  }

  return (
    <Chip
      label={statusName}
      style={{ color, border: `1px solid ${color}` }}
      className={styles.whiteTableCell}
    />
  );
}

function InvoiceAttachment({ attachment }) {
  // todo Add attachment link to download
  return (
    <>
      {attachment ? (
        <Box
          component="img"
          alt="Attachment"
          src={attachmentImage}
          className={styles.attachmentImg}
        />
      ) : (
        '--'
      )}
    </>
  );
}

const PayableTable = ({ payables, payablesLoading }) => {
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('createdDate');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - payables.length) : 0;

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const rowsAfterPagingAndSorting = () => {
    return payables
      .slice()
      .sort(getComparator(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = payables.map((n) => n.paymentId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, paymentId) => {
    const selectedIndex = selected.indexOf(paymentId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, paymentId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      <Paper>
        <TableContainer className={styles.tableContainer}>
          <Table aria-labelledby="tableTitle" padding="none">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={payables.length}
            />
            <TableBody className={styles.tableBody}>
              {rowsAfterPagingAndSorting().map((row, index) => {
                const isItemSelected = isSelected(row.paymentId);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.paymentId)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.paymentId}
                    selected={isItemSelected}
                    className={styles.tableRow}
                  >
                    <TableCell padding="checkbox" className={styles.tableCheckboxCell}>
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TooltipTableCell rowValue={row.paymentId} />
                    <TooltipTableCell rowValue={row.tourId} />
                    <TooltipTableCell rowValue={row.tourName} />
                    <TooltipTableCell rowValue={row.supplier} />
                    <TooltipTableCell rowValue={row.plannedCost} />
                    <TooltipTableCell rowValue={row.actualCost} />
                    <TableCell
                      className={`${styles.tableCell} ${
                        row.difference > 0
                          ? styles.positiveTableCell
                          : row.difference < 0
                          ? styles.negativeTableCell
                          : styles.neutralTableCell
                      }`}
                    >
                      <TooltipText text={row.difference} />
                    </TableCell>
                    <TooltipTableCell rowValue={row.paidCost} />
                    <TooltipTableCell rowValue={row.remaining} />
                    <TableCellWrapper>
                      <PayableStatuses statusNum={row.status} />
                    </TableCellWrapper>
                    <TooltipTableCell rowValue={generateDate(row.createdDate)} />
                    <TooltipTableCell rowValue={row.invoiceId} />
                    <TooltipTableCell rowValue={generateDate(row.dueDate)} />
                    <TooltipTableCell rowValue={generateDate(row.paymentDate)} />
                    <TooltipTableCell rowValue={PaymentType[row.paymentType]} />
                    <TableCellWrapper>
                      <InvoiceAttachment attachment={row.invoiceAttachment} />
                    </TableCellWrapper>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          {payablesLoading ? <LoadingSpinner /> : !payables.length && <NoData />}
        </TableContainer>
        {!payablesLoading && !!payables.length && (
          <div className={styles.tableFooter}>
            <EnhancedTableToolbar numSelected={selected.length} />
            <TablePagination
              className={styles.tablePagination}
              rowsPerPageOptions={rowsPerPageOptions}
              component="div"
              count={payables.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage={<span className={styles.tablePaginationText}>Rows per page:</span>}
            />
          </div>
        )}
      </Paper>
    </Box>
  );
};

export default function Payables() {
  const [payables, setPayables] = useState([]);
  const [payablesLoading, setPayablesLoading] = useState(false);

  useEffect(() => {
    getPayables();
  }, []);

  // getting Payables from backend
  function getPayables() {
    setPayablesLoading(true);

    setTimeout(() => {
      processPayables(payablesList());
      setPayablesLoading(false);
    }, 0);
  }

  function processPayables(payables) {
    const processedPayables = [...payables].map((payable) => {
      payable.difference = payable.plannedCost - payable.actualCost;
      payable.remaining = payable.actualCost - payable.paidCost;
      return payable;
    });
    setPayables(processedPayables);
  }

  return (
    <Container managerSidebarConfig={managerSidebarConfig}>
      <Layout title="Payables">
        <PayableTable payables={payables} payablesLoading={payablesLoading} />
      </Layout>
    </Container>
  );
}
