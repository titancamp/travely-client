import EmptyResult from "./EmptyComponent";
import AddAccommodation from "./add/AddAccommodation";

export const ROUTES = {
  ADD: "add",
  LIST: "list",
};

/**
 * @description Accommodation route configs.
 */
export default function routeConfigs() {

  return [
    {index: true, element: <EmptyResult />,},
    {path: ROUTES.LIST, element: <>ACCOMMODATION LIST</>,},
    {path: ROUTES.ADD, element: <AddAccommodation />,},
  ];
}
