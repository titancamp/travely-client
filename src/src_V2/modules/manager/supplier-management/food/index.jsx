import { Route, Routes } from 'react-router-dom';

import FoodNoData from './FoodNoData';
import AddFood from './add/Index';

export const ROUTES = {
  ADD: 'add',
  LIST: 'list',
};

/**
 * @description Food route configs.
 */
function routeConfigs() {
  return [
    { index: true, element: <FoodNoData /> },
    { path: ROUTES.ADD, element: <AddFood /> },
  ];
}

export default function Food() {
  return (
    <Routes>
      {routeConfigs().map((item, index) => (
        <Route key={index} {...item} />
      ))}
    </Routes>
  );
}
