import React, {Component} from 'react';
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TourDetail from "./TourDetail";
import Guest from "./Guests";
import {
    ACTIVITIES_ROWS,
    ASSIGN_TOUR_GUIDE_ROWS,
    GUESTS_ROWS,
    HOTEL_ROWS,
    TRANSPORTATION_ROWS
} from "../utils/constants";
import Hotel from "./Hotel";
import Activity from "./Activity";
import Transportation from "./Transportation";
import AssignTourGuide from "./AssignTourGuide";

const CREATE_TOUR_STEPS = [
    {
        component: TourDetail,
        dialogTitle: 'Tour Details',
        formName: 'tourDetailData'
    },
    {
        component: Guest,
        dialogTitle: 'Guests',
        formName: 'guestsData'
    },
    {
        component: Hotel,
        dialogTitle: 'Hotels',
        formName: 'hotels'
    },
    {
        component: Activity,
        dialogTitle: 'Activities',
        formName: 'activities'
    },
    {
        component: Transportation,
        dialogTitle: 'Transportation',
        formName: 'transportation'
    },
    {
        component: AssignTourGuide,
        dialogTitle: 'Assign Tour Guide',
        formName: 'assignTourGuide'
    },
];

class CreateTour extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentStepIndex: 0,
            tourDetailData: null,
            guestsData: GUESTS_ROWS,
            hotels: HOTEL_ROWS,
            activities: ACTIVITIES_ROWS,
            transportation: TRANSPORTATION_ROWS,
            assignTourGuide: ASSIGN_TOUR_GUIDE_ROWS
        };
        this.handleNextStep = this.handleNextStep.bind(this);
        this.handlePreviousStep = this.handlePreviousStep.bind(this);
        this.handleSaveTour = this.handleSaveTour.bind(this);
        this.setFormValues = this.setFormValues.bind(this);

        this.currentStepFormRef = React.createRef();
    }

    handleNextStep() {
        const {currentStepIndex} = this.state;
        const {currentStepFormRef} = this;
        if (currentStepIndex === 0) {
            if (currentStepFormRef.current) {
                currentStepFormRef.current.handleSubmit()
            }
        }
        this.setState({
            currentStepIndex: this.state.currentStepIndex + 1
        })
    }

    handlePreviousStep() {
        this.setState({
            currentStepIndex: this.state.currentStepIndex - 1
        })
    }

    handleSaveTour() {
        this.props.handleCreateModalToggle();
        // save tour
    }

    setFormValues(name, values) {
        this.setState({
            [name]: values
        })
    }

    render() {
        const {handlePreviousStep, handleNextStep, handleSaveTour, setFormValues, currentStepFormRef} = this;
        const {currentStepIndex} = this.state;
        const {isOpen, handleClose} = this.props;

        const currentStep = CREATE_TOUR_STEPS[currentStepIndex];
        console.log(currentStepIndex);
        const CurrentStepComponent = currentStep.component;
        const currentStepTitle = currentStep.dialogTitle;
        const currentStepFormName = currentStep.formName;
        const currentStepFormInitialValues = this.state[currentStepFormName];

        return (
            <>
                <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Create new tour - Step {currentStepIndex + 1} - {currentStepTitle}</DialogTitle>
                    <DialogContent>
                        <CurrentStepComponent
                            currentStepFormRef={currentStepFormRef}
                            currentStepFormName={currentStepFormName}
                            initialValues={currentStepFormInitialValues}
                            setFormValues={setFormValues}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={currentStepIndex ? handlePreviousStep : handleClose} color="primary">
                            {currentStepIndex ? `Back: ${CREATE_TOUR_STEPS[currentStepIndex - 1].dialogTitle}` : 'Cancel'}
                        </Button>
                        <Button onClick={currentStepIndex === CREATE_TOUR_STEPS.length - 1 ? handleSaveTour : handleNextStep} color="primary">
                            {currentStepIndex === CREATE_TOUR_STEPS.length - 1 ? 'Save Tour' : `Next: ${CREATE_TOUR_STEPS[currentStepIndex + 1].dialogTitle}`}
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }
}

export default CreateTour;