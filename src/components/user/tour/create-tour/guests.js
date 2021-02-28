import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import {DataGrid} from "@material-ui/data-grid";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import {GUESTS_COLUMNS, GUESTS_ROWS} from "../utils/constants";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default class Guest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            guestsGridColumns: GUESTS_COLUMNS,
            searchValue: ''
        };
        this.handleSaveClick = this.handleSaveClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleSaveClick() {
        const {formValues, handleAddData, currentStepDataKey} = this.props;
        handleAddData(currentStepDataKey, formValues)
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        const {currentStepName, handleInputChange, formValues, data} = this.props;
        const {guestsGridColumns, searchValue} = this.state;
        const searchedDataRows = data.filter(item => (item.firstName + ' ' + item.lastName).toLowerCase().includes(searchValue.toLowerCase()));
        return <div>
            <h2>Create new tour - Step 2 - Guests</h2>
            <div className="guests-container">
                <h3>Add guest</h3>
                <div className="form-field">
                    <TextField onChange={this.handleInputChange}
                               value={this.state.searchValue}
                               id="search"
                               name="searchValue"
                               placeholder="Search by first name, last name...."
                               InputLabelProps={{
                                   shrink: true,
                               }}
                               type="text"/>
                </div>
                <div className="form-pair-fields">
                    <TextField onChange={e => handleInputChange(currentStepName, e)}
                               value={formValues.firstName}
                               id="firstName"
                               name="firstName"
                               label="First Name"
                               InputLabelProps={{
                                   shrink: true,
                               }}
                               type="text"/>
                    <TextField onChange={e => handleInputChange(currentStepName, e)}
                               value={formValues.lastName}
                               id="lastName"
                               name="lastName"
                               label="Last Name"
                               InputLabelProps={{
                                   shrink: true,
                               }}
                               type="text"/>
                </div>
                <div className="form-pair-fields">
                    <TextField onChange={e => handleInputChange(currentStepName, e)}
                               value={formValues.phone}
                               id="phone"
                               name="phone"
                               label="Phone"
                               InputLabelProps={{
                                   shrink: true,
                               }}
                               type="text"/>

                    <TextField onChange={e => handleInputChange(currentStepName, e)}
                               value={formValues.email}
                               id="email"
                               name="email"
                               label="Email"
                               InputLabelProps={{
                                   shrink: true,
                               }}
                               type="text"/>
                </div>

                <div className="form-pair-fields">
                    <TextField onChange={e => handleInputChange(currentStepName, e)}
                               value={formValues.dateOfBirth}
                               id="dateOfBirth"
                               name="dateOfBirth"
                               label="Date of Birth"
                               InputLabelProps={{
                                   shrink: true,
                               }}
                               type="date"/>

                    <TextField onChange={e => handleInputChange(currentStepName, e)}
                               value={formValues.placeOfBirth}
                               id="placeOfBirth"
                               name="placeOfBirth"
                               label="Place of birth"
                               InputLabelProps={{
                                   shrink: true,
                               }}
                               type="text"/>
                </div>

                <div className="form-pair-fields">
                    <TextField onChange={e => handleInputChange(currentStepName, e)}
                               value={formValues.passport}
                               id="passport"
                               name="passportNumber"
                               label="Passport number"
                               InputLabelProps={{
                                   shrink: true,
                               }}
                               type="text"/>

                    <TextField onChange={e => handleInputChange(currentStepName, e)}
                               value={formValues.issuedBy}
                               id="issuedBy"
                               name="issuedBy"
                               label="Issued by"
                               InputLabelProps={{
                                   shrink: true,
                               }}
                               type="text"/>
                </div>

                <div className="form-pair-fields">
                    <TextField onChange={e => handleInputChange(currentStepName, e)}
                               value={formValues.issueDate}
                               id="issueDate"
                               name="issueDate"
                               label="Issue Date"
                               InputLabelProps={{
                                   shrink: true,
                               }}
                               type="date"/>

                    <TextField onChange={e => handleInputChange(currentStepName, e)}
                               value={formValues.expirationDate}
                               id="expirationDate"
                               name="expirationDate"
                               label="Expire Date"
                               InputLabelProps={{
                                   shrink: true,
                               }}
                               type="date"/>
                </div>

                <div className="form-field">
                    <TextField onChange={e => handleInputChange(currentStepName, e)}
                               value={formValues.notes}
                               id="notes"
                               name="notes"
                               label="Notes"
                               multiline
                               rows='4'
                               InputLabelProps={{
                                   shrink: true,
                               }}
                               type="text"/>
                </div>

                <div className="guest-bottom-actions">
                    <FormControlLabel
                        control={<Checkbox
                            icon={<CheckBoxOutlineBlankIcon fontSize="small"/>}
                            checkedIcon={<CheckBoxIcon fontSize="small"/>}
                            name="mainCheckbox"
                            checked={formValues.mainCheckbox}
                            onChange={e => handleInputChange(currentStepName, e)}
                            label="Main Contact"
                        />}
                        label="Main Contact"
                    />
                    <Button variant="contained"
                            color="primary"
                            onClick={this.handleSaveClick}>
                        Save
                    </Button>
                </div>

            </div>


            <DataGrid rows={searchedDataRows} columns={guestsGridColumns} autoHeight autoPageSize/>
        </div>
    }
}