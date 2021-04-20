import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import TourDetails from "./tour-details-step";
import Guests from "./guests-step";
import Hotels from "./hotels-step";
import Activities from "./activities-step";
import Transportation from "./transportation-step";
import TourGuide from "./tour-guide-step";


const useStyles = makeStyles({
  container: {
    maxWidth: "none",
    height: "auto",
    padding: 35,
    paddingTop: 15
  }
});

const initialTourState = {
  tourDetails: {
    tourName: "",
    origin: "",
    startDate: "",
    endDate: "",
    pickTime: "",
    pickDetails: "",
    dropTime: "",
    dropDetails: "",
    notes: ""
  },
  guests: {
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
  },
  hotels: {
    hotelName: "",
    checkinDate: "",
    checkoutDate: "",
    bookingState: "",
    cancellationDate: "",
    notes: "",
    rooms: [
      {
        roomType: "",
        roomCount: 0,
        roomGuests: []
      }
    ]
  },
  activities: {
    activityName: "",
    date: "",
    time: "",
    numberOfGuests: "",
    status: "",
    notes: ""
  },
  transportation: {
    destination: "",
    companyName: "",
    startDate: "",
    endDate: "",
    driverName: "",
    carModel: "",
    hotelName: "",
    roomType: "",
    roomCount: "",
    notes: "",
    accomodation: false
  },
  tourGuide: {
    destination: "",
    activityName: "",
    date: "",
    guideName: "",
    hotelName: "",
    roomType: "",
    roomCount: "",
    notes: "",
    accomodation: false
  }
}

const CreateTour = () => {
  const classes = useStyles();
  const [tour, setTour] = useState(initialTourState);

  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setTour(initialTourState);
    setOpen(false);
    setActiveStep(0);
  };

  const handleNext = (currStep, data) => {
    setTour({ ...tour, [currStep]: data });
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = (currStep, data) => {
    setTour({ ...tour, [currStep]: data });
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFinish = (currStep, data) => {
    setTour({ ...tour, [currStep]: data });
    console.log("your tour model: ", tour);
    handleClose();
  };

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <TourDetails state={tour.tourDetails} onClose={handleClose} onNext={handleNext} />;
      case 1:
        return <Guests state={tour.guests} onBack={handleBack} onNext={handleNext} />;
      case 2:
        return <Hotels state={tour.hotels} onBack={handleBack} onNext={handleNext} />;
      case 3:
        return <Activities state={tour.activities} onBack={handleBack} onNext={handleNext} />;
      case 4:
        return <Transportation state={tour.transportation} onBack={handleBack} onNext={handleNext} />;
      case 5:
        return <TourGuide state={tour.tourGuide} onBack={handleBack} onNext={handleFinish} />;
      default:
        return <Button variant="contained"
          color="primary"
          onClick={handleClose}
        >Close</Button>;
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
      <Dialog maxWidth="xl" disableBackdropClick onClose={handleClose} aria-labelledby="dialog-title" open={open}>
        <Container className={classes.container}>
          {getStepContent(activeStep)}
        </Container>
      </Dialog>
    </React.Fragment>
  );
}

export default CreateTour;
