import { Route, Routes } from 'react-router-dom';

import AddFood from './add/Index';
import FoodNoData from './FoodNoData';

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
