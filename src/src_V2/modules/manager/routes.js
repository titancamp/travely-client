import Todo from './todo';
import Dashboard from './dashboard';
import Accommodation from './supplier-management/accommodation';
import Payable from './financial/payable';

export const ROUTES = {
  TODO: 'todo',
  DASHBOARD: 'dashboard',
  ACCOMMODATION: 'accommodation/*',
  PAYABLE: 'payable',
};

/**
 * @description Tour Manager portal routes configs.
 */
export default function routeConfigs() {
  return [
    { path: ROUTES.TODO, element: <Todo /> },
    { path: ROUTES.DASHBOARD, element: <Dashboard /> },
    { path: ROUTES.ACCOMMODATION, element: <Accommodation /> },
    { path: ROUTES.PAYABLE, element: <Payable /> },
  ];
}
