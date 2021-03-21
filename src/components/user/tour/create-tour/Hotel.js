import React, {Fragment} from "react";
import {Formik, Form, FieldArray, Field} from 'formik';
import Box from "@material-ui/core/Box";
import FormikInputField from "../../../UI/FormikComponents/FormikInputField";
import {DataGrid} from "@material-ui/data-grid";
import {HOTEL_COLUMNS} from "../utils/constants";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import FormikSelect from "../../../UI/FormikComponents/FormikSelect";

const HOTEL_NAMES = [
    {
        value: '1',
        name: 'Ibis'
    },
    {
        value: '2',
        name: 'Popock Hotel'
    },
    {
        value: '3',
        name: 'Russia'
    },
];

const ROOM_GUESTS = [
    {
        value: '1',
        name: 'Jack Smith'
    },
    {
        value: '2',
        name: 'Jane Smith'
    },
    {
        value: '3',
        name: 'John Smith'
    },
];

const BOOKING_STATES = [
    {
        value: '1',
        name: 'STATE1'
    },
    {
        value: '2',
        name: 'STATE2'
    },
    {
        value: '3',
        name: 'STATE3'
    },
];

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    selectItem: {
        width: "97%",
    },
    inputItem: {
        width: 115,
    },
    notes: {
        height: 100,
        width: 450,
    },
}));

const Transportation = ({
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
                    hotelName: '',
                    checkinDate: '',
                    checkoutDate: '',
                    bookingState: '',
                    cancellationDate: '',
                    notes: '',
                    roomDetails: [
                        {
                            roomType: '',
                            roomPersonsCount: 0,
                            roomGuests: ''
                        }
                    ]
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
                render={({values}) => (
                    <Form>
                        <h2>Hotel Booking</h2>

                        <Grid container spacing={2}>
                            <Grid container spacing={2} xs={6}>
                                <Grid item xs={12}>
                                    <FormikSelect
                                        options={HOTEL_NAMES}
                                        name='hotelName'
                                        label='Hotel Name'
                                        className={classes.selectItem}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormikInputField
                                        label='CheckIn Date '
                                        name='checkInDate'
                                        type='date'
                                        className={classes.inputItem}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormikInputField
                                        label='CheckOut Date'
                                        name='checkOutDate'
                                        type='date'
                                        className={classes.inputItem}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormikSelect
                                        options={BOOKING_STATES}
                                        name='bookingState'
                                        label='Booking State'
                                        className={classes.selectItem}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container spacing={1} xs={6}>
                                <FieldArray
                                    name="roomDetails"
                                    render={arrayHelpers => {
                                        return (
                                            <>
                                                {values.roomDetails && values.roomDetails.length > 0 && (
                                                    values.roomDetails.map((roomDetail, index) => (
                                                        <Fragment key={index}>
                                                            <Grid item xs={3}>
                                                                <FormikInputField
                                                                    name={`roomDetails.${index}.roomType`}
                                                                    label='Room Type'
                                                                />
                                                            </Grid>
                                                            <Grid item xs={3}>
                                                                <FormikInputField
                                                                    name={`roomDetails.${index}.roomPersonsCount`}
                                                                    type='Number'
                                                                />
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                                <FormikSelect
                                                                    options={ROOM_GUESTS}
                                                                    name={`roomDetails.${index}.roomGuests`}
                                                                    label='Room Guests'
                                                                    className={classes.selectItem}
                                                                />
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                                <Button
                                                                    type="button"
                                                                    variant="contained"
                                                                    color="secondary"
                                                                    onClick={() => arrayHelpers.remove(index)}
                                                                >
                                                                    X
                                                                </Button>
                                                            </Grid>
                                                        </Fragment>
                                                    ))
                                                )}
                                                <Grid item xs={6}>
                                                    <Button type="button" variant="contained" color={"primary"} onClick={() => arrayHelpers.push('')}>
                                                        Add Room
                                                    </Button>
                                                </Grid>
                                            </>
                                        )
                                    }}
                                />
                                    <Grid item xs={10}>
                                        <FormikInputField
                                            label='Cancellation Date'
                                            name='cancellationDate'
                                            type='date'
                                            className={classes.inputItem}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                            </Grid>
                            <Grid item xs={10}>
                                <FormikInputField
                                    label='Notes'
                                    name='notes'
                                    multiline
                                    rows={3}
                                    className={classes.notes}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Button type={'submit'} variant="contained" color="primary">
                                    Add
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            />
            <Box component="div" display="flex" justifyContent="space-between" p={1}>
                <DataGrid rows={initialValues} columns={HOTEL_COLUMNS} autoHeight/>
            </Box>
        </div>
    )
};

export default Transportation;