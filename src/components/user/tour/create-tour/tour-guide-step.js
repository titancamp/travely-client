import React, { useCallback, useState } from "react";
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
import { ASSIGN_TOUR_GUIDE_COLUMNS } from "../utils/constants";

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

  if (!values.activityName) {
    errors.activityName = "Required";
  }

  if (!values.date) {
    errors.date = "Required";
  }

  if (!values.guideName) {
    errors.guideName = "Required";
  }

  console.log(errors);

  return errors;
};

const initialValues = {
  destination: "",
  date: new Date(),
  activityName: null,
  guideName: "",
  notes: "",
};

const TourGuide = (props) => {
  const classes = useStyles();
  const onNext = props.onNext;
  const [tourGuides, setTourGuides] = useState([]);

  console.log("props.state", props.state);

  const formik = useFormik({
    initialValues: initialValues,
    validate,
    onSubmit: (tourGuideToAdd) => {
      const tourGuide = tourGuides.reduce(
        (prev, curr) => (prev.id < curr.id ? prev : curr),
        {}
      );
      tourGuideToAdd.id =
        tourGuide && !isNaN(tourGuide.id) ? tourGuide.id - 1 : 0;

      setTourGuides([...tourGuides, tourGuideToAdd]);
      formik.resetForm(initialValues);
    },
  });

  const navigateToNextStep = useCallback(() => {
    onNext("tourGuide", tourGuides);
  }, [onNext, tourGuides]);

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Typography variant="h5">
          Create new tour - Step 6 - Assign Tour Guide
        </Typography>
        <Divider variant="fullWidth" />
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <form className={classes.form}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography variant="h6">Assign Tour Guide</Typography>
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      size="small"
                      variant="outlined"
                      error={formik.errors.destination ? true : false}
                    >
                      <TextField
                        size="small"
                        placeholder="Destination"
                        fullWidth
                        multiline
                        variant="outlined"
                        id="destination"
                        name="destination"
                        value={formik.values.destination}
                        onChange={formik.handleChange}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      size="small"
                      variant="outlined"
                      error={formik.errors.activityName ? true : false}
                    >
                      <InputLabel id="activityNameLbl">Activities</InputLabel>
                      <Select
                        variant="outlined"
                        id="activityName"
                        name="activityName"
                        label="Activities"
                        labelId="activityNameLbl"
                        value={formik.values.activityName}
                        onChange={formik.handleChange}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {props.activities.map((a) => {
                          return (
                            <MenuItem value={a.id}>{a.activityName}</MenuItem>
                          );
                        })}
                      </Select>
                      {formik.errors.activityName && (
                        <Typography
                          className={classes.error}
                          variant="caption"
                          display="block"
                          gutterBottom
                          color="error"
                        >
                          {formik.errors.activityName}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel className={classes.label}>Date</InputLabel>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      id="date"
                      name="date"
                      type="date"
                      error={formik.errors.date ? true : false}
                      helperText={formik.errors.date ? formik.errors.date : ""}
                      value={formik.values.date}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel className={classes.label}>
                      Tour Guide Name
                    </InputLabel>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      id="guideName"
                      name="guideName"
                      error={formik.errors.guideName ? true : false}
                      helperText={
                        formik.errors.guideName ? formik.errors.guideName : ""
                      }
                      value={formik.values.guideName}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <TextField
                      size="small"
                      placeholder="Notes"
                      fullWidth
                      multiline
                      variant="outlined"
                      id="notes"
                      name="notes"
                      value={formik.values.notes}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  {/* <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      size="small"
                      variant="outlined"
                      error={formik.errors.hotelName ? true : false}
                    >
                      <InputLabel id="hotelNameLbl">Hotel Name</InputLabel>
                      <Select
                        variant="outlined"
                        id="hotelName"
                        name="hotelName"
                        label="Hotel Name"
                        labelId="hotelNameLbl"
                        value={formik.values.hotelName}
                        onChange={formik.handleChange}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Hotel1</MenuItem>
                        <MenuItem value={20}>Hotel2</MenuItem>
                        <MenuItem value={30}>Hotel3</MenuItem>
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
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      id="roomType"
                      name="roomType"
                      label="Room Type"
                      error={formik.errors.roomType ? true : false}
                      helperText={
                        formik.errors.roomType ? formik.errors.roomType : ""
                      }
                      value={formik.values.roomType}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      id="roomCount"
                      name="roomCount"
                      type="number"
                      label="Rooms count"
                      error={formik.errors.roomCount ? true : false}
                      helperText={
                        formik.errors.roomCount ? formik.errors.roomCount : ""
                      }
                      value={formik.values.roomCount}
                      onChange={formik.handleChange}
                    />
                  </Grid> */}
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
            rows={tourGuides}
            columns={ASSIGN_TOUR_GUIDE_COLUMNS}
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
                onClick={() => props.onBack("tourGuide", formik.values)}
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
                Save Tour
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default TourGuide;
