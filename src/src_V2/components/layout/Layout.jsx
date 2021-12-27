import { Box } from '@mui/material';

import { COLORS } from '../../utils';

const boxStyles = {
  flexGrow: 1,
  p: 3,
  height: '100%',
  backgroundColor: COLORS.lightGray,
};

const titleColor = {
  color: COLORS.secondary,
  marginTop: '10px',
};

export default function Layout({ children, title }) {
  return (
    <Box sx={boxStyles}>
      {title && <h2 style={titleColor}>{title}</h2>}
      {children}
    </Box>
  );
}
