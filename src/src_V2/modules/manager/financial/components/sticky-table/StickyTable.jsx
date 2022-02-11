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
import { generateDate, moneyMask } from '../../../../../utils';
import {
  columnTypes,
  rowsPerPageOptions,
  stickyFooterColumnTypes,
} from '../../constants';
import styles from './StickyTable.module.css';

const TableCellTypes = ({ rowValue, customTag, ifEmpty }) => {
  const cells = {
    [columnTypes.usualRow]: <TooltipTableCell rowValue={rowValue ? rowValue : '--'} />,
    [columnTypes.moneyMask]: <TooltipTableCell rowValue={moneyMask(rowValue)} />,
    [columnTypes.date]: (
      <TooltipTableCell rowValue={rowValue ? generateDate(rowValue) : '--'} />
    ),
  };

  if (customTag) {
    cells[columnTypes.custom] =
      rowValue || !ifEmpty ? (
        customTag(rowValue)
      ) : (
        <TooltipTableCell rowValue={ifEmpty} />
      );
  }

  return cells;
};

const StickyRowCellTypes = ({ rowValue, customTag }) => {
  const cells = {
    [stickyFooterColumnTypes.usualRow]: <TooltipTableCell rowValue={rowValue} />,
    [stickyFooterColumnTypes.moneyMask]: (
      <TooltipTableCell rowValue={moneyMask(rowValue)} />
    ),
  };

  if (customTag) {
    cells[stickyFooterColumnTypes.custom] = customTag(rowValue);
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
  showCheckbox,
}) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className={styles.tableHead}>
      <TableRow>
        {showCheckbox && (
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
        )}
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
  stickyFooterColumns,
  stickyFooterData,
  showCheckbox = true,
  rowsPerPageNumbers = rowsPerPageOptions,
  handleClickedRow = () => void 0,
  handleDrawerState = () => void 0,
  comparator = () => void 0,
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
      .sort(comparator(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [data, order, page]);

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
            showCheckbox={showCheckbox}
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
                        {showCheckbox && (
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
                        )}

                        {Object.keys(columns).map((column) => {
                          const columnValue = columns[column];
                          const cell = TableCellTypes({
                            rowValue: row[column],
                            customTag: columnValue.tag,
                            ifEmpty: columnValue.ifEmpty,
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
              {showStickyFooter && (
                <TableBody className={`${styles.tableBody} ${styles.tableStickyBox}`}>
                  {showTableCondition && (
                    <TableRow className={styles.totalFooter}>
                      {showCheckbox && (
                        <TableCell
                          padding='checkbox'
                          className={styles.tableCheckboxCell}
                        >
                          <Checkbox className={styles.totalFooterChkBox} />
                        </TableCell>
                      )}
                      {Object.keys(stickyFooterColumns).map((column) => {
                        const columnValue = stickyFooterColumns[column];
                        const cell = StickyRowCellTypes({
                          rowValue: stickyFooterData[column],
                          customTag: columnValue.tag,
                        });

                        return <Fragment key={column}>{cell[columnValue.type]}</Fragment>;
                      })}
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
