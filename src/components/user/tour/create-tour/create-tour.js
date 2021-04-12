import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import TourDetails from "./tour-details";
// import Guest from "./Guests";
// import {
//   ACTIVITIES_ROWS,
//   ASSIGN_TOUR_GUIDE_ROWS,
//   GUESTS_ROWS,
//   HOTEL_ROWS,
//   TRANSPORTATION_ROWS
// } from "../utils/constants";
// import Hotel from "./Hotel";
// import Activity from "./Activity";
// import Transportation from "./Transportation";
// import AssignTourGuide from "./AssignTourGuide";
import Container from "@material-ui/core/Container";


const useStyles = makeStyles({
  container: {
    maxWidth: "none",
    height: "auto",
    padding: 35
  }
});

const CreateTour = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <TourDetails onClose={handleClose} handleNext={handleNext} />;
      case 1:
        return "Step2";
      case 2:
        return "Step3";
      default:
        return "No step found";
    }
  }

  return (
    <React.Fragment>
      <Button variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
      >
        Create Tour
      </Button>
      <Dialog maxWidth="xl" onClose={handleClose} aria-labelledby="dialog-title" open={open}>
        <Container className={classes.container}>
          {getStepContent(activeStep)}
        </Container>
      </Dialog>
    </React.Fragment>
  );
}

export default CreateTour;
