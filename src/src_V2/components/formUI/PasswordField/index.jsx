import { TextField } from '@mui/material';
import { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Field, useFormikContext } from 'formik';

const PasswordFieldWrapper = ({ name, validate, ...otherProps }) => {
  const [showPassword, setShowPassword] = useState(false);
  const ctx = useFormikContext();

  const toggleShowHandler = () => {
    setShowPassword((prevValue) => !prevValue);
  };

  return (
    <Field name={name} validate={validate && ((value) => validate(value, ctx.values))}>
      {({ field, meta }) => {
        const configTextField = {
          fullWidth: true,
          variant: 'outlined',
          margin: 'normal',
          type: showPassword ? 'text' : 'password',
          InputProps: {
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={toggleShowHandler} edge='end'>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
          ...field,
          ...otherProps,
        };

        if (meta && meta.touched && meta.error) {
          configTextField.error = true;
          configTextField.helperText = meta.error;
        }

        return <TextField {...configTextField} />;
      }}
    </Field>
  );
};

export default PasswordFieldWrapper;
