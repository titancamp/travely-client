import AccommodationNoData from './landing/AccommodationNoData';
import AddAccommodation from './add/Index';
import AccommodationList from './list/Index';

export const ROUTES = {
  ADD: 'add',
  LIST: 'list',
};

/**
 * @description Accommodation route configs.
 */
export default function routeConfigs() {
  return [
    { index: true, element: <AccommodationNoData /> },
    { path: ROUTES.ADD, element: <AddAccommodation /> },
    { path: ROUTES.LIST, element: <AccommodationList /> },
  ];
}
