import React from "react";
import AppRouting from "./app-routing";
import { AuthContext } from "./store/context";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const authContext = JSON.parse(localStorage.getItem("AuthContext")) || {};

    this.state = {
      isLoggedIn: authContext.loggedIn || false,
      accessToken: authContext.accessToken || null,
      refreshToken: authContext.refreshToken || null,
      expiresIn: authContext.expiresIn || null,
      agencyId: authContext.agencyId || null,
      userId: authContext.userId || null,
      email: authContext.email || null,
      role: authContext.role || null,
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
