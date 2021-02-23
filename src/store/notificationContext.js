import {HubConnectionBuilder} from "@microsoft/signalr";
import {createContext} from "react";

export const NotificationContext = createContext({
    connection: new HubConnectionBuilder()
        .withUrl("https://localhost:5001/notification", {
            accessTokenFactory: sessionStorage.getItem('token')
        })
        .withAutomaticReconnect()
        .build(),
    isConnected: false,
    connect: function () {
        if (!this.isConnected)
            return this.connection.start()
                .then(_ => console.log('Connection started'))
                .then(_ => this.isConnected = true)
                .catch(console.log)
    },
    registerOnClose: function (fn) {
        this.connection.onclose(fn)
    },
    registerNotificationReceived: function (fn) {
        this.connection.on('receiveNotification', fn)
    }
})
