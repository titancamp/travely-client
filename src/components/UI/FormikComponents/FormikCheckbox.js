import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {useField} from "formik";

const FormikCheckbox = ({
                            color = "primary",
                            ...props
                        }) => {
    const [field, meta] = useField(props);
    return (
        <FormControlLabel
            control={
                <Checkbox
                    color={color}
                    {...field}
                    {...props}
                />
            }
            label="Primary"
        />
    );
};

export default FormikCheckbox;