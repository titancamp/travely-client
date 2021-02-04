import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Admin from './components/admin/admin';
import User from './components/user/user';
import Login from './components/auth/login';
import { ProtectedRoute } from './protected-route';

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/login" component={Login} />
                <ProtectedRoute exact path="/admin" component={Admin} />
                <ProtectedRoute exact path="/user" component={User} />
            </Switch>
        </BrowserRouter>
    );
}
