import React, { useCallback, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik, FieldArray, FormikProvider } from "formik";
import { DataGrid } from "@material-ui/data-grid";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Divider from "@material-ui/core/Divider";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import HotelClient from "../../../../api/hotel-client";
import BOOKING_STATUSES from "../../../../utils/booking-statuses";
import RoomTypes from "../../../../utils/room-types";
import { HOTEL_COLUMNS } from "../utils/constants";

const useStyles = makeStyles({
  form: {
    marginTop: 15,
    paddingLeft: 200,
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
  submit: {
    position: "relative",
    top: "77%",
  },
});

const validate = (values) => {
  const errors = {};

  if (!values.hotelId) {
    errors.hotelId = "Required";
  }

  if (!values.checkinDate) {
    errors.checkinDate = "Required";
  }

  if (!values.checkoutDate) {
    errors.checkoutDate = "Required";
  }

  if (!values.bookingState) {
    errors.bookingState = "Required";
  }

  if (!values.cancellationDate) {
    errors.cancellationDate = "Required";
  }

  return errors;
};

const Hotels = (props) => {
  const classes = useStyles();
  const [hotelBookings, setHotelBookings] = useState([]);
  const [hotels, setHotels] = useState([]);
  const initialState = {
    hotelId: "",
    checkinDate: "",
    checkoutDate: "",
    bookingState: "",
    cancellationDate: "",
    notes: "",
    rooms: [
      {
        roomType: "",
        roomCount: 0,
        roomGuests: [],
      },
    ],
  };
  const onNext = props.onNext;
  const guests = props.guests;

  async function fetchHotels() {
    const res = await HotelClient.getHotels();
    res.unshift({
      id: "",
      name: "None",
    });
    setHotels(res);
  }

  const navigateToNextStep = useCallback(() => {
    onNext("hotels", hotelBookings);
  }, [onNext, hotelBookings]);

  useEffect(() => {
    fetchHotels();
  }, []);

  const formik = useFormik({
    initialValues: initialState,
    validate,
    onSubmit: (bookingToAdd) => {
      const booking = hotelBookings.reduce(
        (prev, curr) => (prev.id > curr.id ? prev : curr),
        {}
      );
      bookingToAdd.id = booking && !isNaN(booking.id) ? booking.id + 1 : 1;

      const selectedHotel = hotels.find(
        (hotel) => hotel.id === bookingToAdd.hotelId
      );

      if (selectedHotel) {
        bookingToAdd.hotelName = selectedHotel.name;
        bookingToAdd.destination = selectedHotel.address;
      }

      setHotelBookings([...hotelBookings, bookingToAdd]);
      formik.resetForm(initialState);
    },
  });

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Typography variant="h5">Create new tour - Step 3 - Hotels</Typography>
        <Divider variant="fullWidth" />
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={10}>
          <form className={classes.form}>
            <Grid container direction="row" justify="space-between" spacing={1}>
              <Grid item xs={12}>
                <Typography variant="h6">Hotel Booking</Typography>
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      size="small"
                      variant="outlined"
                      error={formik.errors.hotelId ? true : false}
                    >
                      <InputLabel id="hotelIdLbl">Hotel Name</InputLabel>
                      <Select
                        variant="outlined"
                        id="hotelId"
                        name="hotelId"
                        label="Hotel Name"
                        labelId="hotelIdLbl"
                        value={formik.values.hotelId}
                        onChange={formik.handleChange}
                      >
                        {hotels.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {formik.errors.hotelId && (
                        <Typography
                          className={classes.error}
                          variant="caption"
                          display="block"
                          gutterBottom
                          color="error"
                        >
                          {formik.errors.hotelId}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel className={classes.label}>
                      Checkin Date
                    </InputLabel>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      id="checkinDate"
                      name="checkinDate"
                      type="date"
                      error={formik.errors.checkinDate ? true : false}
                      helperText={
                        formik.errors.checkinDate
                          ? formik.errors.checkinDate
                          : ""
                      }
                      value={formik.values.checkinDate}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel className={classes.label}>
                      Checkout Date
                    </InputLabel>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      id="checkoutDate"
                      name="checkoutDate"
                      type="date"
                      error={formik.errors.checkoutDate ? true : false}
                      helperText={
                        formik.errors.checkoutDate
                          ? formik.errors.checkoutDate
                          : ""
                      }
                      value={formik.values.checkoutDate}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      size="small"
                      variant="outlined"
                      error={formik.errors.bookingState ? true : false}
                    >
                      <InputLabel id="bookingStateLbl">
                        Booking State
                      </InputLabel>
                      <Select
                        variant="outlined"
                        id="bookingState"
                        name="bookingState"
                        label="Booking State"
                        labelId="bookingStateLbl"
                        value={formik.values.bookingState}
                        onChange={formik.handleChange}
                      >
                        {Object.keys(BOOKING_STATUSES.properties).map((key) => (
                          <MenuItem key={key} value={key}>
                            {BOOKING_STATUSES.properties[key]}
                          </MenuItem>
                        ))}
                      </Select>
                      {formik.errors.bookingState && (
                        <Typography
                          className={classes.error}
                          variant="caption"
                          display="block"
                          gutterBottom
                          color="error"
                        >
                          {formik.errors.bookingState}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                {/* <Grid container spacing={1}>
                  <FormikProvider value={formik}>
                    <FieldArray name="rooms">
                      {({ insert, remove, push }) => (
                        <React.Fragment>
                          {formik.values.rooms.length > 0 &&
                            formik.values.rooms.map((room, index) => (
                              <React.Fragment key={index}>
                                <Grid item xs={4}>
                                  <FormControl
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    error={
                                      formik.errors.roomType ? true : false
                                    }
                                  >
                                    <InputLabel id="roomTypeLbl">
                                      Room Type
                                    </InputLabel>
                                    <Select
                                      variant="outlined"
                                      name={`rooms.${index}.roomType`}
                                      label="Room Type"
                                      labelId="roomTypeLbl"
                                      value={formik.values.roomType}
                                      onChange={formik.handleChange}
                                    >
                                      <MenuItem value=""><em>None</em></MenuItem>
                                      {RoomTypes.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
                                    </Select>
                                    {formik.errors.roomType && (
                                      <Typography
                                        className={classes.error}
                                        variant="caption"
                                        display="block"
                                        gutterBottom
                                        color="error"
                                      >
                                        {formik.errors.roomType}
                                      </Typography>
                                    )}
                                  </FormControl>
                                </Grid>
                                <Grid item xs={3}>
                                  <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    type="number"
                                    name={`rooms.${index}.roomCount`}
                                    label="Count"
                                    onChange={formik.handleChange}
                                  />
                                </Grid>
                                <Grid item xs={4}>
                                  <FormControl
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                  >
                                    <InputLabel>Room Guests</InputLabel>
                                    <Select
                                      variant="outlined"
                                      name={`rooms.${index}.roomGuests`}
                                      label="Room Guests"
                                      value={
                                        formik.values.rooms[index].roomGuests
                                      }
                                      onChange={formik.handleChange}
                                    >
                                      <MenuItem value="">
                                        <em>None</em>
                                      </MenuItem>
                                      {guests.map((guest) => (
                                        <MenuItem value={guest.id}>
                                          {`${guest.firstName} ${guest.lastName}`}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                    {formik.errors.roomGuests && (
                                      <Typography
                                        className={classes.error}
                                        variant="caption"
                                        display="block"
                                        gutterBottom
                                        color="error"
                                      >
                                        {formik.errors.roomGuests}
                                      </Typography>
                                    )}
                                  </FormControl>
                                </Grid>
                                <Grid item xs={1}>
                                  <IconButton
                                    aria-label="close"
                                    onClick={() => remove(index)}
                                  >
                                    <CloseIcon
                                      color="action"
                                      fontSize="small"
                                    />
                                  </IconButton>
                                </Grid>
                              </React.Fragment>
                            ))}
                          <Grid
                            container
                            direction="column"
                            alignItems="flex-end"
                          >
                            <Grid item xs={12}>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() =>
                                  push({
                                    roomType: "",
                                    roomCount: 0,
                                    roomGuests: [],
                                  })
                                }
                              >
                                Add Room
                              </Button>
                            </Grid>
                          </Grid>
                        </React.Fragment>
                      )}
                    </FieldArray>
                  </FormikProvider>
                </Grid> */}
              </Grid>
              <Grid item xs={6}>
                <InputLabel className={classes.label}>
                  Cancellation Date
                </InputLabel>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  id="cancellationDate"
                  name="cancellationDate"
                  type="date"
                  error={formik.errors.cancellationDate ? true : false}
                  helperText={
                    formik.errors.cancellationDate
                      ? formik.errors.cancellationDate
                      : ""
                  }
                  value={formik.values.cancellationDate}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  multiline
                  variant="outlined"
                  id="notes"
                  name="notes"
                  label="Notes"
                  value={formik.values.notes}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={2}>
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
          </form>
        </Grid>
        <Grid item xs={12}>
          <DataGrid
            rows={hotelBookings}
            columns={HOTEL_COLUMNS}
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
                onClick={() => props.onBack("hotels", formik.values)}
              >
                Back: Guests
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="contained"
                fullWidth
                color="primary"
                onClick={navigateToNextStep}
              >
                Next: Add Activities
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Hotels;
