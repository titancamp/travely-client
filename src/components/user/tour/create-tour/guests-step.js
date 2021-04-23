import React, { useCallback, useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import { DataGrid } from "@material-ui/data-grid";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from "@material-ui/core/Checkbox";
import { GUESTS_COLUMNS } from "../utils/constants";

const useStyles = makeStyles({
    form: {
        marginTop: 15,
        paddingLeft: 400
    },
    label: {
        fontSize: "0.75em"
    },
    submit: {
        position: "relative",
        top: "77%"
    }
});

const validate = values => {
    const errors = {};

    if (!values.firstName) {
        errors.firstName = "Required";
    }

    if (!values.lastName) {
        errors.lastName = "Required";
    }

    if (!values.phone) {
        errors.phone = "Required";
    } else if (!(/^(?:[+\d].*\d|\d)$/).test(values.phone)) {
        errors.phone = "Numbers only";
    }

    if (!values.email) {
        errors.email = "Required";
    } else if (!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(values.email)) {
        errors.email = "Not valid email";
    }

    if (!values.dateOfBirth) {
        errors.dateOfBirth = "Required";
    }

    if (!values.placeOfBirth) {
        errors.placeOfBirth = "Required";
    }

    if (!values.passportNumber) {
        errors.passportNumber = "Required";
    } else if (!(/^[0-9\b]+$/).test(values.passportNumber)) {
        errors.passportNumber = "Numbers only";
    }

    if (!values.issuedBy) {
        errors.issuedBy = "Required";
    }

    if (!values.issueDate) {
        errors.issueDate = "Required";
    }

    if (!values.expireDate) {
        errors.expireDate = "Required";
    }

    return errors;
};


const Guests = (props) => {
    const classes = useStyles();
    const onNext = props.onNext;
    const [guests, setGuests] = useState(props.state);
    const initialState = {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        dateOfBirth: "",
        placeOfBirth: "",
        passportNumber: "",
        issuedBy: "",
        issueDate: "",
        expireDate: "",
        notes: "",
        mainContact: false
    };
    const formik = useFormik({
        initialValues: initialState,
        validate,
        onSubmit: newGuest => {
            const guest = guests.reduce((prev, curr) => prev.id < curr.id ? prev : curr, {});
            newGuest.id = guest && !isNaN(guest.id) ? guest.id - 1 : 0;
            setGuests([...guests, newGuest]);
            formik.resetForm(initialState);
        }
    });

    const navigateToNextStep = useCallback(() => {
        onNext('guests', guests);
    }, [onNext, guests]);

    return (
        <React.Fragment>
            <Grid item xs={12}>
                <Typography variant="h5">Create new tour - Step 2 - Guests</Typography>
                <Divider variant="fullWidth" />
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <form className={classes.form}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Typography variant="h6">Add Guest</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    id="firstName"
                                    name="firstName"
                                    label="First name"
                                    error={formik.errors.firstName ? true : false}
                                    helperText={formik.errors.firstName ? formik.errors.firstName : ""}
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    id="lastName"
                                    name="lastName"
                                    label="Last name"
                                    error={formik.errors.lastName ? true : false}
                                    helperText={formik.errors.lastName ? formik.errors.lastName : ""}
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    id="phone"
                                    name="phone"
                                    label="Phone"
                                    error={formik.errors.phone ? true : false}
                                    helperText={formik.errors.phone ? formik.errors.phone : ""}
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    id="email"
                                    name="email"
                                    label="Email"
                                    error={formik.errors.email ? true : false}
                                    helperText={formik.errors.email ? formik.errors.email : ""}
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <InputLabel className={classes.label} id="endLbl">Date of birth</InputLabel>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    id="dateOfBirth"
                                    name="dateOfBirth"
                                    type="date"
                                    error={formik.errors.dateOfBirth ? true : false}
                                    helperText={formik.errors.dateOfBirth ? formik.errors.dateOfBirth : ""}
                                    value={formik.values.dateOfBirth}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <InputLabel className={classes.label}>Place of birth</InputLabel>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    id="placeOfBirth"
                                    name="placeOfBirth"
                                    error={formik.errors.placeOfBirth ? true : false}
                                    helperText={formik.errors.placeOfBirth ? formik.errors.placeOfBirth : ""}
                                    value={formik.values.placeOfBirth}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    id="passportNumber"
                                    name="passportNumber"
                                    label="Passport number"
                                    error={formik.errors.passportNumber ? true : false}
                                    helperText={formik.errors.passportNumber ? formik.errors.passportNumber : ""}
                                    value={formik.values.passportNumber}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    id="issuedBy"
                                    name="issuedBy"
                                    label="Issued by"
                                    error={formik.errors.issuedBy ? true : false}
                                    helperText={formik.errors.issuedBy ? formik.errors.issuedBy : ""}
                                    value={formik.values.issuedBy}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    id="issueDate"
                                    name="issueDate"
                                    label="Issue date"
                                    type="date"
                                    error={formik.errors.issueDate ? true : false}
                                    helperText={formik.errors.issueDate ? formik.errors.issueDate : ""}
                                    value={formik.values.issueDate}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    id="expireDate"
                                    name="expireDate"
                                    label="Expire date"
                                    type="date"
                                    error={formik.errors.expireDate ? true : false}
                                    helperText={formik.errors.expireDate ? formik.errors.expireDate : ""}
                                    value={formik.values.expireDate}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
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
                        </Grid>
                    </form>
                </Grid>
                <Grid item xs={4}>
                    <div className={classes.submit}>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        id="mainContact"
                                        name="mainContact"
                                        color="primary"
                                        checked={formik.values.mainContact}
                                        onChange={formik.handleChange}
                                    />
                                }
                                label="Main contact"
                            />
                        </Grid>
                        <Button variant="contained"
                            color="primary"
                            onClick={formik.handleSubmit}
                        >
                            Save
                        </Button>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <DataGrid
                        rows={guests}
                        columns={GUESTS_COLUMNS}
                        autoHeight
                        pageSize={5}
                    />
                </Grid>
                <Grid item xs={12}>
                    <br /><br /><br />
                    <Grid container spacing={7} justify="space-between" alignItems="flex-end">
                        <Grid item xs={10}>
                            <Button variant="contained"
                                color="default"
                                onClick={() => props.onBack("guests", formik.values)}
                            >
                                Back: Tour Details
                            </Button>
                        </Grid>
                        <Grid item xs={2} >
                            <Button variant="contained" fullWidth
                                color="primary"
                                onClick={navigateToNextStep}
                            >
                                Next: Add hotels
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default Guests;