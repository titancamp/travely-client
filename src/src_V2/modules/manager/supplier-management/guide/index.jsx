import { Route, Routes } from 'react-router-dom';

import GudeNoData from './GuideNoData';
<<<<<<< HEAD
import GuideList from './list/Index';
=======
import AddGuide from './add/Index';
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
    { index: true, element: <GudeNoData /> },
    { path: ROUTES.ADD, element: <AddGuide /> },
    { path: ROUTES.LIST, element: <GuideList /> },
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
