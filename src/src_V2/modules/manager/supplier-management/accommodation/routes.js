import AccommodationNoData from "./landing/AccommodationNoData";
import AddAccommodation from "./add/Index";

export const ROUTES = {
  ADD: "add",
  LIST: "list",
};

/**
 * @description Accommodation route configs.
 */
export default function routeConfigs() {

  return [
    {index: true, element: <AccommodationNoData />,},
    {path: ROUTES.LIST, element: <>ACCOMMODATION LIST</>,},
    {path: ROUTES.ADD, element: <AddAccommodation />,},
  ];
}
