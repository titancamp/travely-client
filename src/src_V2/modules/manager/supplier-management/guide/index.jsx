import { Route, Routes } from 'react-router-dom';

import AddGuide from './add/Index';
import GudeNoData from './GuideNoData';
import GuideList from './list/Index';

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
