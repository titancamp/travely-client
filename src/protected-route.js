import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./store/context";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <AuthContext.Consumer>
      {({ isLoggedIn }) => {
        return (
          <Route
            {...rest}
            render={(props) => {
              if (isLoggedIn) {
                return <Component {...props} />;
              } else {
                return (
                  <Redirect
                    to={{
                      pathname: "/",
                      state: {
                        from: props.location,
                      },
                    }}
                  />
                );
              }
            }}
          />
        );
      }}
    </AuthContext.Consumer>
  );
};
