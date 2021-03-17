import React from "react";
import {Formik, Form} from 'formik';
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import FormikInputField from "../../../UI/FormikComponents/FormikInputField";
import FormikCheckbox from "../../../UI/FormikComponents/FormikCheckbox";
import {DataGrid} from "@material-ui/data-grid";
import {GUESTS_COLUMNS} from "../utils/constants";

const Guests = ({
                    initialValues,
                    currentStepFormRef,
                    setFormValues,
                    currentStepFormName
                }) => {
    return (
        <div>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    phone: '',
                    email: '',
                    dateOfBirth: '',
                    placeOfBirth: '',
                    passportNumber: '',
                    issuedBy: '',
                    issueDate: '',
                    expireDate: '',
                    notes: '',
                    mainContact: false
                }}
                innerRef={currentStepFormRef}
                onSubmit={(values, {setSubmitting}) => {
                    const lastItem = initialValues[initialValues.length - 1];
                    const item = {
                        ...values,
                        id: lastItem ? lastItem.id + 1 : 1
                    };
                    setFormValues(currentStepFormName, initialValues.concat(item));
                }}
            >
                <Form>
                    <Box component="div" display="flex" justifyContent="space-between">
                        <Box component="span">
                            <Box component="div" p={1} display="flex" justifyContent="space-between">
                                <Box component='span' width='48%' clone>
                                    <FormikInputField
                                        label='First Name'
                                        name='firstName'
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Box>
                                <Box component='span' width='48%' clone>
                                    <FormikInputField
                                        label='Last Name'
                                        name='lastName'
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Box>
                            </Box>
                            <Box component="div" p={1} display="flex" justifyContent="space-between">
                                <Box component='span' width='48%' clone>
                                    <FormikInputField
                                        label='Phone'
                                        name='phone'
                                    />
                                </Box>
                                <Box component='span' width='48%' clone>
                                    <FormikInputField
                                        label='email'
                                        name='email'
                                    />
                                </Box>
                            </Box>
                            <Box component="div" p={1} display="flex" justifyContent="space-between">
                                <Box component='span' width='48%' clone>
                                    <FormikInputField
                                        label='Date of birth'
                                        name='dateOfBirth'
                                        type="date"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Box>
                                <Box component='span' width='48%' clone>
                                    <FormikInputField
                                        label='Place of birth'
                                        name='placeOfBirth'
                                    />
                                </Box>
                            </Box>
                            <Box component="div" p={1} display="flex" justifyContent="space-between">
                                <Box component='span' width='48%' clone>
                                    <FormikInputField
                                        label='Passport number'
                                        name='passportNumber'
                                    />
                                </Box>
                                <Box component='span' width='48%' clone>
                                    <FormikInputField
                                        label='Issued by'
                                        name='issuedBy'
                                    />
                                </Box>
                            </Box>
                            <Box component="div" p={1} display="flex" justifyContent="space-between">
                                <Box component='span' width='48%' clone>
                                    <FormikInputField
                                        label='Issue date'
                                        name='issueDate'
                                    />
                                </Box>
                                <Box component='span' width='48%' clone>
                                    <FormikInputField
                                        label='Expire date'
                                        name='expireDate'
                                    />
                                </Box>
                            </Box>
                            <Box component="div" p={1}>
                                <Box component='span' width='100%' clone>
                                    <FormikInputField
                                        label='Notes'
                                        name='notes'
                                        multiline={true}
                                        rows={4}
                                    />
                                </Box>
                            </Box>
                        </Box>
                        <Box component="span" displey="flex" alignItems="flex-end">
                            <FormikCheckbox
                                label='Main contact'
                                name='mainContact'
                            />
                            <Button type={'submit'} variant="contained" color="primary">
                                Save
                            </Button>
                        </Box>
                    </Box>
                </Form>
            </Formik>
            <Box component="div" display="flex" justifyContent="space-between" p={1}>
                <DataGrid rows={initialValues} columns={GUESTS_COLUMNS} autoHeight/>
            </Box>
        </div>
    )
};

export default Guests;