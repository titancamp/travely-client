import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Paper,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableSortLabel,
  TableContainer,
  TablePagination,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { Container } from '../../../../../components';
import { managerSidebarConfig } from '../../../config';
import FilterBlock from './FilterBlock';
import DialogManager from '../dialogs/Index';

import styles from './style.module.css';
import AccommodationActions from './Menu';

function createData(name, car, type, city, contactNumber, contactPerson) {
  return { name, car, type, city, contactNumber, contactPerson };
}

const rows = [
  createData(
    'Auto Park Name Example',
    'Hyundai Veloster (st4)',
    'Transportation Agency',
    'Abovyan',
    '+374 11 11 11 11',
    'Name Lastname'
  ),
  createData(
    'Savannah Nguyen',
    'Hyundai Veloster (st4)',
    'Individual Contractor',
    'Yerevan',
    '+374 11 11 11 11',
    'Name Lastname'
  ),
  createData(
    'Kathryn Murphy',
    'Volkswagen Touareg (st6)',
    'Transportation Agency',
    'Dilijan',
    '+374 11 11 11 11',
    'Name Lastname'
  ),
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

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'car',
    numeric: true,
    disablePadding: false,
    label: 'Car',
  },
  {
    id: 'type',
    numeric: true,
    disablePadding: false,
    label: 'Type',
  },
  {
    id: 'city',
    numeric: true,
    disablePadding: false,
    label: 'City',
  },
  {
    id: 'contactNumber',
    numeric: true,
    disablePadding: false,
    label: 'Contact number',
  },
  {
    id: 'contactPerson',
    numeric: true,
    disablePadding: false,
    label: 'Contact Person',
  },
  {
    id: 'actions',
    numeric: true,
    disablePadding: false,
    label: '',
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow className={styles.tableTitles}>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
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
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default function TransportationList() {
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  function openAccommodationDetailsDialog() {
    onShowHideDialog({
      open: true,
      mode: 'transportationDetails',
      actions: {},
    });
  }

  return (
    <Container managerSidebarConfig={managerSidebarConfig}>
      <FilterBlock />
      <Box className={styles.table}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size='medium'>
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-${index}`;
                    return (
                      <TableRow
                        hover
                        tabIndex={-1}
                        key={row.name}
                        onClick={openAccommodationDetailsDialog}
                        onMouseEnter={addClass}
                        onMouseLeave={removeClass}
                      >
                        <TableCell component='th' id={labelId} scope='row' padding='none'>
                          {row.name}
                        </TableCell>
                        <TableCell align='left'>{row.car}</TableCell>
                        <TableCell align='left'>{row.type}</TableCell>
                        <TableCell align='left'>{row.city}</TableCell>
                        <TableCell align='left'>{row.contactNumber}</TableCell>
                        <TableCell align='left'>{row.contactPerson}</TableCell>
                        <TableCell
                          align='right'
                          onClick={(event) => {
                            event.stopPropagation();
                          }}
                        >
                          <Box>
                            <AccommodationActions />
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
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
      <DialogManager data={dialogManagerState} onShowHideDialog={onShowHideDialog} />
    </Container>
  );
}
