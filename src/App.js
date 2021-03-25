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
      agencyId: null,
      userId: null,
      email: null,
      role: null,
      login: (data) => {
        this.setState({
          isLoggedIn: data.loggedIn,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          expiresIn: data.expiresIn,
          agencyId: data.agencyId,
          userId: data.userId,
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
