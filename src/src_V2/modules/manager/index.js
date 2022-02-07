import { Route, Routes } from 'react-router-dom';

import Container from './components/container/Container';
import { managerSidebarConfig } from './config';
import routes from './routes';

/**
 * @description Manager portal routing.
 * @returns {React.ReactElement}
 */
export default function Manager() {
  return (
    <Container managerSidebarConfig={managerSidebarConfig}>
      <Routes>
        {routes().map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </Container>
  );
}
