import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';

import routesConfig from './routes';
import './styles.css';

/**
 * @description I don't know why we need separate wrapper for useRoutes bu it didn't work as mentioned in doc.
 *              It's not final we need to check it out after.
 */
function App() {
  return useRoutes(routesConfig());
}

const AppWrapper = () => {
  return (
    <Router>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <App />
      </LocalizationProvider>
    </Router>
  );
};

export default AppWrapper;
