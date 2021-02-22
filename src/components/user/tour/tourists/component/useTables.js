import React, { useState } from "react";
import { Table, TableCell, TableHead, TablePagination, TableRow, TableSortLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/index";


const useStyles = makeStyles(theme => ({
      table: {
        marginTop: theme.spacing(3),
        "& thead th": {
          fontWeight: "600",
          color: theme.palette.primary.dark,
          backgroundColor: theme.palette.success.light,
          minWidth: 150
        }
      },

      "& tbody td": {
        fontWeight: "300"
      },

      "& tbody tr:hover": {
        backgroundColor: "#fffbf2",
        cursor: "pointer"
      }
    }
  )
);

export default function useTables(records, headCells, filterFn) {

  const classes = useStyles();

  const pages = [5, 10, 15];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();


  const TblContainer = props => (
    <Table className={classes.table}>
      {props.children}
    </Table>
  );

  const TblHead = props => {

    const handleSortRequest = cellId => {
      const isAsc = orderBy === cellId && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(cellId);

    };
    return (
      <TableHead>
        <TableRow>
          {

            headCells.map(headCell => (
              <TableCell key={headCell.id}
                         sortDirection={orderBy === headCell.id ? order : false}>
                {headCell.disableSorting ?
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : "asc"}
                    onClick={() => {
                      handleSortRequest(headCell.id);
                    }}>
                    {headCell.label}
                  </TableSortLabel> : headCell.label
                }
              </TableCell>
            ))
          }

        </TableRow>
      </TableHead>
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setOrderBy(null);

  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };


  const recordsAfterPagingAndSorting = () => {
    return filterFn.fn(records).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  const TblPagination = () => (<TablePagination
    component="div"
    page={page}
    rowsPerPageOptions={pages}
    rowsPerPage={rowsPerPage}
    count={records.length}
    onChangePage={handleChangePage}
    onChangeRowsPerPage={handleChangeRowsPerPage}
  />);

  return {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting

  };
}
