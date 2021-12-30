import AddAccommodation from './add/Index';
import AccommodationList from './list/Index';
import { Route, Routes } from 'react-router-dom';
import AccommodationNoData from './noData/AccommodationNoData';

export const ROUTES = {
  ADD: 'add',
  LIST: 'list',
};

/**
 * @description Accommodation route configs.
 */
function routeConfigs() {
  return [
    { index: true, element: <AccommodationNoData /> },
    { path: ROUTES.ADD, element: <AddAccommodation /> },
    { path: ROUTES.LIST, element: <AccommodationList /> },
  ];
}

export default function Accommodation() {
  return (
    <Routes>
      {routeConfigs().map((item, index) => (
        <Route key={index} {...item} />
      ))}
    </Routes>
  );
}
