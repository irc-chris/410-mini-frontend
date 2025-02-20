import client2ServerAdapter from "../Integration/connection";
import { GameInfo, User } from "../Types";

/**
 * This class manages all internal game state. This includes sending commands to the backend game engine
 * and receiving commands and updated status from the backend game engine.
 * 
 * Note how the GameInterfacePage doesn't know anything about the client2ServerAdapter. Keep that UI unknowing
 * of this adapter; this handles all of that.
 */
class GameManager {
    private gameInfo: GameInfo;
    private userInfo: User;

    // TypeScript apparently doesn't support multiple constructors (gotta love prototypal inheritance)

    /**
     * Constructs a GameManager when the game info and the user info are in an object of type
     * {game: GameInfo, user: User}.
     * @param param The input object
     * @param {GameInfo} param.game The GameInfo of the game to play
     * @param {User} param.user The User user info of the logged in user
     * @returns A new GameManager with the provided information
     */
    static createFromProps({game, user}: {game: GameInfo, user: User}) {
        return new GameManager(game, user)
    }

    /**
     * Constructs a new GameManager object. The object manages game state and handles communicating
     * with the backend game engine.
     * 
     * @param gameInfo The GameInfo of the game to play
     * @param userInfo The User user info of the logged in user
     */
    constructor(gameInfo: GameInfo, userInfo: User) {
        this.gameInfo = gameInfo;
        this.userInfo = userInfo;
    }

    /**
     * Sends a text command to the backend so that they can handle gameplay. Asynchronous;
     * this should not block anything!!!!!
     * 
     * @param command The string command the player inputted to send.
     */
    async sendCommand(command: string) {
        if (command.length <= 0) {
            // TODO: custom alerts that don't block JavaScript
            // TODO: probably a better error message (make it fun it's a game!!!)
            alert("Uh???? You can't just do nothing?");
            throw new Error("Command cannot be empty");
        }

        console.log(`Attempting to send command ${command} from user ${this.userInfo.id} in game ${this.gameInfo.Id}`);

        // TODO: change placeholder ids with real game ids
        client2ServerAdapter.sendTextMessage(
            command,
            "88588d4f-4eca-4164-9e40-8f9b278817cf", // Placeholder room id;
            this.userInfo.name
        )
    }

    /**
     * Sets the callback function for handling received messages and command from the game engine backend.
     * 
     * @param callback The callback to invoke when a message is received. The callback takes a string parameter.
     * @returns The function to invoke whenever dismount. THIS FUNCTION MUST BE CALLED WHEN WE ARE NO LONGER PLAYING.
     */
    listenForMessages(callback: (message: string) => void ): () => void {
        // TODO: change Content to whatever will contain the message?? Also add type safety.
        client2ServerAdapter.onReceiveMessage((received) => {
            console.log(`Received ${JSON.stringify(received)}`);
            callback(received.Content);
        })

        return () => {
            // make sure to remove the handler when the component is dismounted
            client2ServerAdapter.dismountOnReceiveMessage(callback);
        }
    }

    /**
     * Joins a specific instance of the game and notifies the backend.
     * 
     * TODO: add lobby functionality????
     */
    joinLobby() {
        console.log("Attempting to join room");

        // TODO: change placeholder ids with real game ids
        client2ServerAdapter.joinRoom(
            "88588d4f-4eca-4164-9e40-8f9b278817cf", // Placeholder room id;
            this.userInfo.name
        );
    }
}

export default GameManager;
