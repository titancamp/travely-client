import Todo from './todo';
import Dashboard from './dashboard';
import Accommodation from './supplier-management/accommodation';

const ROUTES = {
  TODO: "todo",
  DASHBOARD: "dashboard",
  ACCOMMODATION: "accommodation/*",
};

/**
 * @description Tour Manager portal routes configs.
 */
export default function routeConfigs() {

  return [
    {path: ROUTES.TODO, element: <Todo />,},
    {path: ROUTES.DASHBOARD, element: <Dashboard />,},
    {path: ROUTES.ACCOMMODATION, element: <Accommodation />,},
  ];
}
