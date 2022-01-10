import { Route, Routes } from 'react-router-dom';

import AddTransportation from './add/Index';
import TransportationNoData from './noData/TransportationNoData';
import AccommodationList from './list/Index';

export const ROUTES = {
  ADD: 'add',
  LIST: 'list',
};

/**
 * @description Accommodation route configs.
 */
function routeConfigs() {
  return [
    { index: true, element: <TransportationNoData /> },
    { path: ROUTES.ADD, element: <AddTransportation /> },
    { path: ROUTES.LIST, element: <AccommodationList /> },
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
