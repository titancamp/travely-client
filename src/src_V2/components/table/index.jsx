import { DataObject } from '@mui/icons-material';
import {
  Backdrop,
  Box,
  LinearProgress,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';

import { noop } from '../../utils';
import styles from './styles';

const EmptyContent = (
  <Box>
    <DataObject />
    <Typography>There is no data to display</Typography>
  </Box>
);

const Table = ({
  totalCount,
  emptyContent = EmptyContent,
  page,
  rowsPerPage = 20,
  hasPagination = false,
  isLoading,
  onRowClick = noop,
  handlePageChange = noop,
  handleChangeRowsPerPage = noop,
  data,
  rowsPerPageOptions = [10, 20, 30, 40, 50],
}) => {
  const { head, rows } = data;
  return (
    <TableContainer sx={styles.tableContainer}>
      <MuiTable>
        <TableHead>
          {head.map(({ content, key, styles: style = {} }) => (
            <TableCell
              component='div'
              key={key}
              sx={[style, styles.headCell]}
              variant='head'
              size='small'
            >
              {typeof content === 'function' ? content() : content}
            </TableCell>
          ))}
        </TableHead>
        {isLoading && <LinearProgress />}
        <TableBody component='div'>
          <>
            {rows.length === 0 && !isLoading && (
              <Box display='flex' alignItems='center' justifyContent='center'>
                {emptyContent}
              </Box>
            )}
            {rows.map(({ data, columns }) => (
              <TableRow onClick={() => onRowClick(data)} key={data.id}>
                {columns.map(({ key, content, defaultContent, styles }) => (
                  <TableCell sx={styles} key={key} variant='body' size='small'>
                    {typeof content === 'function'
                      ? content(data)
                      : content ?? defaultContent}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </>
          <Backdrop open={isLoading} />
        </TableBody>
        {hasPagination && rows.length !== 0 && (
          <TableFooter component='div'>
            <TableRow component='div'>
              <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                component='div'
                page={page}
                count={totalCount}
                rowsPerPage={rowsPerPage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                variant='footer'
                onPageChange={handlePageChange}
              />
            </TableRow>
          </TableFooter>
        )}
      </MuiTable>
    </TableContainer>
  );
};

export default Table;
