import React from "react";
import AppRouting from "./app-routing";
import { AuthContext } from "./store/context";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      jwt: "",
      email: "",
      login: (isLoggedIn, jwt, email) => {
        this.setState({
          isLoggedIn,
          jwt,
          email,
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
