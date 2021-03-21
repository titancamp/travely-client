import React from "react";
import {Formik, Form} from 'formik';
import Box from "@material-ui/core/Box";
import FormikInputField from "../../../UI/FormikComponents/FormikInputField";
import {DataGrid} from "@material-ui/data-grid";
import {ASSIGN_TOUR_GUIDE_COLUMNS} from "../utils/constants";
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
        width: "97%",
    },
    inputItem: {
        height: 110,
        width: 100,
    },
    notes: {
        height: 100,
        width: 250,
    },
}));

const DESTINATION = [
    {
        value: 'destination1',
        name: 'destination1'
    },
    {
        value: 'destination2',
        name: 'destination2'
    },
    {
        value: 'destination3',
        name: 'destination3'
    },
];

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

const HOTELS = [
    {
        value: 10,
        name: "Ararat"
    },
    {
        value: 20,
        name: "Rixos"
    },
    {
        value: 30,
        name: "Moderna"
    },
];

const AssignTourGuide = ({
                            initialValues,
                            currentStepFormRef,
                            setFormValues,
                            currentStepFormName
                        }) => {
    const classes = useStyles();

    return (
        <div>
            <Formik
                initialValues={{
                    destination: '',
                    activityName: '',
                    date: '',
                    tourGuideName: '',
                    hotelName: '',
                    driverName: '',
                    type: '',
                    count: '',
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
                    <h2>Assign Tour Guide</h2>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormikSelect
                                options={DESTINATION}
                                name='destination'
                                label='Destination'
                                className={classes.selectItem}
                            />
                            <FormikSelect
                                options={ACTIVITIES}
                                name='activityName'
                                label='Activities'
                                className={classes.selectItem}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormikInputField
                                label='Notes'
                                name='notes'
                                multiline
                                rows={3}
                                className={classes.notes}
                            />
                        </Grid>
                        {/*<Grid item xs={12}>*/}

                        {/*</Grid>*/}
                        <Grid item xs={3}>
                            <FormikInputField
                                label='date-label'
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
                                label='Tour Guide Name'
                                name='tourGuideName'
                                className={classes.inputItem}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormikSelect
                                options={HOTELS}
                                name='hotelName'
                                label='Hotel Name'
                                className={classes.selectItem}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <FormikInputField
                                label='Type'
                                name='type'
                                className={classes.inputItem}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <FormikInputField
                                label='Count'
                                name='count'
                                type='number'
                                className={classes.inputItem}
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
                <DataGrid rows={initialValues} columns={ASSIGN_TOUR_GUIDE_COLUMNS} autoHeight/>
            </Box>
        </div>
    )
};

export default AssignTourGuide;