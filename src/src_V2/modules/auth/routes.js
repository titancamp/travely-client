import { Navigate } from 'react-router-dom';
import Login from './login/Login';
import SignUp from './signUp/SignUp';
import RegisterAgency from './registerAgency/RegisterAgency';
import RestorePassword from './restorePassword/RestorePassword';

export const ROUTES = {
  LOGIN: 'login',
  SIGN_UP: 'signUp',
  REGISTER_AGENCY: 'registerAgency',
  RESTORE_PASSWORD: 'restorePassword',
};

/**
 * @description Auth routes configs.
 */
export default function routeConfigs() {
  return [
    { path: '/', element: <Navigate to={ROUTES.LOGIN} replace /> },
    { path: ROUTES.LOGIN, element: <Login /> },
    { path: ROUTES.REGISTER_AGENCY, element: <RegisterAgency /> },
    { path: ROUTES.SIGN_UP, element: <SignUp /> },
    { path: ROUTES.RESTORE_PASSWORD, element: <RestorePassword /> },
  ];
}
