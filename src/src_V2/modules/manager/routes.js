import Reporting from './reporting';
import Todo from './todo';
import Dashboard from './dashboard';
import Accommodation from './supplier-management/accommodation';
import Payables from './financial/components/payables/Payables';
import Transportation from './supplier-management/transportation';
import Food from './supplier-management/food';

export const ROUTES = {
  TODO: 'todo',
  FOOD: 'food/*',
  PAYABLE: 'payable',
  DASHBOARD: 'dashboard',
  ACCOMMODATION: 'accommodation/*',
  TRANSPORTATION: 'transportation/*',
  REPORTING: 'reporting',
};

/**
 * @description Tour Manager portal routes configs.
 */
export default function routeConfigs() {
  return [
    { path: ROUTES.TODO, element: <Todo /> },
    { path: ROUTES.FOOD, element: <Food /> },
    { path: ROUTES.PAYABLE, element: <Payables /> },
    { path: ROUTES.DASHBOARD, element: <Dashboard /> },
    { path: ROUTES.ACCOMMODATION, element: <Accommodation /> },
    { path: ROUTES.TRANSPORTATION, element: <Transportation /> },
    { path: ROUTES.REPORTING, element: <Reporting />}
  ];
}
