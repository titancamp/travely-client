import React from 'react';
import {useField} from 'formik';
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

const FormikSelect = ({className = '', variant = "outlined", label = '', options = [], ...props}) => {
    const [field, meta] = useField(props);
    return (
        <>
            <FormControl variant="outlined" className={className}>
                <InputLabel>{label}</InputLabel>
                <Select
                    {...field} {...props}>
                    {
                        options.map(item => (
                            <MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};

export default FormikSelect;