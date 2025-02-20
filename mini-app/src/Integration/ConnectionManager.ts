// Taken directly from WU-A

import * as signalR from "@microsoft/signalr";

// Type alias for a function that handles received API messages.
export type ApiReceiveFunction = (...args: any[]) => void;

/**
 * Manages SignalR connections, user authentication, and message handling.
 */
export class ConnectionManager {
  connection: signalR.HubConnection;

  //readonly SEND_MSG = "sendMessage";

  /**
   * Constructs a ConnectionManager instance and initializes the SignalR connection.
   * @param {string} url - The SignalR hub URL.
   * @param {string} accessToken - The access token for authentication.
   */
  constructor(url: string, accessToken: string) {
    console.log("constructing with", url, "and", accessToken);
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(url, {
        accessTokenFactory: () => accessToken,
      })
      .build();

    console.log("connection settled. adding handler");

    // Register error handler
    this.connection.on("Error", (data) => {
      console.log("ERROR:", data);
    });

    // Handle disconnection events
    this.connection.onclose(() => console.log("disconnected"));

    // Attempt to start the connection
    this.connection
      .start()
      .then(() => {
        console.log("connection started successfully");
      })
      .catch(console.error);

    // Register event handlers
    this.connection.on("loginResponse", (data) => {
      console.log("Login Acknowledgement:", data);
    });
    this.connection.on("PassAllRooms", (data) => {
      console.log("Rooms:", data);
    });
  }

  /**
   * Returns the active SignalR connection.
   */
  getConnection() {
    return this.connection;
  }
  
  /**
   * Registers a message handler for a specified message type.
   * @param {string} messageType - The message type to listen for.
   * @param {ApiReceiveFunction} callbackFn - The function to handle received messages.
   * @returns {ApiReceiveFunction} The callback function for removal reference.
   */
  registerMessageHandler(
    messageType: string,
    callbackFn: (...args: any[]) => void
  ) {
    this.connection.on(messageType, callbackFn);
    return callbackFn;
  }

  /**
   * Removes a previously registered message handler.
   * @param {string} messageType - The message type to remove the handler for.
   * @param {ApiReceiveFunction} callbackFn - The callback function to remove.
   */
  removeMessageHandler(messageType: string, callbackFn: ApiReceiveFunction) {
    this.connection.off(messageType, callbackFn);
  }
}