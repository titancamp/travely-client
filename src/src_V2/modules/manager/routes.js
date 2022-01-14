import Reporting from './reporting';
import Todo from './todo';
import Dashboard from './dashboard';
import Food from './supplier-management/food';
import Guide from './supplier-management/guide';
import Activity from './supplier-management/activity';
import TourPackage from './tour-management/tour-packages';
import Accommodation from './supplier-management/accommodation';
import Payables from './financial/components/payables/Payables';
import Transportation from './supplier-management/transportation';

export const ROUTES = {
  TODO: 'todo',
  FOOD: 'food/*',
  GUIDE: 'guide/*',
  PAYABLE: 'payable',
  ACTIVITY: 'activity/*',
  DASHBOARD: 'dashboard',
  TOUR_PACKAGE: 'tour-package/*',
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
    { path: ROUTES.GUIDE, element: <Guide /> },
    { path: ROUTES.PAYABLE, element: <Payables /> },
    { path: ROUTES.ACTIVITY, element: <Activity /> },
    { path: ROUTES.DASHBOARD, element: <Dashboard /> },
    { path: ROUTES.TOUR_PACKAGE, element: <TourPackage /> },
    { path: ROUTES.ACCOMMODATION, element: <Accommodation /> },
    { path: ROUTES.TRANSPORTATION, element: <Transportation /> },
    { path: ROUTES.REPORTING, element: <Reporting /> },
  ];
}
