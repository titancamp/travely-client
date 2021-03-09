import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
    Button,
    Box,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    TextField,
    Typography,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import HotelIcon from '@material-ui/icons/Hotel';

import ManageAttachments from './manage-attachments';
import HotelClient from '../../../../api/hotel-client';

const validationSchema = yup.object({
    name: yup
        .string('Enter hotel name')
        .required('Hotel name is required'),
    address: yup
        .string('Enter address'),
    contactName: yup
        .string('Enter contact name'),
    email: yup
        .string('Enter email')
        .email('Enter a valid email'),
    phone: yup
        .string('Enter phone'),
    website: yup
        .string('Enter website'),
});

const SaveHotelForm = ({ isOpen, handleSaveHotelModalToggle, hotelModel }) => {
    const isEditForm = Boolean(hotelModel && hotelModel.id);
    const initialValues = hotelModel || {
        name: '',
        stars: 0,
        address: '',
        contactName: '',
        email: '',
        phone: '',
        website: '',
        attachments: [],
    };
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (model, formikHelper) => {
            const newHotel = isEditForm
                ? await HotelClient.editHotel(model)
                : await HotelClient.addHotel(model);

            if (newHotel) {
                formikHelper.resetForm();
            }
        },
        onReset: () => {
            handleSaveHotelModalToggle();
        }
    });

    function handleFileAdd(file) {
        formik.setFieldValue('attachments', [...formik.values.attachments, { name: file.name, blob: file }]);
    }

    function handleAttachmentRemove(attachment) {
        const attachments = formik.values.attachments;
        const index = formik.values.attachments.indexOf(attachment);
        if (index > -1) {
            attachments.splice(index, 1);
            formik.setFieldValue('attachments', attachments);
        }
    }

    const inputMb = 1;
    const dialogTitle = isEditForm ? 'Edit new hotel' : 'Add new hotel';

    return (
        <Dialog open={isOpen} maxWidth="lg">
            <DialogTitle><HotelIcon />{dialogTitle}</DialogTitle>
            <DialogContent>
                <Container>
                    <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
                        <Grid container direction="row" justify="center" alignItems="flex-start" spacing={3}>
                            <Grid item xs={6}>
                                <Box mb={inputMb}>
                                    <TextField
                                        fullWidth
                                        id="name"
                                        name="name"
                                        placeholder="Name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        helperText={formik.touched.name && formik.errors.name}
                                        variant="outlined"
                                        size="small"
                                    />
                                </Box>
                                <FormControl className="rating-form-control" fullWidth>
                                    <Grid container direction="row" justify="center" alignItems="flex-start">
                                        <Grid item xs={5}>
                                            <Typography>Hotel stars:</Typography>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <Rating
                                                id="stars"
                                                name="stars"
                                                value={formik.values.stars}
                                                max={5}
                                                onChange={formik.handleChange}
                                            />
                                        </Grid>
                                    </Grid>
                                </FormControl>
                                <Box mb={inputMb}>
                                    <TextField
                                        fullWidth
                                        id="address"
                                        name="address"
                                        placeholder="Address"
                                        value={formik.values.address}
                                        onChange={formik.handleChange}
                                        error={formik.touched.address && Boolean(formik.errors.address)}
                                        helperText={formik.touched.address && formik.errors.address}
                                        variant="outlined"
                                        size="small"
                                    />
                                </Box>
                                <Box mb={inputMb}>
                                    <TextField
                                        fullWidth
                                        id="contactName"
                                        name="contactName"
                                        placeholder="Contact name"
                                        value={formik.values.contactName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.contactName && Boolean(formik.errors.contactName)}
                                        helperText={formik.touched.contactName && formik.errors.contactName}
                                        variant="outlined"
                                        size="small"
                                    />
                                </Box>
                                <Box mb={inputMb}>
                                    <TextField
                                        fullWidth
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                        variant="outlined"
                                        size="small"
                                    />
                                </Box>
                                <Box mb={inputMb}>
                                    <TextField
                                        fullWidth
                                        id="phone"
                                        name="phone"
                                        placeholder="Phone"
                                        value={formik.values.phone}
                                        onChange={formik.handleChange}
                                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                                        helperText={formik.touched.phone && formik.errors.phone}
                                        variant="outlined"
                                        size="small"
                                    /></Box>
                                <Box mb={inputMb}>
                                    <TextField
                                        fullWidth
                                        id="website"
                                        name="website"
                                        placeholder="Website"
                                        value={formik.values.website}
                                        onChange={formik.handleChange}
                                        error={formik.touched.website && Boolean(formik.errors.website)}
                                        helperText={formik.touched.website && formik.errors.website}
                                        variant="outlined"
                                        size="small"
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box mb={inputMb}>
                                    <Typography>
                                        Attachments:
                                </Typography>
                                </Box>
                                <Box mb={inputMb}>
                                    <ManageAttachments
                                        attachments={formik.values.attachments}
                                        onFileAdd={handleFileAdd}
                                        onAttachmentRemove={handleAttachmentRemove} />
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </DialogContent>
            <DialogActions>
                <Grid container direction="column" justify="center" alignItems="center">
                    <Box width="25%" mb={inputMb}>
                        <Button type="submit" onClick={formik.handleSubmit} variant="contained" color="primary" size="small" fullWidth>
                            Add hotel
                        </Button>
                    </Box>
                    <Box width="25%">
                        <Button type="reset" onClick={formik.handleReset} variant="text" justify="center" size="small" fullWidth>
                            Cancel
                        </Button>
                    </Box>
                </Grid>
            </DialogActions>
        </Dialog>
    );
};

export default SaveHotelForm;