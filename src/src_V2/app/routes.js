import Manager from '../modules/manager';
import Login from '../modules/login';

/** Global Routes */
const ROUTES = {
  LOGIN: 'login',
  COMPANY_OWNER: 'owner/*',
  TOUR_MANAGER: 'manager/*',
};

/**
 * @description Global app routes config.
 */
export default function routeConfigs() {
  return [
    { path: ROUTES.TOUR_MANAGER, element: <Manager /> },
    { path: ROUTES.LOGIN, element: <Login /> },
  ];
}
