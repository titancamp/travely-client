import React, { useCallback, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import { DataGrid } from "@material-ui/data-grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Divider from "@material-ui/core/Divider";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { TRANSPORTATION_COLUMNS } from "../utils/constants";
import HotelClient from "../../../../api/hotel-client";
import RoomTypes from "../../../../utils/room-types";

const useStyles = makeStyles({
  form: {
    padding: 60,
    paddingTop: 15,
  },
  error: {
    marginTop: 4,
    marginLeft: 14,
  },
  divider: {
    position: "absolute",
    height: "42vh",
    left: 0,
    right: 0,
    margin: "auto",
  },
  label: {
    fontSize: "0.75em",
  },
});

const validate = (values) => {
  const errors = {};

  if (!values.destination) {
    errors.destination = "Required";
  }

  if (!values.companyName) {
    errors.companyName = "Required";
  }

  if (!values.startDate) {
    errors.startDate = "Required";
  }

  if (!values.endDate) {
    errors.endDate = "Required";
  }

  if (!values.hotelId) {
    errors.hotelId = "Required";
  }

  if (!values.driverName) {
    errors.driverName = "Required";
  }

  if (!values.carModel) {
    errors.carModel = "Required";
  }

  if (!values.roomType) {
    errors.roomType = "Required";
  }

  if (!values.roomCount) {
    errors.roomCount = "Required";
  }

  return errors;
};

const Transportation = (props) => {
  const classes = useStyles();
  const onNext = props.onNext;
  const destinations = [...props.destinations];
  destinations.unshift("None");
  const [transportationBookings, setTransportationBookings] = useState([]);
  const initialState = {
    destination: "",
    companyName: "",
    startDate: "",
    endDate: "",
    driverName: "",
    carModel: "",
    hotelId: "",
    roomType: "",
    roomCount: "",
    notes: "",
    accomodation: false,
  };
  const [allHotels, setAllHotels] = useState([]);
  const formik = useFormik({
    initialValues: initialState,
    validate,
    onSubmit: (bookingToAdd) => {
      const booking = transportationBookings.reduce(
        (prev, curr) => (prev.id > curr.id ? prev : curr),
        {}
      );
      bookingToAdd.id = booking && !isNaN(booking.id) ? booking.id + 1 : 1;

      const selectedHotel = allHotels.find(
        (hotel) => hotel.id === bookingToAdd.hotelId
      );

      if (selectedHotel) {
        bookingToAdd.hotelName = selectedHotel.name;
      }

      setTransportationBookings([...transportationBookings, bookingToAdd]);
      formik.resetForm(initialState);
    },
  });

  const navigateToNextStep = useCallback(() => {
    onNext("transportation", transportationBookings);
  }, [onNext, transportationBookings]);

  async function fetchHotels() {
    const data = await HotelClient.getHotels();

    data.unshift({ id: "", name: "None" });
    setAllHotels(data);
  }

  useEffect(() => {
    fetchHotels();
  }, []);

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Typography variant="h5">
          Create new tour - Step 5 - Transportation
        </Typography>
        <Divider variant="fullWidth" />
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <form className={classes.form}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography variant="h6">Transportation Arrangement</Typography>
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      id="destination"
                      name="destination"
                      label="Destination"
                      error={formik.errors.destination ? true : false}
                      helperText={
                        formik.errors.destination
                          ? formik.errors.destination
                          : ""
                      }
                      value={formik.values.destination}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      id="companyName"
                      name="companyName"
                      label="Company Name"
                      error={formik.errors.companyName ? true : false}
                      helperText={
                        formik.errors.companyName
                          ? formik.errors.companyName
                          : ""
                      }
                      value={formik.values.companyName}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel className={classes.label}>
                      Start Date
                    </InputLabel>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      id="startDate"
                      name="startDate"
                      type="date"
                      error={formik.errors.startDate ? true : false}
                      helperText={
                        formik.errors.startDate ? formik.errors.startDate : ""
                      }
                      value={formik.values.startDate}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel className={classes.label}>End Date</InputLabel>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      id="endDate"
                      name="endDate"
                      type="date"
                      error={formik.errors.endDate ? true : false}
                      helperText={
                        formik.errors.endDate ? formik.errors.endDate : ""
                      }
                      value={formik.values.endDate}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      id="driverName"
                      name="driverName"
                      label="Driver Name"
                      error={formik.errors.driverName ? true : false}
                      helperText={
                        formik.errors.driverName ? formik.errors.driverName : ""
                      }
                      value={formik.values.driverName}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      id="carModel"
                      name="carModel"
                      label="Car Type/Model"
                      error={formik.errors.carModel ? true : false}
                      helperText={
                        formik.errors.carModel ? formik.errors.carModel : ""
                      }
                      value={formik.values.carModel}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      variant="outlined"
                      id="notes"
                      label="Notes"
                      name="notes"
                      value={formik.values.notes}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      size="small"
                      variant="outlined"
                      error={formik.errors.hotelName ? true : false}
                    >
                      <InputLabel id="hotelIdLbl">Hotel Name</InputLabel>
                      <Select
                        variant="outlined"
                        id="hotelId"
                        name="hotelId"
                        label="Hotel Name"
                        labelId="hotelIdLbl"
                        value={formik.values.hotelName}
                        onChange={formik.handleChange}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {allHotels.map((hotel) => (
                          <MenuItem key={hotel.id} value={hotel.id}>
                            {hotel.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {formik.errors.hotelName && (
                        <Typography
                          className={classes.error}
                          variant="caption"
                          display="block"
                          gutterBottom
                          color="error"
                        >
                          {formik.errors.hotelName}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid
                  container
                  spacing={8}
                  direction="row"
                  justify="space-between"
                >
                  <Grid item xs={4}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          id="accomodation"
                          name="accomodation"
                          color="primary"
                          checked={formik.values.accomodation}
                          onChange={formik.handleChange}
                        />
                      }
                      label="Accomodation Requiered"
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <Grid container direction="column" alignItems="flex-end">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={formik.handleSubmit}
                      >
                        Add
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={12}>
          <DataGrid
            rows={transportationBookings}
            columns={TRANSPORTATION_COLUMNS}
            autoHeight
            pageSize={5}
          />
        </Grid>
        <Grid item xs={12}>
          <br />
          <br />
          <br />
          <Grid
            container
            spacing={7}
            justify="space-between"
            alignItems="flex-end"
          >
            <Grid item xs={10}>
              <Button
                variant="contained"
                color="default"
                onClick={() => props.onBack("transportation", formik.values)}
              >
                Back: Activities
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="contained"
                fullWidth
                color="primary"
                onClick={navigateToNextStep}
              >
                Next: Assign Tour Guide
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Transportation;
