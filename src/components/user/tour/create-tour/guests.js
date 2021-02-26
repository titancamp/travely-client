import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import {DataGrid} from "@material-ui/data-grid";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

export default class Guest extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const {currentStepName, handleInputChange, formValues} = this.props;

        return <div>
            <h2>Create new tour - Step 2 - Guests</h2>
            <div>
                <TextField onChange={e=> handleInputChange(currentStepName, e)}
                           value={formValues.firstName}
                           id="firstName"
                           name="firstName"
                           label="First Name"
                           InputLabelProps={{
                               shrink: true,
                           }}
                           type="text"/>

                <TextField onChange={e=> handleInputChange(currentStepName, e)}
                           value={formValues.lastName}
                           id="lastName"
                           name="lastName"
                           label="Last Name"
                           InputLabelProps={{
                               shrink: true,
                           }}
                           type="text"/>
            </div>
            <div>
                <TextField onChange={e=> handleInputChange(currentStepName, e)}
                           value={formValues.phone}
                           id="phone"
                           name="phone"
                           label="Phone"
                           InputLabelProps={{
                               shrink: true,
                           }}
                           type="text"/>

                <TextField onChange={e=> handleInputChange(currentStepName, e)}
                           value={formValues.email}
                           id="email"
                           name="email"
                           label="Email"
                           InputLabelProps={{
                               shrink: true,
                           }}
                           type="text"/>
            </div>

            <div>
                <TextField onChange={e=> handleInputChange(currentStepName, e)}
                           value={formValues.dateOfBirth}
                           id="dateOfBirth"
                           name="dateOfBirth"
                           label="Date of Birth"
                           InputLabelProps={{
                               shrink: true,
                           }}
                           type="date"/>

                <TextField onChange={e=> handleInputChange(currentStepName, e)}
                           value={formValues.placeOfBirth}
                           id="placeOfBirth"
                           name="placeOfBirth"
                           label="Place of birth"
                           InputLabelProps={{
                               shrink: true,
                           }}
                           type="text"/>
            </div>

            <div>
                <TextField onChange={e=> handleInputChange(currentStepName, e)}
                           value={formValues.passport}
                           id="passport"
                           name="passport"
                           label="Passport number"
                           InputLabelProps={{
                               shrink: true,
                           }}
                           type="text"/>

                <TextField onChange={e=> handleInputChange(currentStepName, e)}
                           value={formValues.issuedBy}
                           id="issuedBy"
                           name="issuedBy"
                           label="Issued by"
                           InputLabelProps={{
                               shrink: true,
                           }}
                           type="text"/>
            </div>

            <div>
                <TextField onChange={e=> handleInputChange(currentStepName, e)}
                           value={formValues.issueDate}
                           id="issueDate"
                           name="issueDate"
                           label="Issue Date"
                           InputLabelProps={{
                               shrink: true,
                           }}
                           type="date"/>

                <TextField onChange={e=> handleInputChange(currentStepName, e)}
                           value={formValues.expirationDate}
                           id="expirationDate"
                           name="expirationDate"
                           label="Expire Date"
                           InputLabelProps={{
                               shrink: true,
                           }}
                           type="date"/>
            </div>

            <div>
                <TextField onChange={e=> handleInputChange(currentStepName, e)}
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
                <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    name="mainCheckbox"
                    checked={formValues.mainCheckbox}
                    onChange={e=> handleInputChange(currentStepName, e)}
                />

                <Button variant="contained" color="primary">
                    Save
                </Button>
            </div>


            <DataGrid rows={formValues.geustsGridRows} columns={formValues.geustsGridColumns} autoHeight autoPageSize />
        </div>
    }
}