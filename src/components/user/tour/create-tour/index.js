import React, {Component} from 'react';
import Button from "@material-ui/core/Button";
import Modal from '@material-ui/core/Modal';
import TourDetail from "./tour-detail";
import Guest from "./guests";
import "./create-tour.css";
import {GUESTS_COLUMNS, GUESTS_ROWS} from "../utils/constants";

const CREATE_TOUR_STEPS = [
    {
        component: TourDetail,
        name: 'tourDetail'
    },
    {
        component: Guest,
        name: 'guest'
    },
];

class CreateTour extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentStepIndex: 0,
            tourDetail: {
                tourName: '',
                origin: '',
                startDate: '',
                endDate: '',
                pickup: '14:14',
                dropoff: '14:14',
                pickupDescription: '',
                dropoffDescription: '',
                destinations: '',
                notes: ''
            },
            guest: {
                firstName: '',
                lastName: '',
                phone: '',
                email: '',
                dateOfBirth: '',
                placeOfBirth: '',
                passportNumber: '',
                issuedBy: '',
                expirationDate: '',
                notes: '',
                mainContact: '',
                geustsGridRows: GUESTS_ROWS,
                geustsGridColumns: GUESTS_COLUMNS,
                mainCheckbox: true,
            }
        };
        this.handleNextStep = this.handleNextStep.bind(this);
        this.handlePreviousStep = this.handlePreviousStep.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleNextStep() {
        if (this.state.currentStepIndex === CREATE_TOUR_STEPS.length - 1) {
            this.props.handleCreateModalToggle();
            return;
        }
        this.setState(state => ({
            currentStepIndex: state.currentStepIndex + 1
        }))
    }

    handlePreviousStep() {
        this.setState(state => ({
            currentStepIndex: state.currentStepIndex - 1
        }))
    }

    handleInputChange(componentName, event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState(state => ({
            [componentName]: {
                ...state[componentName],
                [name]: value
            }
        }));
    }

    render() {
        const {currentStepIndex} = this.state;
        const {handleCreateModalToggle} = this.props;
        const CurrentStep = CREATE_TOUR_STEPS[currentStepIndex].component;
        const currentStepName = CREATE_TOUR_STEPS[currentStepIndex].name;

        const prevStepName = currentStepIndex !== 0 ?
            CREATE_TOUR_STEPS[currentStepIndex - 1].name :
            null;
        const nextStepName = currentStepIndex !== CREATE_TOUR_STEPS.length - 1 ?
            CREATE_TOUR_STEPS[currentStepIndex + 1].name :
            null;

        return (
            <Modal
                open={this.props.isOpen}
                onClose={() => null}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                className={"create-tour-modal"}
            >
                <div className={'create-tour-container'}>
                    <div>
                        <CurrentStep
                            currentStepName={currentStepName}
                            handleInputChange={this.handleInputChange}
                            formValues={this.state[currentStepName]}
                        />
                    </div>

                    {
                        currentStepIndex !== 0 ?
                            <div>
                                <Button variant="contained" onClick={this.handlePreviousStep} label={'Previous'}>
                                    Back : {prevStepName}
                                </Button>
                                <Button variant="contained" onClick={this.handleNextStep} label={'Next'} color='primary'>
                                    {nextStepName !== null ? 'Next step: ' + nextStepName : 'Save'}
                                </Button>
                            </div>
                            :
                            <div>
                                <Button variant="contained" onClick={handleCreateModalToggle}
                                        label={'Cancel'}>Cancel </Button>
                                <Button variant="contained" onClick={this.handleNextStep} label={'Next'}>
                                    {nextStepName !== null ? 'Next step: ' + nextStepName : 'Save Tour'}
                                </Button>
                            </div>

                    }
                </div>
            </Modal>
        );
    }
}

export default CreateTour;