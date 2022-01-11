import { TextField } from '@mui/material';
// import { useField } from 'formik';
import { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Field } from 'formik';

const PasswordFieldWrapper = ({ name, validate, ...otherProps }) => {
  const [showPassword, setShowPassword] = useState(false);
  // const [field, meta] = useField(name);

  const handleClickShowPassword = () => {
    setShowPassword((prevValue) => !prevValue);
  };

  return (
    <Field name={name} validate={validate}>
      {({ field, meta }) => {
        const configTextField = {
          fullWidth: true,
          variant: 'outlined',
          margin: 'dense',
          type: showPassword ? 'text' : 'password',
          InputProps: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
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
