import { Route, Routes } from 'react-router-dom';

import AddTourPackage from './add/Index';
import TourPackageNoData from './TourPackageNoData';

export const ROUTES = {
  ADD: 'add',
  LIST: 'list',
};

/**
 * @description Food route configs.
 */
function routeConfigs() {
  return [
    { index: true, element: <TourPackageNoData /> },
    { path: ROUTES.ADD, element: <AddTourPackage /> },
  ];
}

export default function TourPackage() {
  return (
    <Routes>
      {routeConfigs().map((item, index) => (
        <Route key={index} {...item} />
      ))}
    </Routes>
  );
}
