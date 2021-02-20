import * as signalR from "@microsoft/signalr";
import {createContext} from "react";

const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:5001/notification", {
        accessTokenFactory: sessionStorage.getItem('token')
    })
    .configureLogging(signalR.LogLevel.Information)
    .withAutomaticReconnect()
    .build();
connection.onclose(() => this.setState({connected: false}));
export const NotificationContext = createContext({
    connection,
    isConnected: false,
    connect: function () {
        if (!this.isConnected)
            return this.connection.start()
                .then(_ => console.log('Connection started'))
                .then(_ => this.isConnected = true)
                .catch(console.log)
    },
    registerNotificationReceived: function (fn) {
        this.connection.on('receiveNotification', fn)
    }
})
