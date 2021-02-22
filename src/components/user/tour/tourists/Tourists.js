import React, { useState } from "react";
import useTables from "./component/useTables";
import Paper from "@material-ui/core/es/Paper/Paper";
import * as touristService from "./service/touristService";
import { InputAdornment, makeStyles, TableBody, TableCell, TableRow, Toolbar } from "@material-ui/core";
import Controls from "./component/controls/Controls";
import { Add as AddIcon, Close as CloseIcon, Edit as EditIcon, Search } from "@material-ui/icons";
import TouristForm from "./TouristForm";
import Popup from "./component/Popup";


const useStyles = makeStyles(theme => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
    width: 2000
  },
  searchInput: {
    width: "20%"
  },
  newButton: {
    position: "absolute",
    right: "10px"
  }

}));

const headCells = [
  { id: "name", label: "Name", disableSorting: true },
  { id: "phone", label: "Phone" },
  { id: "email", label: "Email", disableSorting: true },
  { id: "birthDate", label: "Date of birth" },
  { id: "placeBirth", label: "Place of birth" },
  { id: "passportNum", label: "Passport nr." },
  { id: "issuedBy", label: "Issued by" },
  { id: "issueDate", label: "Issue Date" },
  { id: "expireDate", label: "Expire Date" },
  { id: "agency", label: "Agency" },
  { id: "notes", label: "Notes" }

];

export default function Tourists() {


  const [records, setRecords] = useState(touristService.getAllTourists());
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [filterFn, setFilterFn] = useState({
    fn: items => {
      return items;
    }
  });
  const [openPopup, setOpenPopup] = useState(false);
  const classes = useStyles();

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting
  } = useTables(records, headCells, filterFn);

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
    setOpenPopup(false);
    setRecords(touristService.getAllTourists());
  };

  const openInPopup = item => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const onDelete = id => {
    if (window.confirm("Are you sure")) {
      touristService.deleteTourist(id);
      setRecords(touristService.getAllTourists());
    }
  };
  return (
    <>

      <Paper className={classes.pageContent}>

        <Toolbar>
          <Controls.Input
            label="Search Tourists"
            className={classes.searchInput}
            InputProps={{
              startAdornment: (<InputAdornment position="start">
                <Search/>
              </InputAdornment>)
            }}
            onChange={handleSearch}
          />
          <Controls.Button
            text="Add New"
            variant="outlined"
            startIcon={
              <AddIcon/>
            }
            className={classes.newButton}
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
          />
        </Toolbar>

        <TblContainer>
          <TblHead/>
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
                  <TableCell>{item.agency}</TableCell>
                  <TableCell>{item.notes}</TableCell>
                  <TableCell>
                    <Controls.ActionButton
                      color="primary"
                      onClick={() => {
                        openInPopup(item);
                      }}
                    >
                      <EditIcon fontSize="small"></EditIcon>
                    </Controls.ActionButton>

                    <Controls.ActionButton color="secondary"
                                           onClick={() => {
                                             onDelete(item.id);
                                           }}
                    >
                      <CloseIcon fontSize="small"></CloseIcon>
                    </Controls.ActionButton>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </TblContainer>
        <TblPagination></TblPagination>

      </Paper>

      <Popup
        title="Add Guest"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <TouristForm
          addOrEdit={addOrEdit}
          recordForEdit={recordForEdit}
        ></TouristForm>

      </Popup>


    </>
  );
}