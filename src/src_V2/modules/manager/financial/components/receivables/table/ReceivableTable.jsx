import { useState } from 'react';
import {
  Box,
  Checkbox,
  Chip,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
} from '@mui/material';
import { AttachFile } from '@mui/icons-material';
import { visuallyHidden } from '@mui/utils';
import { deepPurple, green, orange, pink } from '@mui/material/colors';

import { generateDate } from '../../../../../../utils';
import { PaymentStatus } from '../../../constants';
import { NoData, TooltipText } from '../../../../../../components';
import EditDrawer from '../edit/drawer/EditDrawer';
import styles from './ReceivableTable.module.css';

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

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar className={styles.toolbar}>
      {!!numSelected && (
        <Typography component='div'>
          <span className={styles.selectedCountText}>Selected rows</span>{' '}
          <span className={styles.selectedCountNum}>{numSelected}</span>
        </Typography>
      )}
    </Toolbar>
  );
};

export const EnhancedTableHead = (props) => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    columns,
  } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className={styles.tableHead}>
      <TableRow>
        <TableCell padding='checkbox' className={styles.tableCheckboxCell}>
          <Checkbox
            color='primary'
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
            align='left'
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
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export const TableCellWrapper = ({ children }) => (
  <TableCell className={styles.tableCell}>{children}</TableCell>
);

export const TableBodyWrapper = ({ children, rowClassName }) => (
  <TableBody>
    <TableRow className={rowClassName && rowClassName}>
      <TableCell>{children}</TableCell>
    </TableRow>
  </TableBody>
);

export const TooltipTableCell = ({ rowValue }) => {
  return (
    <TableCellWrapper>
      <TooltipText text={rowValue} />
    </TableCellWrapper>
  );
};

const ReceivableStatuses = ({ statusNum }) => {
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
      return (
        <Chip
          label={statusName}
          className={`${styles.canceledReceivableStatus} ${styles.statusChip}`}
        />
      );
  }

  return (
    <Chip
      label={statusName}
      style={{ color, border: `1px solid ${color}` }}
      className={`${styles.whiteTableCell} ${styles.statusChip}`}
    />
  );
};

const InvoiceAttachment = ({ attachment }) => (
  <>{attachment ? <AttachFile className={styles.attachmentImg} /> : '--'}</>
);

export default function ReceivableTable({
  receivables,
  columns,
  receivablesLoading,
  rowsPerPageOptions,
}) {
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('createdDate');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const [drawerState, setDrawerState] = useState({
    isOpened: false,
    drawerEvent: null,
  });
  const [clickedRow, setClickedRow] = useState(null);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - receivables.length) : 0;

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const showTableCondition = !receivablesLoading && !!receivables.length;

  const rowsAfterPagingAndSorting = () => {
    return receivables
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
      const newSelecteds = receivables.map((n) => n.paymentId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleCheckboxChange = (event, paymentId) => {
    event.stopPropagation();

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

  const handleRowClick = (event, row) => {
    setDrawerState({
      isOpened: true,
      drawerEvent: event,
    });
    setClickedRow({ ...row });
  };

  const handleDrawerOpen = (opened) => {
    if (!opened) {
      setClickedRow(null);
    }

    setDrawerState({
      ...drawerState,
      isOpened: opened,
    });
  };

  return (
    <Box>
      <Paper>
        <TableContainer
          className={`${styles.tableContainer} ${
            !showTableCondition && styles.hiddenOverflow
          }`}
        >
          <Table aria-labelledby='tableTitle' padding='none'>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={receivables.length}
              columns={columns}
            />
            {receivables.length ? (
              <>
                {/*Usual Rows*/}
                <TableBody className={`${styles.tableBody} ${styles.mainTableBox}`}>
                  <>
                    {rowsAfterPagingAndSorting().map((row, index) => {
                      const isItemSelected = isSelected(row.receivableId);
                      const labelId = `enhanced-table-checkbox-${index}`;
                      let indeterminateCheck = false;
                      let checkedCount = 0;

                      for (const i of row.paymentHistory) {
                        checkedCount += i.invoiceSentFlag;
                      }

                      if (checkedCount && checkedCount !== row.paymentHistory.length) {
                        indeterminateCheck = true;
                      }

                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleRowClick(event, row)}
                          role='checkbox'
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.paymentId}
                          selected={isItemSelected}
                          className={styles.tableRow}
                        >
                          <TableCell
                            padding='checkbox'
                            className={styles.tableCheckboxCell}
                          >
                            <Checkbox
                              color='primary'
                              checked={isItemSelected}
                              onClick={(event) =>
                                handleCheckboxChange(event, row.paymentId)
                              }
                              inputProps={{
                                'aria-labelledby': labelId,
                              }}
                            />
                          </TableCell>
                          <TooltipTableCell rowValue={row.receivableId} />
                          <TooltipTableCell rowValue={row.tourId} />
                          <TooltipTableCell rowValue={row.tourName} />
                          <TooltipTableCell rowValue={row.invoiceId} />
                          <TooltipTableCell rowValue={row.partner} />
                          <TooltipTableCell rowValue={row.currency} />
                          <TooltipTableCell rowValue={row.totalAmount} />
                          <TableCellWrapper>
                            <Checkbox
                              checked={checkedCount === row.paymentHistory.length}
                              indeterminate={indeterminateCheck}
                              disabled
                            />
                          </TableCellWrapper>
                          <TooltipTableCell rowValue={row.paidAmount} />
                          <TooltipTableCell rowValue={row.remainingAmount} />
                          <TableCellWrapper>
                            <ReceivableStatuses statusNum={row.status} />
                          </TableCellWrapper>
                          <TooltipTableCell rowValue={generateDate(row.dueDate)} />
                          <TooltipTableCell rowValue={generateDate(row.createdDate)} />
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
                  </>
                </TableBody>
              </>
            ) : receivablesLoading ? (
              <TableBodyWrapper rowClassName={styles.whiteTableCell}>
                {/*Loading*/}
                <CircularProgress className={styles.loadingSpinner} size={100} />
              </TableBodyWrapper>
            ) : (
              <TableBodyWrapper rowClassName={styles.whiteTableCell}>
                {/*No Data*/}
                <Box className={styles.noData}>
                  <NoData />
                </Box>
              </TableBodyWrapper>
            )}
          </Table>
        </TableContainer>
        {showTableCondition && (
          <div className={styles.tableFooter}>
            <EnhancedTableToolbar numSelected={selected.length} />
            <TablePagination
              className={styles.tablePagination}
              rowsPerPageOptions={rowsPerPageOptions}
              component='div'
              count={receivables.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage={
                <span className={styles.tablePaginationText}>Rows per page:</span>
              }
            />
          </div>
        )}
      </Paper>

      {!!clickedRow && (
        <EditDrawer
          drawerState={drawerState}
          clickedRow={clickedRow}
          isOpenedChangeHandler={handleDrawerOpen}
        />
      )}
    </Box>
  );
}
