import Dashboard from './dashboard';
import TODO from './todo';

const ROUTES = {
  DASHBOARD: 'dashboard',
  TODO: 'todo',
};

/**
 * @description Tour Manager portal routes configs.
 */
export default function routeConfigs() {
  return [
    { path: ROUTES.DASHBOARD, element: <Dashboard /> },
    { path: ROUTES.TODO, element: <TODO /> },
  ];
}
