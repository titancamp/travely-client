import Account from './account';
import Dashboard from './dashboard';
import Payables from './financial/payables/Payables';
import Receivables from './financial/receivables/Receivables';
import Reporting from './reporting';
import Accommodation from './supplier-management/accommodation';
import Activity from './supplier-management/activity';
import Food from './supplier-management/food';
import Guide from './supplier-management/guide';
import Transportation from './supplier-management/transportation';
import Todo from './todo';
import TourPackage from './tour-management/tour-packages';
import UserManagement from './user-management';

export const ROUTES = {
  TODO: 'todo',
  FOOD: 'food/*',
  GUIDE: 'guide/*',
  PAYABLE: 'payable',
  RECEIVABLE: 'receivable',
  ACTIVITY: 'activity/*',
  DASHBOARD: 'dashboard',
  TOUR_PACKAGE: 'tour-package/*',
  ACCOMMODATION: 'accommodation/*',
  TRANSPORTATION: 'transportation/*',
  REPORTING: 'reporting',
  ACCOUNT: 'account',
  USER_MANAGEMENT: 'user-management/*',
};

/**
 * @description Tour Manager portal routes configs.
 */
export default function routeConfigs() {
  return [
    { path: ROUTES.TODO, element: <Todo /> },
    { path: ROUTES.FOOD, element: <Food /> },
    { path: ROUTES.GUIDE, element: <Guide /> },
    { path: ROUTES.PAYABLE, element: <Payables /> },
    { path: ROUTES.RECEIVABLE, element: <Receivables /> },
    { path: ROUTES.ACTIVITY, element: <Activity /> },
    { path: ROUTES.DASHBOARD, element: <Dashboard /> },
    { path: ROUTES.TOUR_PACKAGE, element: <TourPackage /> },
    { path: ROUTES.ACCOMMODATION, element: <Accommodation /> },
    { path: ROUTES.TRANSPORTATION, element: <Transportation /> },
    { path: ROUTES.REPORTING, element: <Reporting /> },
    { path: ROUTES.ACCOUNT, element: <Account /> },
    { path: ROUTES.USER_MANAGEMENT, element: <UserManagement /> },
  ];
}
