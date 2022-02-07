import { Route, Routes } from 'react-router-dom';

import TransportationNoData from './TransportationNoData';
import AddTransportation from './add/Index';

export const ROUTES = {
  ADD: 'add',
  LIST: 'list',
};

/**
 * @description Transportation route configs.
 */
function routeConfigs() {
  return [
    { index: true, element: <TransportationNoData /> },
    { path: ROUTES.ADD, element: <AddTransportation /> },
  ];
}

export default function Transportation() {
  return (
    <Routes>
      {routeConfigs().map((item, index) => (
        <Route key={index} {...item} />
      ))}
    </Routes>
  );
}
