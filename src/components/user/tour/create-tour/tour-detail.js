import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";

export default class TourDetail extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        const {currentStepName, handleInputChange, formValues} = this.props;

        return (
            <div>
                <h2 className="tour-details-heading">Create new tour - Step 1 - Tour Details</h2>
                <div className="tour-details-top-block">
                    <div className="tour-details-left-block">
                        <h3>Tour Details</h3>
                        <div className="form-field">
                            <FormControl>
                                <InputLabel htmlFor="tourName">Tour Name</InputLabel>
                                <Input id="tourName"
                                       name='tourName'
                                       value={formValues.tourName}
                                       onChange={(e) => handleInputChange(currentStepName, e)}/>
                            </FormControl>
                        </div>
                        <div className="form-field">
                            <FormControl>
                                <InputLabel htmlFor="origin">Origin</InputLabel>
                                <Input id="origin"
                                       value={formValues.origin}
                                       name='origin'
                                       onChange={e => handleInputChange(currentStepName, e)}/>
                            </FormControl>
                        </div>
                        <div className="date-fields">
                            <span className="form-inline-field">
                            <FormControl>
                            <TextField onChange={e => handleInputChange(currentStepName, e)}
                                       value={formValues.startDate}
                                       id="startDate"
                                       name="startDate"
                                       label="Start Date"
                                       InputLabelProps={{
                                           shrink: true,
                                       }}
                                       type="date"/>
                            </FormControl>
                        </span>

                            <span className="form-inline-field">
                            <FormControl>
                            <TextField id="endDate"
                                       label="End Date"
                                       name="endDate"
                                       InputLabelProps={{
                                           shrink: true,
                                       }}
                                       onChange={e => handleInputChange(currentStepName, e)}
                                       value={formValues.endDate}
                                       type="date"/>
                        </FormControl>
                        </span>
                        </div>


                        <div className="date-fields">
                            <TextField id="pickupTime"
                                       label="Pick-up"
                                       name="pickup"
                                       InputLabelProps={{
                                           shrink: true,
                                       }}
                                       inputProps={{
                                           step: 300, // 5 min
                                       }}
                                       onChange={e => handleInputChange(currentStepName, e)}
                                       value={formValues.pickup}
                                       type="time"/>

                            <TextField id="pickup-description"
                                       name='pickupDescription'
                                       label="Details"
                                       value={formValues.pickupDescription}
                                       onChange={(e) => handleInputChange(currentStepName, e)}/>
                        </div>

                        <div className="date-fields">
                            <TextField id="dropoffTime"
                                       label="Drop-off"
                                       name="dropoff"
                                       InputLabelProps={{
                                           shrink: true,
                                       }}
                                       inputProps={{
                                           step: 300, // 5 min
                                       }}
                                       onChange={e => handleInputChange(currentStepName, e)}
                                       value={formValues.dropoff}
                                       type="time"/>

                            <TextField id="dropoff-description"
                                       name='dropoffDescription'
                                       label='Details'
                                       value={formValues.dropoffDescription}
                                       onChange={(e) => handleInputChange(currentStepName, e)}/>
                        </div>
                    </div>

                    <div className="tour-details-right-block">
                        <TextField id="destinations-id"
                                   name='destinations'
                                   label="Destinations"
                                   variant="outlined"
                                   multiline rows={4}
                                   disabled
                                   onChange={e => handleInputChange(currentStepName, e)}
                                   value={formValues.destinations}
                        />
                    </div>
                </div>

                <div className="notes">
                    <TextField id="notes-id"
                               name='notes'
                               label="Notes"
                               variant="outlined"
                               multiline
                               rows={4}
                               value={formValues.notes}
                               onChange={e => handleInputChange(currentStepName, e)}/>
                </div>
            </div>
        )
    }
}