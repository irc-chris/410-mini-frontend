import { ConnectionManager } from "./ConnectionManager";

/**
 * Manages sending messages over the network using a provided Connection Manager.
 */
class MessageManager {
  connectionManager: ConnectionManager;

  /**
   * Initializes the MessageManager with a ConnectionManager instance.
   * @param {ConnectionManager} connectionManager - The connection manager instance for handling SignalR connections.
   */
  constructor(connectionManager: ConnectionManager) {
    this.connectionManager = connectionManager;
  }

  /*
   * TODO: Rename the following methods to new API names.
   */

  /**
   * Joins a specific chat room.
   *  
   * @param {string} roomId - The unique identifier of the room to join.
   * @param {string} username - The username of the sender.
   */
  joinRoom(roomId: string, username: string) {
    this.connectionManager.getConnection().send(
        "JoinRoom",
        JSON.stringify({
          RoomId: roomId,
          Username: username,
        })
    )
  }

  /**
   * Sends a message to a specific chat room.
   * @param {string} message - The content of the message to send.
   * @param {string} roomId - The unique identifier of the room where the message should be sent.
   * @param {string} username - The username of the sender.
   */
  sendMessage(message: string, roomId: string, username: string) {
    this.connectionManager.getConnection().send(
      "SendMessage",
      JSON.stringify({
        RoomId: roomId,
        Message: message,
        Username: username,
      })
    );
  }
}

export default MessageManager;
