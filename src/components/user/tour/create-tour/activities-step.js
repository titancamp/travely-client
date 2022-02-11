import React, { useCallback, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import { DataGrid } from '@material-ui/data-grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { ACTIVITIES_COLUMNS } from '../utils/constants';
import ActivityClient from '../../../../api/activity-client';
import BOOKING_STATUSES from '../../../../utils/booking-statuses';

const useStyles = makeStyles({
  form: {
    marginTop: 15,
    paddingLeft: 400,
  },
  label: {
    fontSize: '0.75em',
  },
  submit: {
    position: 'relative',
    top: '82%',
  },
});

const validate = (values) => {
  const errors = {};

  if (!values.activityId) {
    errors.activityId = 'Required';
  }

  if (!values.date) {
    errors.date = 'Required';
  }

  if (!values.time) {
    errors.time = 'Required';
  }

  if (!values.numberOfGuests) {
    errors.numberOfGuests = 'Required';
  }

  if (!values.status) {
    errors.status = 'Required';
  }

  return errors;
};

const Attributes = (props) => {
  const classes = useStyles();
  const onNext = props.onNext;
  const [allActivities, setAllActivities] = useState([]);
  const [activityBookings, setActivityBookings] = useState([]);
  const initialValues = {
    activityId: '',
    date: '',
    time: '',
    numberOfGuests: '',
    status: '',
    notes: '',
  };
  const formik = useFormik({
    initialValues: initialValues,
    validate,
    onSubmit: (activityBookingToAdd) => {
      activityBookingToAdd.id = activityBookingToAdd.activityId;
      const activity = allActivities.find(
        (item) => item.id === activityBookingToAdd.activityId
      );

      if (activity) {
        activityBookingToAdd.activityName = activity.name;
        activityBookingToAdd.destinations = activity.address;
      }

      setActivityBookings([...activityBookings, activityBookingToAdd]);

      formik.resetForm(initialValues);
    },
  });

  async function fetchAllActivities() {
    const activitiesResponse = await ActivityClient.getActivities();
    const data = activitiesResponse.data;
    data.unshift({
      id: '',
      name: 'None',
    });
    setAllActivities(data);
  }

  useEffect(() => {
    fetchAllActivities();
  }, []);

  const navigateToNextStep = useCallback(() => {
    onNext('activities', activityBookings);
  }, [onNext, activityBookings]);

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Typography variant='h5'>Create new tour - Step 4 - Attributes</Typography>
        <Divider variant='fullWidth' />
      </Grid>
      <Grid container spacing={3} justify='center'>
        <Grid item xs={10}>
          <form className={classes.form}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant='h6'>Add Activity</Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  size='small'
                  variant='outlined'
                  error={formik.errors.activityId ? true : false}
                >
                  <InputLabel id='activityIdLbl'>Attributes</InputLabel>
                  <Select
                    variant='outlined'
                    id='activityId'
                    name='activityId'
                    label='Attributes'
                    labelId='activityIdLbl'
                    value={formik.values.activityId}
                    onChange={formik.handleChange}
                  >
                    {allActivities.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.errors.activityId && (
                    <Typography
                      className={classes.error}
                      variant='caption'
                      display='block'
                      gutterBottom
                      color='error'
                    >
                      {formik.errors.activityId}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <InputLabel className={classes.label}>Date</InputLabel>
                <TextField
                  fullWidth
                  variant='outlined'
                  size='small'
                  id='date'
                  name='date'
                  type='date'
                  error={formik.errors.date ? true : false}
                  helperText={formik.errors.date ? formik.errors.date : ''}
                  value={formik.values.date}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={3}>
                <InputLabel className={classes.label}>Time</InputLabel>
                <TextField
                  fullWidth
                  variant='outlined'
                  size='small'
                  id='time'
                  name='time'
                  type='time'
                  error={formik.errors.time ? true : false}
                  helperText={formik.errors.time ? formik.errors.time : ''}
                  value={formik.values.time}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={2}>
                <InputLabel className={classes.label}>Number of Guests</InputLabel>
                <TextField
                  fullWidth
                  variant='outlined'
                  size='small'
                  id='numberOfGuests'
                  name='numberOfGuests'
                  type='number'
                  error={formik.errors.numberOfGuests ? true : false}
                  helperText={
                    formik.errors.numberOfGuests ? formik.errors.numberOfGuests : ''
                  }
                  value={formik.values.numberOfGuests}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={4}>
                <InputLabel className={classes.label}>Status</InputLabel>
                <FormControl
                  fullWidth
                  size='small'
                  variant='outlined'
                  error={formik.errors.status ? true : false}
                >
                  <Select
                    variant='outlined'
                    id='status'
                    name='status'
                    value={formik.values.status}
                    onChange={formik.handleChange}
                  >
                    {Object.keys(BOOKING_STATUSES.properties).map((key) => (
                      <MenuItem key={key} value={key}>
                        {BOOKING_STATUSES.properties[key]}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.errors.status && (
                    <Typography
                      className={classes.error}
                      variant='caption'
                      display='block'
                      gutterBottom
                      color='error'
                    >
                      {formik.errors.status}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  variant='outlined'
                  id='notes'
                  name='notes'
                  label='Notes'
                  value={formik.values.notes}
                  onChange={formik.handleChange}
                />
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={2}>
          <div className={classes.submit}>
            <Button variant='contained' color='primary' onClick={formik.handleSubmit}>
              Add
            </Button>
          </div>
        </Grid>
        <Grid item xs={12}>
          <DataGrid
            rows={activityBookings}
            columns={ACTIVITIES_COLUMNS}
            autoHeight
            pageSize={5}
          />
        </Grid>
        <Grid item xs={12}>
          <br />
          <br />
          <br />
          <Grid container spacing={7} justify='space-between' alignItems='flex-end'>
            <Grid item xs={10}>
              <Button
                variant='contained'
                color='default'
                onClick={() => props.onBack('activities', formik.values)}
              >
                Back: Hotels
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button
                variant='contained'
                fullWidth
                color='primary'
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

export default Activities;
