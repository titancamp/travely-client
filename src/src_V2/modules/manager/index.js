import { Route, Routes } from 'react-router-dom';

import routes from './routes';
import Container from './components/container/Container';
import { managerSidebarConfig } from './config';

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
