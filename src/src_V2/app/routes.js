import Auth from '../modules/auth';
import User from '../modules/manager';

/** Global Routes */

const ROUTES = {
  AUTH: '/*',
  TOUR_MANAGER: '/manager/*',
};

/**
 * @description Global app routes config.
 */
export default function routeConfigs() {
  return [
    { path: ROUTES.AUTH, element: <Auth /> },
    { path: ROUTES.TOUR_MANAGER, element: <User /> },
  ];
}
