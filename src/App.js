import React from "react";
import AppRouting from "./app-routing";
import {AuthContext} from "./context";

export default class App extends React.Component {
    constructor() {
        super();

        this.state = {
            isLoggedIn: false,
            login: () => {
                this.setState({
                    isLoggedIn: true,
                });
            }
        };
    }

    render() {
        return (
            <AuthContext.Provider value={this.state}>
                <AppRouting/>
            </AuthContext.Provider>
        );
    }
}
