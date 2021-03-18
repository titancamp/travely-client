import { HubConnectionBuilder } from "@microsoft/signalr";
import { createContext } from "react";

export const NotificationContext = createContext({
  connection: new HubConnectionBuilder()
    .withUrl("https://localhost:5001/notification", {
      accessTokenFactory: () => sessionStorage.getItem("token"),
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
