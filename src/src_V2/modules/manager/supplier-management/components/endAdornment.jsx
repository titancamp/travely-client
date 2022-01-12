import { IconButton, InputAdornment } from '@mui/material';

export function EndAdornment({ icon }) {
  return (
    <InputAdornment position='end'>
      <IconButton>{icon}</IconButton>
    </InputAdornment>
  );
}
