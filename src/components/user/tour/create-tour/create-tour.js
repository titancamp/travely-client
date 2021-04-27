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
import TourClient from "../../../../api/tour-client";
import BOOKING_TYPES from "../../../../utils/booking-types";
import BOOKING_STATUSES from "../../../../utils/booking-statuses";

const useStyles = makeStyles({
  container: {
    maxWidth: "none",
    height: "auto",
    padding: 35,
    paddingTop: 15,
  },
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
    notes: "",
  },
  guests: [],
  hotels: [],
  activities: [],
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
    accomodation: false,
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
    accomodation: false,
  },
  destinations: [],
};

const mapTourCreateModel = (tour) => {
  const hotelBookings = tour.hotels.map((hotel) => ({
    type: BOOKING_TYPES.HOTEL,
    status: +hotel.bookingState,
    notes: hotel.notes,
    name: hotel.name,
    checkInDate: hotel.checkinDate,
    checkOutDate: hotel.checkoutDate,
    cancellationDeadline: hotel.cancellationDate,
    origin: hotel.origin,
    arrivalTime: hotel.arrivalTime,
    arrivalFlightNumber: hotel.arrivalFlightNumber,
    departureTime: hotel.departureTime,
    departureFlightNumber: hotel.departureFlightNumber,
    destination: hotel.destination
  }));

  const activityBookings = tour.activities.map((activity) => ({
    type: BOOKING_TYPES.ACTIVITY,
    status: +activity.status,
    notes: activity.notes,
    checkInDate: activity.date,
    arrivalTime: activity.time,
    guestsCount: activity.numberOfGuests,
    destination: activity.destinations,
  }));

  const transportationBookings = tour.transportation.map((transportation) => ({
    type: BOOKING_TYPES.TRANSPORTATION,
    status: BOOKING_STATUSES.NONE,
    notes: transportation.notes,
    name: transportation.companyName,
    checkInDate: transportation.startDate,
    checkOutDate: transportation.endDate,
    destination: transportation.destination,

    driverName: transportation.driverName,
    carModel: transportation.carModel,
    propertyId: transportation.hotelId,
    roomType: transportation.roomType,
    roomCount: transportation.roomCount,
    accomodation: transportation.accomodation,
  }));

  return {
    isPackage: false,
    name: tour.tourDetails.tourName,
    price: 0,
    origin: tour.tourDetails.origin,
    startDate: tour.tourDetails.startDate,
    endDate: tour.tourDetails.endDate,
    pickUpTime: tour.tourDetails.pickTime,
    pickUpDetails: tour.tourDetails.pickDetails,
    dropOffTime: tour.tourDetails.dropTime,
    dropOffDetails: tour.tourDetails.dropDetails,
    notes: tour.tourDetails.notes,
    clients: tour.guests,
    bookings: hotelBookings
      .concat(activityBookings)
      .concat(transportationBookings),
  };
};

const saveTour = async (tourModel) => {
  await TourClient.createTour(mapTourCreateModel(tourModel));
};

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
    const destinations = [
      ...new Set(
        tour.hotels
          .map((hotel) => hotel.destination)
          .concat(tour.activities.map((activity) => activity.destinations))
      ),
    ];

    setTour({ ...tour, [currStep]: data, destinations });
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = (currStep, data) => {
    const destinations = [
      ...new Set(
        tour.hotels
          .map((hotel) => hotel.destination)
          .concat(tour.activities.map((activity) => activity.destinations))
      ),
    ];

    setTour({ ...tour, [currStep]: data, destinations });
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFinish = async (currStep, data) => {
    setTour({ ...tour, [currStep]: data });
    console.log("your tour model: ", tour);

    await saveTour(tour);

    handleClose();
  };

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <TourDetails
            state={tour.tourDetails}
            onClose={handleClose}
            onNext={handleNext}
          />
        );
      case 1:
        return (
          <Guests state={tour.guests} onBack={handleBack} onNext={handleNext} />
        );
      case 2:
        return (
          <Hotels
            state={tour.hotels}
            guests={tour.guests}
            onBack={handleBack}
            onNext={handleNext}
          />
        );
      case 3:
        return (
          <Activities
            state={tour.activities}
            onBack={handleBack}
            onNext={handleNext}
          />
        );
      case 4:
        return (
          <Transportation
            state={tour.transportation}
            destinations={tour.destinations}
            onBack={handleBack}
            onNext={handleNext}
          />
        );
      case 5:
        return (
          <TourGuide
            state={tour.tourGuide}
            onBack={handleBack}
            onNext={handleFinish}
          />
        );
      default:
        return (
          <Button variant="contained" color="primary" onClick={handleClose}>
            Close
          </Button>
        );
    }
  }

  return (
    <React.Fragment>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
      >
        Create Tour
      </Button>
      <Dialog
        maxWidth="xl"
        disableBackdropClick
        onClose={handleClose}
        aria-labelledby="dialog-title"
        open={open}
      >
        <Container className={classes.container}>
          {getStepContent(activeStep)}
        </Container>
      </Dialog>
    </React.Fragment>
  );
};

export default CreateTour;
