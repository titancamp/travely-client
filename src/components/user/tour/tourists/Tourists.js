import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import * as touristService from "./service/TouristService";
import { Add as AddIcon, Close as CloseIcon, Edit as EditIcon, Search } from "@material-ui/icons";
import TouristForm from "./TouristForm";
import Popup from "./component/Popup";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import InputAdornment from "@material-ui/core/InputAdornment";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import TablePagination from "@material-ui/core/TablePagination";
import TableBody from "@material-ui/core//TableBody";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ConfirmDialog from "./component/ConfirmDialog";


const useStyles = makeStyles(theme => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
    width: 2000
  },
  searchInput: {
    width: "15%"
  },
  newButton: {
    position: "absolute",
    right: "10px",
    color: theme.palette.grey[500]
  },
  table: {
    "& thead th": {
      color: theme.palette.grey[500]

    }
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[700]
  },
  editButton: {
    color: theme.palette.grey[700]
  }

}));

const headCells = [
  { id: "name", label: "Name" },
  { id: "phone", label: "Phone" },
  { id: "email", label: "Email" },
  { id: "birthDate", label: "Date of birth" },
  { id: "placeBirth", label: "Place of birth" },
  { id: "passportNum", label: "Passport nr." },
  { id: "issuedBy", label: "Issued by" },
  { id: "issueDate", label: "Issue Date" },
  { id: "expireDate", label: "Expire Date" },
  { id: "notes", label: "Notes" },
  { id: "actions", label: "" }

];

export default function Tourists() {


  const [records, setRecords] = useState(touristService.getAllTourists());
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [filterFn, setFilterFn] = useState({
    fn: items => {
      return items;
    }
  });
  const pages = [5, 10, 15];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [popupState, setPopupState] = useState({ isOpen: false, title: "" });
  const classes = useStyles();
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "" });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };


  const recordsAfterPagingAndSorting = () => {
    return filterFn.fn(records).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };


  const handleSearch = e => {
    let target = e.target;

    setFilterFn({
      fn: items => {
        if (target.value == "")
          return items;
        else
          return items.filter(x => (x.firstName + x.lastName).toUpperCase().includes(target.value.replace(/\s+/g, "").toUpperCase()));
      }
    });
  };

  const addOrEdit = (tourist, resetForm) => {
    if (tourist.id == 0)
      touristService.insertTourist(tourist);
    else
      touristService.updateTourist(tourist);
    resetForm();
    setRecordForEdit(null);
    setPopupState({
      ...popupState,
      isOpen: false
    });
    setRecords(touristService.getAllTourists());
  };


  const onDelete = id => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    });
    touristService.deleteTourist(id);
    setRecords(touristService.getAllTourists());
  };
  return (
    <>

      <Paper className={classes.pageContent}>

        <Toolbar>
          <TextField
            variant="outlined"
            label="Search Tourists"
            className={classes.searchInput}
            InputProps={{
              startAdornment: (<InputAdornment position="start">
                <Search/>
              </InputAdornment>)
            }}
            onChange={handleSearch}
          />
          <Button className={classes.newButton}
                  variant="outlined"
                  size="large"
                  startIcon={
                    <AddIcon/>
                  }
                  onClick={() => {
                    setPopupState({
                      ...popupState,
                      isOpen: true,
                      title: "Add Guest"
                    });
                    setRecordForEdit(null);
                  }}
          >Add new</Button>
        </Toolbar>

        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {
                headCells.map(headCell => (
                  <TableCell key={headCell.id}>
                    {headCell.label}
                  </TableCell>
                ))
              }
            </TableRow>
          </TableHead>

          <TableBody>
            {
              recordsAfterPagingAndSorting().map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.firstName + " " + item.lastName}</TableCell>
                  <TableCell>{item.phone}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.birthDate}</TableCell>
                  <TableCell>{item.placeBirth}</TableCell>
                  <TableCell>{item.passportNum}</TableCell>
                  <TableCell>{item.issuedBy}</TableCell>
                  <TableCell>{item.issueDate}</TableCell>
                  <TableCell>{item.expireDate}</TableCell>
                  <TableCell>{item.notes}</TableCell>
                  <TableCell>
                    <Button
                      className={classes.editButton}
                      onClick={() => {
                        setRecordForEdit(item);
                        setPopupState({
                          ...popupState,
                          isOpen: true,
                          title: "Edit Guest"
                        });
                      }
                      }
                    >
                      <EditIcon fontSize="small"></EditIcon>
                    </Button>

                    <Button className={classes.editButton}
                            onClick={() => {
                              setConfirmDialog({
                                isOpen: true,
                                title: "Are you sure to delete this item",
                                onConfirm: () => {
                                  onDelete(item.id);
                                }
                              });
                            }
                            }
                    >
                      <CloseIcon fontSize="small"></CloseIcon>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          page={page}
          rowsPerPageOptions={pages}
          rowsPerPage={rowsPerPage}
          count={records.length}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />

      </Paper>

      <Popup
        popupState={popupState}
        setPopupState={setPopupState}
      >
        <TouristForm
          addOrEdit={addOrEdit}
          recordForEdit={recordForEdit}
        ></TouristForm>

      </Popup>
      <ConfirmDialog confirmDialog={confirmDialog}
                     setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}