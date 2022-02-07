import { Route, Routes } from 'react-router-dom';

import FoodNoData from './FoodNoData';
<<<<<<< HEAD
import FoodList from './list/Index';
=======
import AddFood from './add/Index';
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
    { index: true, element: <FoodNoData /> },
    { path: ROUTES.ADD, element: <AddFood /> },
    { path: ROUTES.LIST, element: <FoodList /> },
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
