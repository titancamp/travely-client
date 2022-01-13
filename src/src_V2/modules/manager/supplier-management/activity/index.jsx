import { Route, Routes } from 'react-router-dom';

import AddActivity from './add/Index';
import ActivityNoData from './ActivityNoData';

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
