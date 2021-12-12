import Manager from '../modules/manager';

/** Global Routes */
const ROUTES = {
    COMPANY_OWNER: 'owner/*',
    TOUR_MANAGER: 'manager/*',
};

/**
 * @description Global app routes config.
 */
export default function routeConfigs() {

    return [
        {path: ROUTES.TOUR_MANAGER, element: <Manager />,},
    ];
}


