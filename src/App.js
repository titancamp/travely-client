import React from "react";
import AppRouting from "./app-routing";
import { AuthContext } from "./store/context";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      accessToken: null,
      refreshToken: null,
      expiresIn: null,
      ownerId: null,
      email: null,
      role: null,
      login: (data) => {
        this.setState({
          isLoggedIn: data.loggedIn,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          expiresIn: data.expiresIn,
          ownerId: data.ownerId,
          email: data.email,
          role: data.role,
        });
      },
    };
  }

  render() {
    return (
      <AuthContext.Provider value={this.state}>
        <AppRouting />
      </AuthContext.Provider>
    );
  }
}
