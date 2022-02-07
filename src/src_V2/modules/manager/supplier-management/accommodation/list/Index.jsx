<<<<<<< HEAD
import * as React from 'react';
import { useState } from 'react';
=======
>>>>>>> dev
import {
  Box,
  Button,
  Paper,
  Table,
<<<<<<< HEAD
  TableRow,
=======
>>>>>>> dev
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from '@mui/material';
<<<<<<< HEAD
import FilterBlock from './FilterBlock';
import { HeadCells, TableRows } from '../constants';
import DialogManager from '../dialogs/Index';
import {
  getComparator,
  stableSort,
} from '../../components/enhancedTableHead/EnhancedTableHead';
import TableMenuActions from '../../../supplier-management/components/tableVerticalActionsMenu/Menu';
import { EnhancedTableHead } from '../../../supplier-management/components/enhancedTableHead/EnhancedTableHead';

import styles from './style.module.css';
=======
import { visuallyHidden } from '@mui/utils';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useState } from 'react';

import DialogManager from '../dialogs/Index';
import FilterBlock from './FilterBlock';
import AccommodationActions from './Menu';
import styles from './style.module.css';

function createData(
  name,
  type,
  region,
  city,
  contactNumber,
  contactPerson,
  email,
  status
) {
  return { name, type, region, city, contactNumber, contactPerson, email, status };
}

const rows = [
  createData(
    'Mariot',
    'Hotel',
    'Kotayq',
    'Abovyan',
    '+374 11 11 11 11',
    'Name Lastname',
    'customer.care@marriott.com',
    <Button
      onClick={(event) => {
        event.stopPropagation();
      }}
      variant='contained'
      className={styles.btn}
      component='span'
    >
      Ready
    </Button>
  ),
  createData(
    'Tufenkyan',
    'Hotel',
    'Kotayq',
    'Abovyan',
    '+374 11 11 11 11',
    'Name Lastname',
    'customer.care@marriott.com',
    <Button
      onClick={(event) => {
        event.stopPropagation();
      }}
      variant='contained'
      className={`${styles.btn} ${styles.secondaryBtn}`}
      component='span'
    >
      Missed Price
    </Button>
  ),
  createData(
    'Multi rest',
    'Hotel',
    'Kotayq',
    'Abovyan',
    '+374 11 11 11 11',
    'Name Lastname',
    'customer.care@marriott.com',
    <Button
      onClick={(event) => {
        event.stopPropagation();
      }}
      variant='contained'
      className={styles.btn}
      component='span'
    >
      Ready
    </Button>
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
    id: 'type',
    numeric: true,
    disablePadding: false,
    label: 'Type',
  },
  {
    id: 'region',
    numeric: true,
    disablePadding: false,
    label: 'Region',
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
    id: 'email',
    numeric: true,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
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
            align={headCell.numeric ? 'right' : 'left'}
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
>>>>>>> dev

export default function AccommodationList() {
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
      mode: 'accommodationDetails',
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
                        key={row.name}
                        onClick={openAccommodationDetailsDialog}
                        onMouseEnter={addClass}
                        onMouseLeave={removeClass}
                      >
                        <TableCell component='th' id={labelId} scope='row' padding='none'>
                          {row.name}
                        </TableCell>
                        <TableCell align='left'>{row.type}</TableCell>
                        <TableCell align='left'>{row.region}</TableCell>
                        <TableCell align='left'>{row.city}</TableCell>
                        <TableCell align='left'>{row.contactNumber}</TableCell>
                        <TableCell align='left'>{row.contactPerson}</TableCell>
                        <TableCell align='left'>{row.email}</TableCell>
                        <TableCell align='left'>{row.status}</TableCell>
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
