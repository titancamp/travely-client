import Todo from './todo';
import Dashboard from './dashboard';
import Accommodation from './supplier-management/accommodation';
import Payables from './financial/components/payables/Payables';
import Account from './account';

export const ROUTES = {
  TODO: 'todo',
  DASHBOARD: 'dashboard',
  ACCOMMODATION: 'accommodation/*',
  PAYABLE: 'payable',
  ACCOUNT: 'account',
};

/**
 * @description Tour Manager portal routes configs.
 */
export default function routeConfigs() {
  return [
    { path: ROUTES.TODO, element: <Todo /> },
    { path: ROUTES.DASHBOARD, element: <Dashboard /> },
    { path: ROUTES.ACCOMMODATION, element: <Accommodation /> },
    { path: ROUTES.PAYABLE, element: <Payables /> },
    { path: ROUTES.ACCOUNT, element: <Account /> },
  ];
}
