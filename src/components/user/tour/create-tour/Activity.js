import React from "react";
import {Formik, Form} from 'formik';
import Box from "@material-ui/core/Box";
import FormikInputField from "../../../UI/FormikComponents/FormikInputField";
import {DataGrid} from "@material-ui/data-grid";
import {ACTIVITIES_COLUMNS} from "../utils/constants";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import FormikSelect from "../../../UI/FormikComponents/FormikSelect";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    selectItem: {
        height: 50,
        width: "100%",
    },
    inputItem: {
        height: 50,
        width: 100,
    },
    notes: {
        height: 100,
        width: 550,
    },
}));

const ACTIVITIES = [
    {
        value: "Activity1",
        name: "Activity1"
    },
    {
        value: "Activity2",
        name: "Activity2"
    },
    {
        value: "Activity3",
        name: "Activity3"
    },
];

const STATUSES = [
    {
        value: 10,
        name: "Valid"
    },
    {
        value: 20,
        name: "Active"
    },
    {
        value: 30,
        name: "Another status"
    },
];

const Activity = ({
                      initialValues,
                      currentStepFormRef,
                      setFormValues,
                      currentStepFormName
                  }) => {
    const classes = useStyles();
    const [activity, setActivity] = React.useState('');

    const handleActivityChange = (event) => {
        setActivity(event.target.value);
    };

    return (
        <div>
            <Formik
                initialValues={{
                    activityName: '',
                    date: '',
                    time: '',
                    numberOfGuests: '',
                    status: '',
                    notes: ''
                }}
                innerRef={currentStepFormRef}
                onSubmit={(values, {setSubmitting}) => {
                    const lastItem = initialValues[initialValues.length - 1];
                    console.log(values);
                    const item = {
                        ...values,
                        id: lastItem ? lastItem.id + 1 : 1
                    };
                    setFormValues(currentStepFormName, initialValues.concat(item));
                }}
            >
                <Form>
                    <h2>Add Activities</h2>
                    <Grid container
                          justify="center"
                          spacing={2}>
                        <Grid item xs={12}>
                            <FormikSelect
                                options={ACTIVITIES}
                                name='activityName'
                                label='Activities'
                                className={classes.selectItem}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <FormikInputField
                                label='Date'
                                name='date'
                                type='date'
                                className={classes.inputItem}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <FormikInputField
                                label='Time'
                                name='time'
                                type='time'
                                className={classes.inputItem}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <FormikInputField
                                label='Number Of Guests'
                                name='numberOfGuests'
                                className={classes.inputItem}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <FormikSelect
                                options={STATUSES}
                                name='status'
                                label='Status'
                                className={classes.selectItem}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormikInputField
                                label='Notes'
                                name='notes'
                                multiline
                                rows={3}
                                className={classes.notes}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type={'submit'} variant="contained" color="primary">
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            </Formik>
            <Box component="div" display="flex" justifyContent="space-between" p={1}>
                <DataGrid rows={initialValues} columns={ACTIVITIES_COLUMNS} autoHeight/>
            </Box>
        </div>
    )
};

export default Activity;