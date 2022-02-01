import {
  Box,
  Checkbox,
  CircularProgress,
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
import { visuallyHidden } from '@mui/utils';
import { Fragment, useCallback, useState } from 'react';

import { NoData, TooltipText } from '../../../../../components';
import { generateArrayByRange, generateDate, moneyMask } from '../../../../../utils';
import { payableColumnTypes, rowsPerPageOptions } from '../../constants';
import styles from './StickyTable.module.css';

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

// todo duplication
function colorCondition(difference) {
  let style;
  if (difference > 0) {
    style = styles.positiveTableCell;
  } else if (difference < 0) {
    style = styles.negativeTableCell;
  } else {
    style = styles.neutralTableCell;
  }
  return style;
}

const TableCellTypes = ({ rowValue, customTag }) => {
  const cells = {
    [payableColumnTypes.usualRow]: <TooltipTableCell rowValue={rowValue} />,
    [payableColumnTypes.moneyMask]: <TooltipTableCell rowValue={moneyMask(rowValue)} />,
    [payableColumnTypes.date]: <TooltipTableCell rowValue={generateDate(rowValue)} />,
  };

  if (customTag) {
    cells[payableColumnTypes.custom] = customTag(rowValue);
  }

  return cells;
};

const EnhancedTableToolbar = ({ numSelected }) => (
  <Toolbar className={styles.toolbar}>
    {!!numSelected && (
      <Typography component='div'>
        <span className={styles.selectedCountText}>Selected rows</span>{' '}
        <span className={styles.selectedCountNum}>{numSelected}</span>
      </Typography>
    )}
  </Toolbar>
);

const EnhancedTableHead = ({
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
  columns,
}) => {
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
        {Object.keys(columns).map((headCell) => (
          <TableCell
            align='left'
            key={headCell}
            className={`${styles.tableCell} ${styles.tableHeaderCell}`}
            sortDirection={orderBy === headCell ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell}
              direction={orderBy === headCell ? order : 'asc'}
              onClick={createSortHandler(headCell)}
            >
              <TooltipText text={columns[headCell].label} />
              {orderBy === headCell ? (
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

const EmptyTableCellWrapper = ({ count }) =>
  generateArrayByRange(1, count).map((el, index) => <TableCellWrapper key={index} />);

const TableBodyWrapper = ({ children, rowClassName }) => (
  <TableBody>
    <TableRow className={rowClassName && rowClassName}>
      <TableCell>{children}</TableCell>
    </TableRow>
  </TableBody>
);

export const TableCellWrapper = ({ children }) => (
  <TableCell className={styles.tableCell}>{children}</TableCell>
);

export const TooltipTableCell = ({ rowValue }) => {
  return (
    <TableCellWrapper>
      <TooltipText text={rowValue} />
    </TableCellWrapper>
  );
};

export default function StickyTable({
  data,
  uniqueKey = 'id',
  columns,
  tableLoading = false,
  showStickyFooter = false,
  stickyFooterData,
  rowsPerPageNumbers = rowsPerPageOptions,
  handleClickedRow = () => void 0,
  handleDrawerState = () => void 0,
}) {
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('createdDate');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const showTableCondition = !tableLoading && !!data.length;

  const rowsAfterPagingAndSorting = useCallback(() => {
    return data
      .slice()
      .sort(getComparator(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [data, order]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n[uniqueKey]);
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
    const selection = window.getSelection();
    // don't trigger click event when there is a letter selection
    if (selection.type === 'Range') {
      return;
    }
    handleDrawerState({
      isOpened: true,
      drawerEvent: event,
    });
    handleClickedRow({ ...row });
  };

  return (
    <>
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
            rowCount={data.length}
            columns={columns}
          />
          {data.length ? (
            <>
              {/*Usual Rows*/}
              <TableBody className={`${styles.tableBody} ${styles.mainTableBox}`}>
                <>
                  {rowsAfterPagingAndSorting().map((row, index) => {
                    const isItemSelected = isSelected(row[uniqueKey]);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleRowClick(event, row)}
                        role='checkbox'
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row[uniqueKey]}
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
                              handleCheckboxChange(event, row[uniqueKey])
                            }
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell>

                        {Object.keys(columns).map((column) => {
                          const columnValue = columns[column];
                          const cell = TableCellTypes({
                            rowValue: row[column],
                            customTag: columnValue.tag,
                          });

                          return (
                            <Fragment key={`${column}_${row.id}`}>
                              {cell[columnValue.type]}
                            </Fragment>
                          );
                        })}
                      </TableRow>
                    );
                  })}

                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </>
              </TableBody>

              {/*Total Sticky Row*/}
              {/*todo move sticky row to columns as well*/}
              {showStickyFooter && (
                <TableBody className={`${styles.tableBody} ${styles.tableStickyBox}`}>
                  {showTableCondition && (
                    <TableRow className={styles.totalFooter}>
                      <TableCell padding='checkbox' className={styles.tableCheckboxCell}>
                        <Checkbox className={styles.totalFooterChkBox} />
                      </TableCell>
                      <TableCellWrapper>Total AMD</TableCellWrapper>
                      <EmptyTableCellWrapper count={4} />
                      <TooltipTableCell
                        rowValue={moneyMask(stickyFooterData.plannedCost)}
                      />
                      <TooltipTableCell
                        rowValue={moneyMask(stickyFooterData.actualCost)}
                      />
                      <TableCell
                        className={`${styles.tableCell} ${colorCondition(
                          stickyFooterData.difference
                        )}`}
                      >
                        <TooltipText text={moneyMask(stickyFooterData.difference)} />
                      </TableCell>
                      <TooltipTableCell rowValue={moneyMask(stickyFooterData.paidCost)} />
                      <TooltipTableCell
                        rowValue={moneyMask(stickyFooterData.remaining)}
                      />
                      <EmptyTableCellWrapper count={7} />
                    </TableRow>
                  )}
                </TableBody>
              )}
            </>
          ) : tableLoading ? (
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
            rowsPerPageOptions={rowsPerPageNumbers}
            component='div'
            count={data.length}
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
    </>
  );
}
