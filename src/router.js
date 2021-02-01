import React from 'react';
import { createBrowserHistory } from "history";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import Login from './components/common/Login';
import AgencyProfile from './components/admin/AgencyProfile';
import ManageStaff from './components/admin/ManageStaff';
import ManageHotels from './components/admin/ManageHotels';
import ManageActivities from './components/admin/ManageActivities';
import ChangePassword from './components/admin/ChangePassword';
import Home from './components/user/Home';
import Tour from './components/user/Tour';

const routes = [    
    {
        exact: true,
        path: '/',
        component: Login
    },
    {
        exact: true,
        path: '/admin',
        component: AgencyProfile
    },
    {
        exact: true,
        path: '/admin/agencyProfile',
        component: AgencyProfile
    },
    {
        exact: false,
        path: '/admin/manageStaff',
        component: ManageStaff
    },
    {
        exact: false,
        path: '/admin/manageHotels',
        component: ManageHotels
    },
    {
        exact: false,
        path: '/admin/manageActivities',
        component: ManageActivities
    },
    {
        exact: false,
        path: '/admin/changePassword',
        component: ChangePassword
    },
    {
        exact: true,
        path: '/user',
        component: Home
    },
    {
        exact: false,
        path: '/user/home',
        component: Home
    },
    {
        exact: false,
        path: '/user/tour',
        component: Tour
    }
];


// create the history
const history = createBrowserHistory();

class Router extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Layout history={history}>
                    <Switch>
                        {routes.map(({ ...route }, i) =>
                            <Route key={i} {...route} />
                        )}
                    </Switch>
                </Layout>
            </BrowserRouter>
        );
    }
}

export default Router
