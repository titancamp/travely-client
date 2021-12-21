import Dashboard from './dashboard';
import TODO from './todo';
import Payable from './financial/payable';

export const ROUTES = {
  DASHBOARD: 'dashboard',
  TODO: 'todo',
  PAYABLE: 'payable',
};

/**
 * @description Tour Manager portal routes configs.
 */
export default function routeConfigs() {
  return [
    { path: ROUTES.DASHBOARD, element: <Dashboard /> },
    { path: ROUTES.TODO, element: <TODO /> },
    { path: ROUTES.PAYABLE, element: <Payable /> },
  ];
}
