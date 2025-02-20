import { RefObject } from "react";
import { ApiReceiveFunction, ConnectionManager } from "./ConnectionManager";
import MessageManager from "./MessageManager";

class Client2ServerAdapter {
    connectionManager!: ConnectionManager;
    // roomManager!: RoomManager;
    messageManager!: MessageManager;

    constructor() {}

    /**
     * Initializes the adapter by negotiating a connection with the backend.
     * Fetches connection details and sets up managers for rooms and messages.
     */
    async initialize() {
      console.log("Initializing adapter...");
      await fetch("https://warm-up-a.azurewebsites.net/api/negotiate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Negotiation failed: ${response.status} ${response.statusText}`
            );
          }
          return response.json();
        })
        .then((json) => {
          console.log("Negotiation successful:", json);
  
          const connectionUrl = json.Url;
          const accessToken = json.AccessToken;
  
          if (!connectionUrl || !accessToken) {
            throw new Error("Negotiation response is missing required fields.");
          }

          this.connectionManager = new ConnectionManager(
            connectionUrl,
            accessToken
          );

          this.messageManager = new MessageManager(this.connectionManager);
          
        })
        .catch((error) => {
          // Handle errors at any step of the promise chain
          console.error("Negotiation failed:", error);
        });
    }

    // TODO: rename following methods to new API names

    /**
     * Sends a text message to a chat room.
     * @param {string} message - The message content.
     * @param {string} roomId - The ID of the room where the message is sent.
     * @param {string} username - The sender's username.
     */ 
    sendTextMessage(message: string, roomId: string, username: string): void {
      this.messageManager.sendMessage(message, roomId, username);
    }

    /**
     * Joins a chat room.
     * 
     * @param {string} roomId - The ID of the room to join.
     * @param {string} username - The sender's username.
     */ 
    joinRoom(roomId: string, username: string): void {
      return this.messageManager.joinRoom(roomId, username);
    }

    /**
     * Sets the message handler callback function. This callback function is invoked whenever
     * the frontend receives a new message.
     * 
     * @param receiveMessageHandler Callback function; handles the new message
     * @returns 
     */
    onReceiveMessage(receiveMessageHandler: (...args: any) => void): ApiReceiveFunction {
      return this.connectionManager.registerMessageHandler(
        "NewMessage", // TODO: change name
        receiveMessageHandler
      )
    }

    /**
     * Removes the provided callback function when registering the onReceiveMessage message
     * handler.
     * 
     * @param receiveMessageHandler The callback function to remove
     */
    dismountOnReceiveMessage(receiveMessageHandler: (...args: any) => void): void {
      // TODO: change NewMessageName
      this.connectionManager.removeMessageHandler("NewMessage", receiveMessageHandler);
    }
}

/**
 * Initializes the adapter and notifies the caller that the adapter was initialized (if successful). 
 * 
 * @param setIsInitialized Callback function. Function invoked with true if successful, otherwise not invoked.
 * @param hasInitialized Alternate way to notify caller by setting reference to true if successful.
 */
export const initializeAdapter = async (setIsInitialized: (arg0: boolean) => any, hasInitialized: RefObject<Boolean>) => {
  try {
    console.log("Initializing client2ServerAdapter...");
    await client2ServerAdapter.initialize();
    console.log("client2ServerAdapter initialized successfully!");
    setIsInitialized(true); // Mark initialization as complete
    hasInitialized.current = true; // Mark as initialized
  } catch (error) {
    console.error("Failed to initialize client2ServerAdapter:", error);
  }
};

const client2ServerAdapter = new Client2ServerAdapter();
export default client2ServerAdapter;