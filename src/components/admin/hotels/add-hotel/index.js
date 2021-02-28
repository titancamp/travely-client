import React from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Rating from 'material-ui-rating';

import ManageAttachments from './manage-attachments';

import './add-hotel.css'
import { FormControl } from '@material-ui/core';

export default class AddHotel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            stars: 0,
            address: '',
            contactName: '',
            email: '',
            phone: '',
            website: '',
            attachments: [
                { id: 1, name: "description.docx", url: "localhost/cdn/description.docx" },
                { id: 2, name: "Promotion.pdf", url: "localhost/cdn/promotion.pdf" }
            ]
        };

        this.resetForm = this.resetForm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleStarsChange = this.handleStarsChange.bind(this);
        this.handleHotelAdd = this.handleHotelAdd.bind(this);
        this.handleAttachmentRemove = this.handleAttachmentRemove.bind(this);
        this.handleAttachmentAdd = this.handleAttachmentAdd.bind(this);
    }

    resetForm() {
        this.setState({
            name: '',
            stars: 0,
            address: '',
            contactName: '',
            email: '',
            phone: '',
            website: '',
            attachments: []
        });

        this.props.handleAddHotelModalToggle();
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({
            [name]: value
        });
    }

    handleStarsChange(value) {
        this.setState({
            stars: value
        });
    }

    handleHotelAdd() {
        console.log('new hotel added');
        console.table(this.state);

        this.resetForm();
    }

    handleAttachmentRemove(attachmentId) {
        console.log("attachment removed");
        this.setState(state => ({
            attachments: state.attachments.filter(item => item.id !== attachmentId)
        }));
    }

    handleAttachmentAdd(event) {
        const files = event.target.files;

        if (!files.length) {
            return;
        }

        var file = files[0];

        console.log('file uploaded');

        var fileName = file.name;
        var addedFile = {
            id: this.state.attachments.length + 1,
            name: fileName,
            url: 'localhost/cdn/' + fileName.toLowerCase(),
        };
        this.setState(state => ({
            attachments: [...state.attachments, addedFile]
        }));
    }

    renderInputField(name, label, type) {
        return (
            <TextField onChange={this.handleInputChange}
                value={this.state[name]}
                helperText={null}
                error={false}
                id={name}
                name={name}
                placeholder={label}
                aria-describedby={label}
                InputLabelProps={{
                    shrink: true,
                }}
                autoComplete="no"
                variant="outlined"
                size="small"
                type={type} />
        );
    }

    render() {
        const { isOpen } = this.props;

        return (
            <Dialog open={isOpen} onClose={() => null} aria-labelledby="form-dialog-title" maxWidth="md">
                <DialogTitle id="form-dialog-title">Add new hotel</DialogTitle>
                <DialogContent>
                    <Container>
                        <form noValidate autoComplete="off">
                            <Grid container direction="row" justify="center" alignItems="flex-start" spacing={3}>
                                <Grid item xs={6}>
                                    {this.renderInputField('name', 'Name', 'text')}
                                    <FormControl>
                                        <Rating
                                            id="stars"
                                            name="stars"
                                            value={this.state.stars}
                                            max={5}
                                            onChange={this.handleStarsChange}
                                        />
                                    </FormControl>
                                    {this.renderInputField('address', 'Address', 'text')}
                                    {this.renderInputField('contactName', 'ContactName', 'text')}
                                    {this.renderInputField('email', 'Email', 'text')}
                                    {this.renderInputField('phone', 'Phone', 'text')}
                                    {this.renderInputField('website', 'Website', 'text')}
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography>
                                        Attachments:
                                    </Typography>

                                    <ManageAttachments attachments={this.state.attachments}
                                        onAttachmentAdd={this.handleAttachmentAdd}
                                        onAttachmentRemove={this.handleAttachmentRemove} />
                                </Grid>
                            </Grid>
                        </form>
                    </Container>
                </DialogContent>
                <DialogActions>
                    <Button type="submit" variant="contained" color="primary" justify="center" onClick={this.handleHotelAdd}>
                        Add hotel
                    </Button>
                    <Button type="reset" variant="contained" color="primary" justify="center" onClick={this.resetForm}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}