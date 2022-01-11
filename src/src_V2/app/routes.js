import Manager from '../modules/manager';
import Login from '../modules/login';
import RestorePassword from '../modules/restorePassword';

/** Global Routes */
const ROUTES = {
  LOGIN: 'login',
  RESTORE_PASSWORD: 'restorePassword',
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
    { path: ROUTES.RESTORE_PASSWORD, element: <RestorePassword /> },
  ];
}
