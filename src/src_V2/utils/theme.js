import { createTheme } from '@mui/material';

let theme = createTheme({
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

theme = createTheme(theme, {
  components: {},
});

export { theme };
