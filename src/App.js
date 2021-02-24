import React from "react";
import AppRouting from "./app-routing";
import {AuthContext} from "./store/context";

export default class App extends React.Component {
    constructor(props) {
        super(props);

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
