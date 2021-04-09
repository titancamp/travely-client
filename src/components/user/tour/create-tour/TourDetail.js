import React from "react";
import { Formik, Form } from "formik";
import Box from "@material-ui/core/Box";
import FormikInputField from "../../../UI/FormikComponents/FormikInputField";
import Grid from "@material-ui/core/Grid";
import FormikSelect from "../../../UI/FormikComponents/FormikSelect";
import {makeStyles} from "@material-ui/core/styles";

const ORIGINS = [
    {
        value: '1',
        name: 'Origin1'
    },
    {
        value: '2',
        name: 'Origin2'
    },
    {
        value: '3',
        name: 'Origin3'
    },
];

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    selectItem: {
        width: "97%",
        height: 65,
    },
    inputItem: {
        height: 65,
        width: "97%",
    },
    notes: {
        height: 100,
        width: 450,
    },
}));
const TourDetail = ({
                        initialValues,
                        currentStepFormRef,
                        currentStepFormName,
                        setFormValues
                    }) => {
    const classes = useStyles();

    return (
        <Formik
            initialValues={initialValues || {
                tourName: '',
                origin: '',
                startDate: '',
                endDate: '',
                pickUpTime: '',
                pickUpDetails: '',
                dropOffTime: '',
                dropOffDetails: '',
                destinations: '',
                notes: ''
            }}
            innerRef={currentStepFormRef}
            onSubmit={(values, {setSubmitting}) => {
                setFormValues(currentStepFormName, values);
                setSubmitting(false);
            }}
        >
            <Form>
                <h2>Tour Details</h2>

                <Grid container spacing={2}>
                    <Grid container xs={6}>
                        <Grid item xs={12}>
                            <FormikInputField
                                label='Tour Name'
                                name='tourName'
                                className={classes.inputItem}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormikSelect
                                options={ORIGINS}
                                name='origin'
                                label='Origin'
                                className={classes.selectItem}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormikInputField
                                label='Start Date'
                                name='startDate'
                                type='date'
                                className={classes.inputItem}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormikInputField
                                label='End Date'
                                name='endDate'
                                type='date'
                                className={classes.inputItem}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <FormikInputField
                                label='Pick-up'
                                name='pickUpTime'
                                type='time'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormikInputField
                                label='Details'
                                name='pickUpDetails'
                                className={classes.inputItem}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <FormikInputField
                                label='Drop-off'
                                name='dropOffTime'
                                type='time'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormikInputField
                                label='Details'
                                name='dropOffDetails'
                                className={classes.inputItem}
                            />
                        </Grid>
                    </Grid>

                    <Grid container xs={6}>
                        <FormikInputField
                            name='destinations'
                            label="Destinations"
                            multiline
                            rows={4}
                            disabled
                        />
                    </Grid>
                </Grid>

                {/*<Box component="div"  display="flex" justifyContent="space-between">*/}
                {/*    <Box component="span">*/}
                {/*        <Box component="div" p={1}>*/}
                {/*            <Box width='100%' clone>*/}
                {/*                <FormikInputField*/}
                {/*                    label='Tour Name'*/}
                {/*                    name='tourName'*/}
                {/*                />*/}
                {/*            </Box>*/}
                {/*        </Box>*/}
                {/*        <Box component="div" p={1}>*/}
                {/*            <Box width='100%' clone>*/}
                {/*                <FormikInputField*/}
                {/*                    label='Origin'*/}
                {/*                    name='origin'*/}
                {/*                />*/}
                {/*            </Box>*/}
                {/*        </Box>*/}
                {/*        <Box component="div" p={1} display="flex" justifyContent="space-between">*/}
                {/*            <Box component='span' width='48%' clone>*/}
                {/*                <FormikInputField*/}
                {/*                    label='Start Date'*/}
                {/*                    name='startDate'*/}
                {/*                    type='date'*/}
                {/*                    InputLabelProps={{*/}
                {/*                        shrink: true,*/}
                {/*                    }}*/}
                {/*                />*/}
                {/*            </Box>*/}
                {/*            <Box component='span' width='48%' clone>*/}
                {/*                <FormikInputField*/}
                {/*                    label='End Date'*/}
                {/*                    name='endDate'*/}
                {/*                    type='date'*/}
                {/*                    InputLabelProps={{*/}
                {/*                        shrink: true,*/}
                {/*                    }}*/}
                {/*                />*/}
                {/*            </Box>*/}
                {/*        </Box>*/}
                {/*        <Box component="div" p={1} display="flex" justifyContent="space-between">*/}
                {/*            <Box component='span' width='30%' clone>*/}
                {/*                <FormikInputField*/}
                {/*                    label='Pick-up'*/}
                {/*                    name='pickUpTime'*/}
                {/*                    type='time'*/}
                {/*                    InputLabelProps={{*/}
                {/*                        shrink: true,*/}
                {/*                    }}*/}
                {/*                />*/}
                {/*            </Box>*/}
                {/*            <Box component='span' width='66%' clone>*/}
                {/*                <FormikInputField*/}
                {/*                    label='Details'*/}
                {/*                    name='pickUpDetails'*/}
                {/*                />*/}
                {/*            </Box>*/}
                {/*        </Box>*/}
                {/*        <Box component="div" p={1} display="flex" justifyContent="space-between">*/}
                {/*            <Box component='span' width='30%' clone>*/}
                {/*                <FormikInputField*/}
                {/*                    label='Drop-off'*/}
                {/*                    name='dropOffTime'*/}
                {/*                    type='time'*/}
                {/*                    InputLabelProps={{*/}
                {/*                        shrink: true,*/}
                {/*                    }}*/}
                {/*                />*/}
                {/*            </Box>*/}
                {/*            <Box component='span' width='66%' clone>*/}
                {/*                <FormikInputField*/}
                {/*                    label='Details'*/}
                {/*                    name='dropOffDetails'*/}
                {/*                />*/}
                {/*            </Box>*/}
                {/*        </Box>*/}
                {/*    </Box>*/}
                {/*    <Box component="span" height="100%">*/}
                {/*        <Box component="div" width='100%' height="100%" p={1}>*/}
                {/*            <FormikInputField*/}
                {/*                name='destinations'*/}
                {/*                label="Destinations"*/}
                {/*                multiline*/}
                {/*                rows={4}*/}
                {/*                disabled*/}
                {/*            />*/}
                {/*        </Box>*/}
                {/*    </Box>*/}
                {/*</Box>*/}

        <Box
          component="div"
          p={1}
          display="flex"
          justifyContent="space-between"
        >
          <Box component="span" width="100%" clone>
            <FormikInputField label="Notes" name="notes" multiline rows={4} />
          </Box>
        </Box>
      </Form>
    </Formik>
  );
};

export default TourDetail;
