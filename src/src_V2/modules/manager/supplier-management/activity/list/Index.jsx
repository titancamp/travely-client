import * as React from 'react';
import { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
} from '@mui/material';
import FilterBlock from './FilterBlock';
import DialogManager from '../dialogs/Index';
import { HeadCells, TableRows } from '../constants';
import TableMenuActions from '../../../supplier-management/components/tableVerticalActionsMenu/Menu';
import {
  EnhancedTableHead,
  getComparator,
  stableSort,
} from '../../components/enhancedTableHead/EnhancedTableHead';
import styles from './style.module.css';

export default function ActivityList() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [dialogManagerState, onShowHideDialog] = useState({ open: false });

  const addClass = (e) => {
    e.target.parentElement.classList.add('moreVertIconTr');
  };

  const removeClass = (e) => {
    e.target.parentElement.classList.remove('moreVertIconTr');
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - TableRows.length) : 0;

  function openAccommodationDetailsDialog() {
    onShowHideDialog({
      open: true,
      mode: 'activityDetails',
      actions: {},
    });
  }

  return (
    <>
      <FilterBlock />
      <Box className={styles.table}>
        <Paper>
          <TableContainer>
            <Table size='medium'>
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={TableRows.length}
                headCells={HeadCells}
              />
              <TableBody>
                {stableSort(TableRows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-${index}`;
                    return (
                      <TableRow
                        hover
                        tabIndex={-1}
                        key={index}
                        onClick={openAccommodationDetailsDialog}
                        onMouseEnter={addClass}
                        onMouseLeave={removeClass}
                      >
                        <TableCell component='th' id={labelId} scope='row' padding='none'>
                          {row.name}
                        </TableCell>
                        <TableCell align='left'>{row.destination}</TableCell>
                        <TableCell align='left'>{row.startPoint}</TableCell>
                        <TableCell align='left'>{row.duration}</TableCell>
                        <TableCell align='left'>
                          {row.attributes.map((el, index) => (
                            <span key={index}>{`${el} `}</span>
                          ))}
                        </TableCell>
                        <TableCell align='left'>{row.pricePerPerson}</TableCell>
                        <TableCell
                          align='right'
                          onClick={(event) => {
                            event.stopPropagation();
                          }}
                        >
                          <Box>
                            <TableMenuActions />
                          </Box>
                        </TableCell>
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
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={TableRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
      <DialogManager data={dialogManagerState} onShowHideDialog={onShowHideDialog} />
    </>
  );
}
