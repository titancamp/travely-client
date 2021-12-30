import Todo from './todo';
import Dashboard from './dashboard';
import Accommodation from './supplier-management/accommodation';
import Transportation from './supplier-management/transportation';

export const ROUTES = {
  TODO: 'todo',
  DASHBOARD: 'dashboard',
  ACCOMMODATION: 'accommodation/*',
  TRANSPORTATION: 'transportation/*',
};

/**
 * @description Tour Manager portal routes configs.
 */
export default function routeConfigs() {
  return [
    { path: ROUTES.TODO, element: <Todo /> },
    { path: ROUTES.DASHBOARD, element: <Dashboard /> },
    { path: ROUTES.ACCOMMODATION, element: <Accommodation /> },
    { path: ROUTES.TRANSPORTATION, element: <Transportation /> },
  ];
}
