import { BrowserRouter as Router, useRoutes } from 'react-router-dom';

import routesConfig from './routes';
// import { CssBaseline } from "@mui/material";

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
      {/*<CssBaseline />*/}
      <App />
    </Router>
  );
};

export default AppWrapper;