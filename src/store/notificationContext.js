import { HubConnectionBuilder } from "@microsoft/signalr";
import { createContext } from "react";
import appConfig from "../app-config.json";

const notificationURL = process.env.REACT_APP_AUTH_URL || appConfig.notificationURL;

export const NotificationContext = createContext({
  connection: new HubConnectionBuilder()
    .withUrl(`${notificationURL}/notification`, {
      accessTokenFactory: () => {
        const authContext = JSON.parse(localStorage.getItem("AuthContext"));
        return authContext.accessToken;
      },
    })
    .withAutomaticReconnect()
    .build(),
  isConnected: false,
  connect: function () {
    if (!this.isConnected)
      return this.connection
        .start()
        .then(() => {
          console.log("Connection started");
          this.isConnected = true;
          this.connection.on("receiveNotification", (notification) => {
            this.notifications.push(notification);
          });
        })
        .catch(console.log);
  },
  notifications: [
    {
      resourceId: 1,
      module: "Property",
      message: "Simple notification message",
    },
  ],
});
