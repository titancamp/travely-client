import { Navigate } from 'react-router-dom';

import Manager from '../modules/manager';
import Login from '../modules/auth/login/Login';
import SignUp from '../modules/auth/signUp/SignUp';
import RegisterAgency from '../modules/auth/registerAgency/RegisterAgency';
import RestorePassword from '../modules/auth/restorePassword/RestorePassword';
/** Global Routes */

export const ROUTES = {
  LOGIN: '/login',
  REGISTER_AGENCY: '/registerAgency',
  SIGN_UP: '/signUp',
  RESTORE_PASSWORD: '/restorePassword',
  COMPANY_OWNER: '/owner/*',
  TOUR_MANAGER: '/manager/*',
};

/**
 * @description Global app routes config.
 */
export default function routeConfigs() {
  return [
    { path: '/', element: <Navigate to={ROUTES.LOGIN} replace /> },
    { path: ROUTES.LOGIN, element: <Login /> },
    { path: ROUTES.REGISTER_AGENCY, element: <RegisterAgency /> },
    { path: ROUTES.SIGN_UP, element: <SignUp /> },
    { path: ROUTES.RESTORE_PASSWORD, element: <RestorePassword /> },
    { path: ROUTES.TOUR_MANAGER, element: <Manager /> },
  ];
}
