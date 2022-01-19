import { Route, Routes } from 'react-router-dom';

import routes from './routes';

/**
 * @description Auth routing.
 * @returns {React.ReactElement}
 */
export default function Auth() {
  return (
    <Routes>
      {routes().map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
}
