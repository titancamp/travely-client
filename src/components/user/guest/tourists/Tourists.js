import React, { useCallback, useEffect, useRef, useState } from "react";
import Paper from "@material-ui/core/Paper";
import * as touristService from "./service/TouristService";
import { deleteTourist, getAllTourists } from "./service/TouristService";
import {
  Add as AddIcon,
  Close as CloseIcon,
  Edit as EditIcon,
  Search,
} from "@material-ui/icons";
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
import { convertMonthFormat } from "./component/DateFormats";
import CircularProgress from "@material-ui/core/CircularProgress";
import TableContainer from "@material-ui/core/TableContainer";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    width: "100%",
  },
  container: {
    maxHeight: 550,
    maxWidth: "100%",
    whiteSpace: "nowrap",
  },
  searchInput: {
    margin: theme.spacing(1),
    width: "15%",
  },
  newButton: {
    position: "absolute",
    top: "20px",
    right: "10px",
    color: theme.palette.grey[500],
  },
  table: {
    "& thead th": {
      color: theme.palette.grey[500],
    },
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[700],
  },
  editButton: {
    color: theme.palette.grey[700],
  },
  circularProgress: {
    margin: theme.spacing(25),
    display: "flex",
    justifyContent: "center",
  },
  snackBar: {
    top: theme.spacing(8),
  },
}));

const headCells = [
  { id: "name", label: "Name" },
  { id: "phoneNumber", label: "Phone" },
  { id: "email", label: "Email" },
  { id: "dateOfBirth", label: "Date of birth" },
  { id: "placeOfBirth", label: "Place of birth" },
  { id: "passportNumber", label: "Passport nr." },
  { id: "issuedBy", label: "Issued by" },
  { id: "issuedDate", label: "Issue Date" },
  { id: "expireDate", label: "Expire Date" },
  { id: "notes", label: "Notes" },
  { id: "isMain", label: "Main Contact" },
  { id: "actions", label: "" },
];

export default function Tourists() {
  const [records, setRecords] = useState([]);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items ? items : [];
    },
  });
  const pages = useRef([5, 10, 15]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages.current[page]);
  const [popupState, setPopupState] = useState({ isOpen: false, title: "" });
  const classes = useStyles();
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
  });
  const [isData, setIsData] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    setIsData(false);
    getAllTourists()
      .then((res) => {
        setRecords(res.data);
        setIsData(true);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const recordsAfterPagingAndSorting = () => {
    return filterFn
      .fn(records)
      .slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  const handleSearch = (e) => {
    let target = e.target;

    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else {
          return items.filter((x) =>
            (x.firstName + x.lastName)
              .toUpperCase()
              .includes(target.value.replace(/\s+/g, "").toUpperCase())
          );
        }
      },
    });
  };

  const handleClose = (event, reason) => {
    setNotify({
      ...notify,
      isOpen: false,
    });
  };

  const addOrEdit = (tourist) => {
    setIsData(false);
    if (tourist["id"] === 0) {
      touristService
        .insertTourist(tourist)
        .then(() => {
          getAllTourists()
            .then((res) => {
              setRecords(res.data);
              setIsData(true);
              setNotify({
                isOpen: true,
                message: "Added Successfully",
                type: "success",
              });
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((e) => {
          setNotify({ isOpen: true, message: "Not Added", type: "error" });

          console.log(e);
        });
    } else {
      touristService
        .updateTourist(tourist)
        .then(() => {
          getAllTourists()
            .then((res) => {
              setRecords(res.data);
              setIsData(true);
              setNotify({
                isOpen: true,
                message: "Updated Successfully",
                type: "success",
              });
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((e) => {
          setNotify({ isOpen: true, message: "Not Updated", type: "error" });
          console.log(e);
        });
    }
    setRecordForEdit(null);
    setPopupState({
      ...popupState,
      isOpen: false,
    });
  };

  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    setIsData(false);
    deleteTourist(id)
      .then(() => {
        getAllTourists()
          .then((res) => {
            setRecords(res.data);
            setIsData(true);
            setNotify({
              isOpen: true,
              message: "Deleted Successfully",
              type: "success",
            });
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        setNotify({ isOpen: true, message: "Not Deleted", type: "error" });

        console.log(e);
      });
  };

  const handleCloseConfirm = useCallback(() => {
    setConfirmDialog({
      isOpen: false,
    });
  }, []);

  return (
    <>
      {isData ? (
        <Paper className={classes.pageContent}>
          <Toolbar>
            <TextField
              variant="outlined"
              label="Search Tourists"
              className={classes.searchInput}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              onChange={handleSearch}
            />
            <Button
              className={classes.newButton}
              variant="outlined"
              size="large"
              startIcon={<AddIcon />}
              onClick={() => {
                setPopupState({
                  ...popupState,
                  isOpen: true,
                  title: "Add Guest",
                });
                setRecordForEdit(null);
              }}
            >
              Add new
            </Button>
          </Toolbar>
          <TableContainer className={classes.container}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  {headCells.map((headCell) => (
                    <TableCell key={headCell.id}>{headCell.label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {recordsAfterPagingAndSorting().map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {item.firstName + " " + item.lastName}
                    </TableCell>
                    <TableCell>{item.phoneNumber}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>
                      {convertMonthFormat(item.dateOfBirth)}
                    </TableCell>
                    <TableCell>{item.placeOfBirth}</TableCell>
                    <TableCell>{item.passportNumber}</TableCell>
                    <TableCell>{item.issuedBy}</TableCell>
                    <TableCell>{convertMonthFormat(item.issuedDate)}</TableCell>
                    <TableCell>{convertMonthFormat(item.expireDate)}</TableCell>
                    <TableCell>{item.notes}</TableCell>
                    <TableCell>{item.isMain ? "Main Contact" : ""}</TableCell>
                    <TableCell>
                      <Button
                        className={classes.editButton}
                        onClick={() => {
                          setRecordForEdit(item);
                          setPopupState({
                            ...popupState,
                            isOpen: true,
                            title: "Edit Guest",
                          });
                        }}
                      >
                        <EditIcon fontSize="small"></EditIcon>
                      </Button>

                      <Button
                        className={classes.editButton}
                        onClick={() => {
                          setConfirmDialog({
                            isOpen: true,
                            title: "Are you sure to delete this item",
                            onConfirm: () => {
                              onDelete(item.id);
                            },
                          });
                        }}
                      >
                        <CloseIcon fontSize="small"></CloseIcon>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            page={page}
            rowsPerPageOptions={pages.current}
            rowsPerPage={rowsPerPage}
            count={records.length}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      ) : (
        <div className={classes.circularProgress}>
          <CircularProgress />
        </div>
      )}

      <Popup popupState={popupState} setPopupState={setPopupState}>
        <TouristForm
          addOrEdit={addOrEdit}
          recordForEdit={recordForEdit}
        ></TouristForm>
      </Popup>
      <ConfirmDialog
        title={confirmDialog.title}
        isOpen={confirmDialog.isOpen}
        onConfirm={confirmDialog.onConfirm}
        onCancel={handleCloseConfirm}
      />
      <Snackbar
        className={classes.snackBar}
        open={notify.isOpen}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={notify.type}>
          {notify.message}
        </Alert>
      </Snackbar>
    </>
  );
}
