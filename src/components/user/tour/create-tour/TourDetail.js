import React from "react";
import { Formik, Form } from "formik";
import Box from "@material-ui/core/Box";
import FormikInputField from "../../../UI/FormikComponents/FormikInputField";

const TourDetail = ({
  initialValues,
  currentStepFormRef,
  currentStepFormName,
  setFormValues,
}) => {
  return (
    <Formik
      initialValues={
        initialValues || {
          tourName: "",
          origin: "",
          startDate: "",
          endDate: "",
          pickUpTime: "",
          pickUpDetails: "",
          dropOffTime: "",
          dropOffDetails: "",
          destinations: "",
          notes: "",
        }
      }
      innerRef={currentStepFormRef}
      onSubmit={(values, { setSubmitting }) => {
        setFormValues(currentStepFormName, values);
        setSubmitting(false);
      }}
    >
      <Form>
        <Box component="div" display="flex" justifyContent="space-between">
          <Box component="span">
            <Box component="div" p={1}>
              <Box width="100%" clone>
                <FormikInputField label="Tour Name" name="tourName" />
              </Box>
            </Box>
            <Box component="div" p={1}>
              <Box width="100%" clone>
                <FormikInputField label="Origin" name="origin" />
              </Box>
            </Box>
            <Box
              component="div"
              p={1}
              display="flex"
              justifyContent="space-between"
            >
              <Box component="span" width="48%" clone>
                <FormikInputField
                  label="Start Date"
                  name="startDate"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>
              <Box component="span" width="48%" clone>
                <FormikInputField
                  label="End Date"
                  name="endDate"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>
            </Box>
            <Box
              component="div"
              p={1}
              display="flex"
              justifyContent="space-between"
            >
              <Box component="span" width="30%" clone>
                <FormikInputField
                  label="Pick-up"
                  name="pickUpTime"
                  type="time"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>
              <Box component="span" width="66%" clone>
                <FormikInputField label="Details" name="pickUpDetails" />
              </Box>
            </Box>
            <Box
              component="div"
              p={1}
              display="flex"
              justifyContent="space-between"
            >
              <Box component="span" width="30%" clone>
                <FormikInputField
                  label="Drop-off"
                  name="dropOffTime"
                  type="time"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>
              <Box component="span" width="66%" clone>
                <FormikInputField label="Details" name="dropOffDetails" />
              </Box>
            </Box>
          </Box>
          <Box component="span" height="100%">
            <Box component="div" width="100%" height="100%" p={1}>
              <FormikInputField
                name="destinations"
                label="Destinations"
                multiline
                rows={4}
                disabled
              />
            </Box>
          </Box>
        </Box>

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
