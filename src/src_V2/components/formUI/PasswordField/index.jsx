import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, TextField, InputAdornment } from '@mui/material';

const PasswordFieldWrapper = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowHandler = () => {
    setShowPassword((prevValue) => !prevValue);
  };

  return (
    <TextField
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton
              onClick={toggleShowHandler}
              onMouseDown={(e) => e.preventDefault()}
              edge='end'
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};

export default PasswordFieldWrapper;
