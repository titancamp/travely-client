import { Route, Routes } from 'react-router-dom';

import ActivityNoData from './ActivityNoData';
<<<<<<< HEAD
import ActivityList from './list/Index';
=======
import AddActivity from './add/Index';
>>>>>>> dev

export const ROUTES = {
  ADD: 'add',
  LIST: 'list',
};

/**
 * @description Food route configs.
 */
function routeConfigs() {
  return [
    { index: true, element: <ActivityNoData /> },
    { path: ROUTES.ADD, element: <AddActivity /> },
    { path: ROUTES.LIST, element: <ActivityList /> },
  ];
}

export default function Activity() {
  return (
    <Routes>
      {routeConfigs().map((item, index) => (
        <Route key={index} {...item} />
      ))}
    </Routes>
  );
}
