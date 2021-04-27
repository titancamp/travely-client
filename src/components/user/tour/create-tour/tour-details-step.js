import React, { useMemo } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Divider from "@material-ui/core/Divider";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import { countries } from "countries-list";

const useStyles = makeStyles({
  form: {
    marginTop: 15,
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

  if (!values.tourName) {
    errors.tourName = "Required";
  }

  if (!values.origin) {
    errors.origin = "Required";
  }

  if (!values.startDate) {
    errors.startDate = "Required";
  }

  if (!values.endDate) {
    errors.endDate = "Required";
  }

  if (!values.pickTime) {
    errors.pickTime = "Required";
  }

  if (!values.dropTime) {
    errors.dropTime = "Required";
  }

  return errors;
};

const TourDetail = (props) => {
  const classes = useStyles();
  const formik = useFormik({
    initialValues: props.state,
    validate,
    onSubmit: (values) => {
      props.onNext("tourDetails", values);
    },
  });

  const countriesList = useMemo(() => {
    return Object.keys(countries).map((c) => {
      return countries[c].name;
    });
  }, []);

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Typography variant="h5">
          Create new tour - Step 1 - Tour Details
        </Typography>
        <Divider variant="fullWidth" />
      </Grid>
      <Grid container className={classes.form} spacing={3}>
        <Grid item xs={6}>
          <form>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="h6">Tour Details</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  id="tourName"
                  name="tourName"
                  label="Tour name"
                  error={formik.errors.tourName ? true : false}
                  helperText={
                    formik.errors.tourName ? formik.errors.tourName : ""
                  }
                  value={formik.values.tourName}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  size="small"
                  variant="outlined"
                  error={formik.errors.origin ? true : false}
                >
                  <InputLabel id="originLbl">Origin</InputLabel>
                  <Select
                    variant="outlined"
                    id="origin"
                    name="origin"
                    label="Age"
                    labelId="originLbl"
                    value={formik.values.origin}
                    onChange={formik.handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {countriesList.map((c) => {
                      return (
                        <MenuItem key={c} value={c}>
                          {c}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  {formik.errors.origin && (
                    <Typography
                      className={classes.error}
                      variant="caption"
                      display="block"
                      gutterBottom
                      color="error"
                    >
                      {formik.errors.origin}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <InputLabel className={classes.label}>Start Date</InputLabel>
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
              <Grid item xs={12}>
                <Typography variant="h6">Pick-up</Typography>
              </Grid>
              <Grid item xs={4}>
                <InputLabel className={classes.label}>Time</InputLabel>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  id="pickTime"
                  name="pickTime"
                  type="time"
                  error={formik.errors.pickTime ? true : false}
                  helperText={
                    formik.errors.pickTime ? formik.errors.pickTime : ""
                  }
                  value={formik.values.pickTime}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={8}>
                <InputLabel className={classes.label}>Details</InputLabel>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  id="pickDetails"
                  name="pickDetails"
                  value={formik.values.pickDetails}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Drop-off</Typography>
              </Grid>
              <Grid item xs={4}>
                <InputLabel className={classes.label}>Time</InputLabel>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  id="dropTime"
                  name="dropTime"
                  type="time"
                  error={formik.errors.dropTime ? true : false}
                  helperText={
                    formik.errors.dropTime ? formik.errors.dropTime : ""
                  }
                  value={formik.values.dropTime}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={8}>
                <InputLabel className={classes.label}>Details</InputLabel>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  id="dropDetails"
                  name="dropDetails"
                  value={formik.values.dropDetails}
                  onChange={formik.handleChange}
                />
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={6}>
          <Divider orientation="vertical" className={classes.divider} />
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="h6">Destinations</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled
                fullWidth
                InputProps={{ style: { height: "35vh" } }}
                variant="outlined"
                id="destinations"
                name="destinations"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider variant="fullWidth" />
          <Typography variant="h6">Notes</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            variant="outlined"
            id="notes"
            name="notes"
            value={formik.values.notes}
            onChange={formik.handleChange}
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
                onClick={() => props.onClose()}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="contained"
                fullWidth
                color="primary"
                onClick={formik.handleSubmit}
              >
                Next: Add guests
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default TourDetail;
