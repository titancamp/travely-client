import React from "react";
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
import { TRANSPORTATION_ROWS, TRANSPORTATION_COLUMNS } from "../utils/constants";

const useStyles = makeStyles({
    form: {
        padding: 60,
        paddingTop: 15
    },
    error: {
        marginTop: 4,
        marginLeft: 14
    },
    divider: {
        position: "absolute",
        height: "42vh",
        left: 0,
        right: 0,
        margin: "auto"
    },
    label: {
        fontSize: "0.75em"
    }
});

const validate = values => {
    const errors = {};

    if (!values.destination) {
        errors.destination = "Required";
    }

    if (!values.companyName) {
        errors.companyName = "Required";
    }

    if (!values.startDate) {
        errors.startDate = "Required";
    }

    if (!values.endDate) {
        errors.endDate = "Required";
    }

    if (!values.hotelName) {
        errors.hotelName = "Required";
    }

    if (!values.driverName) {
        errors.driverName = "Required";
    }
    
    if (!values.carModel) {
        errors.carModel = "Required";
    }
    
    if (!values.roomType) {
        errors.roomType = "Required";
    }
    
    if (!values.roomCount) {
        errors.roomCount = "Required";
    }

    return errors;
};

const Transportation = (props) => {
    const classes = useStyles();
    const formik = useFormik({
        initialValues: props.state,
        validate,
        onSubmit: values => {
            props.onNext("transportation", values)
        },
    });

    return (
        <React.Fragment>
            <Grid item xs={12}>
                <Typography variant="h5">Create new tour - Step 5 - Transportation</Typography>
                <Divider variant="fullWidth" />
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <form className={classes.form}>
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <Typography variant="h6">Transportation Arrangement</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth
                                            size="small"
                                            variant="outlined"
                                            error={formik.errors.destination ? true : false}
                                        >
                                            <InputLabel id="destinationLbl">Destination</InputLabel>
                                            <Select
                                                variant="outlined"
                                                id="destination"
                                                name="destination"
                                                label="Destination"
                                                labelId="destinationLbl"
                                                value={formik.values.destination}
                                                onChange={formik.handleChange}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={10}>Destination1</MenuItem>
                                                <MenuItem value={20}>Destination2</MenuItem>
                                                <MenuItem value={30}>Destination3</MenuItem>
                                            </Select>
                                            {formik.errors.destination &&
                                                <Typography className={classes.error} variant="caption" display="block" gutterBottom color="error">
                                                    {formik.errors.destination}
                                                </Typography>
                                            }
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            size="small"
                                            id="companyName"
                                            name="companyName"
                                            label="Company Name"
                                            error={formik.errors.companyName ? true : false}
                                            helperText={formik.errors.companyName ? formik.errors.companyName : ""}
                                            value={formik.values.companyName}
                                            onChange={formik.handleChange}
                                        />
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
                                            helperText={formik.errors.startDate ? formik.errors.startDate : ""}
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
                                            helperText={formik.errors.endDate ? formik.errors.endDate : ""}
                                            value={formik.values.endDate}
                                            onChange={formik.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            size="small"
                                            id="driverName"
                                            name="driverName"
                                            label="Driver Name"
                                            error={formik.errors.driverName ? true : false}
                                            helperText={formik.errors.driverName ? formik.errors.driverName : ""}
                                            value={formik.values.driverName}
                                            onChange={formik.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            size="small"
                                            id="carModel"
                                            name="carModel"
                                            label="Car Type/Model"
                                            error={formik.errors.carModel ? true : false}
                                            helperText={formik.errors.carModel ? formik.errors.carModel : ""}
                                            value={formik.values.carModel}
                                            onChange={formik.handleChange}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            multiline
                                            variant="outlined"
                                            id="notes"
                                            label="Notes"
                                            name="notes"
                                            value={formik.values.notes}
                                            onChange={formik.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth
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
                                            {formik.errors.hotelName &&
                                                <Typography className={classes.error} variant="caption" display="block" gutterBottom color="error">
                                                    {formik.errors.hotelName}
                                                </Typography>
                                            }
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
                                            helperText={formik.errors.roomType ? formik.errors.roomType : ""}
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
                                            helperText={formik.errors.roomCount ? formik.errors.roomCount : ""}
                                            value={formik.values.roomCount}
                                            onChange={formik.handleChange}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={8} direction="row" justify="space-between">
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
                                    <Grid item xs={8} >
                                        <Grid container direction="column" alignItems="flex-end">
                                            <Button variant="contained"
                                                color="primary"                                                
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
                        rows={TRANSPORTATION_ROWS}
                        columns={TRANSPORTATION_COLUMNS}
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
                                onClick={() => props.onBack("transportation", formik.values)}
                            >
                                Back: Activities
                            </Button>
                        </Grid>
                        <Grid item xs={2} >
                            <Button variant="contained" fullWidth
                                color="primary"
                                onClick={formik.handleSubmit}
                            >
                                Next: Assign Tour Guide
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default Transportation;