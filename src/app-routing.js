import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Admin from "./components/admin/admin";
import User from "./components/user/user";
import Login from "./components/auth/login";
import ForgotPassword from "./components/auth/forgot-password";
import PasswordReset from "./components/auth/password-reset";
import Registration from "./components/auth/registration";
import { ProtectedRoute } from "./protected-route";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/forgotpassword" component={ForgotPassword} />
        <Route exact path="/newpassword" component={PasswordReset} />
        <Route exact path="/registration" component={Registration} />
        <ProtectedRoute path="/admin" component={Admin} />
        <ProtectedRoute path="/user" component={User} />
      </Switch>
    </BrowserRouter>
  );
}
