import { Route, Routes } from 'react-router-dom';

import PageWrapper from '../../../components/userPageWrapper';
import UserConfigContent from './UserConfig/UserConfig';
import UserManagementContent from './UserManagementContent';

export const ROUTES = {
  ADD_USER: 'add-user',
  EDIT_USER: ':userId',
};

/**
 * @description User Management route configs.
 */
function routeConfigs() {
  return [
    { index: true, element: <UserManagementContent /> },
    { path: ROUTES.ADD_USER, element: <UserConfigContent newUser /> },
    { path: ROUTES.EDIT_USER, element: <UserConfigContent /> },
  ];
}

export default function UserManagement() {
  return (
    <PageWrapper>
      <Routes>
        {routeConfigs().map((item, index) => (
          <Route key={index} {...item} />
        ))}
      </Routes>
    </PageWrapper>
  );
}
