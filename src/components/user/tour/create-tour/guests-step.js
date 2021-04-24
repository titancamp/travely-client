import React, { useCallback, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
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
import { Autocomplete } from "@material-ui/lab";
import { GUESTS_COLUMNS } from "../utils/constants";
import TouristClient from "../../../../api/tourist-client";

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

    if (!values.phoneNumber) {
        errors.phoneNumber = "Required";
    } else if (!(/^(?:[+\d].*\d|\d)$/).test(values.phoneNumber)) {
        errors.phoneNumber = "Numbers only";
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

    if (!values.issuedDate) {
        errors.issuedDate = "Required";
    }

    if (!values.expireDate) {
        errors.expireDate = "Required";
    }

    return errors;
};

async function createUpdateTourist(model) {
    const response = model.id
        ? await TouristClient.updateTourist(model)
        : await TouristClient.insertTourist(model);

    return response.data;
}

const Guests = (props) => {
    const classes = useStyles();
    const onNext = props.onNext;
    const [allGuests, setAllGuests] = useState([]);
    const [guests, setGuests] = useState(props.state);
    const initialState = {
        id: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        dateOfBirth: "",
        placeOfBirth: "",
        passportNumber: "",
        issuedBy: "",
        issuedDate: "",
        expireDate: "",
        notes: "",
        mainContact: false
    };
    const formik = useFormik({
        initialValues: initialState,
        validate,
        onSubmit: async guestToCreate => {
            const savedGuest = await createUpdateTourist(guestToCreate);

            setGuests([...guests, savedGuest]);
            fetchAllGuests();
            formik.resetForm(initialState);
        }
    });

    const navigateToNextStep = useCallback(() => {
        onNext('guests', guests);
    }, [onNext, guests]);

    const handleSearchGuestChange = useCallback((event, selectedGuest) => {
        if (selectedGuest) {
            formik.setValues({
                ...selectedGuest,
                mainContact: selectedGuest.isMain,
                selectedGuest: selectedGuest
            });
        }
    }, [formik]);

    async function fetchAllGuests() {
        const response = await TouristClient.getAllTourists()
        setAllGuests(response.data);
    }

    useEffect(() => {
        fetchAllGuests();
    }, []);

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
                            <Grid item xs={12}>
                                <Autocomplete
                                    id="searchGuest"
                                    style={{ width: 300 }}
                                    options={allGuests}
                                    name="selectedGuest"
                                    value={formik.values.selectedGuest}
                                    getOptionLabel={(option) =>
                                        option && `${option.firstName} ${option.lastName} ${option.email} ${option.passportNumber}`}
                                    renderInput={(params) => {
                                        return <TextField
                                            {...params}
                                            label="search by First Name, Last Name, Email, Passport No"
                                            variant="outlined"
                                            inputProps={{
                                                ...params.inputProps,
                                                autoComplete: 'new-password', // disable autocomplete and autofill
                                            }}
                                        />
                                    }}
                                    onChange={handleSearchGuestChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Hidden
                                    xsUp
                                    id="id"
                                    name="id"
                                    value={formik.values.id}
                                    onChange={formik.handleChange} />
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
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    label="Phone"
                                    error={formik.errors.phoneNumber ? true : false}
                                    helperText={formik.errors.phoneNumber ? formik.errors.phoneNumber : ""}
                                    value={formik.values.phoneNumber}
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
                                    id="issuedDate"
                                    name="issuedDate"
                                    label="Issue date"
                                    type="date"
                                    error={formik.errors.issuedDate ? true : false}
                                    helperText={formik.errors.issuedDate ? formik.errors.issuedDate : ""}
                                    value={formik.values.issuedDate}
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