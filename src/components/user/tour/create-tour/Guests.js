import React from "react";
import { Formik, Form } from "formik";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import FormikInputField from "../../../UI/FormikComponents/FormikInputField";
import FormikCheckbox from "../../../UI/FormikComponents/FormikCheckbox";
import { DataGrid } from "@material-ui/data-grid";
import { GUESTS_COLUMNS } from "../utils/constants";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    button: {
        margin: 10
    },
    selectItem: {
        width: "97%",
    },
    inputItem: {
        height: 65
    },
    inputSearch: {
        width: 505,
        height: 65
    },
    notes: {
        height: 100,
        width: 505,
    },
}));
const Guests = ({
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
                    firstName: '',
                    lastName: '',
                    phone: '',
                    email: '',
                    dateOfBirth: '',
                    placeOfBirth: '',
                    passportNumber: '',
                    issuedBy: '',
                    issueDate: '',
                    expireDate: '',
                    notes: '',
                    mainContact: false
                }}
                innerRef={currentStepFormRef}
                onSubmit={(values, {setSubmitting}) => {
                    const lastItem = initialValues[initialValues.length - 1];
                    const item = {
                        ...values,
                        id: lastItem ? lastItem.id + 1 : 1
                    };
                    setFormValues(currentStepFormName, initialValues.concat(item));
                }}
            >
                <Form>
                    <h2>Add Guest</h2>
                    <Grid container spacing={1} >
                        <Grid container spacing={2} >
                            <Grid item xs={12} >
                                <FormikInputField
                                    placeholder='Search by FirstName, lastname, email...'
                                    name='searchGuest'
                                    className={classes.inputSearch}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <FormikInputField
                                    label='First Name'
                                    name='firstName'
                                    className={classes.inputItem}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormikInputField
                                    label='Last Name'
                                    name='lastName'
                                    className={classes.inputItem}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <FormikInputField
                                    label='Phone'
                                    name='phone'
                                    className={classes.inputItem}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormikInputField
                                    label='email'
                                    name='email'
                                    className={classes.inputItem}
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <FormikInputField
                                    label='Date of birth'
                                    name='dateOfBirth'
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormikInputField
                                    label='Place of birth'
                                    name='placeOfBirth'
                                    className={classes.inputItem}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <FormikInputField
                                    label='Passport number'
                                    name='passportNumber'
                                    className={classes.inputItem}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormikInputField
                                    label='Issued by'
                                    name='issuedBy'
                                    className={classes.inputItem}
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <FormikInputField
                                    label='Issue date'
                                    name='issueDate'
                                    className={classes.inputItem}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormikInputField
                                    label='Expire date'
                                    name='expireDate'
                                    className={classes.inputItem}
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <FormikInputField
                                label='Notes'
                                name='notes'
                                className={classes.notes}
                                multiline={true}
                                rows={4}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <FormikCheckbox
                                label='Main contact'
                                name='mainContact'
                                className={classes.inputItem}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Button type={'submit'}
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}>
                                Save
                            </Button>
                        </Grid>
                    </Grid>

                </Form>
            </Formik>
            <Box component="div" display="flex" justifyContent="space-between" p={1}>
                <DataGrid rows={initialValues} columns={GUESTS_COLUMNS} autoHeight/>
            </Box>
        </div>
    )
};

export default Guests;
