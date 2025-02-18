import React from "react";
import { GameInfo, User } from "../Types";

// Define the props that the Game component will receive
interface GameProps {
    game: GameInfo;
    user: User;
}

/**
 * Component for displaying detailed information about a specific game.
 * It retrieves the game details based on the user and the game info passed as props.
 * The data is fetched asynchronously using the GameDataManager, and the component renders
 * the game details once the data is available.
 *
 * @param {Object} props - The component props
 * @param {GameInfo} props.game - The game object that contains the initial game data
 * @param {User} props.user - The user object containing information about the user
 * @returns {JSX.Element} A React element displaying the game's information.
 */
export default function Game({ game, user }: GameProps) {
    /**  Render the game details (name, instructions, score,
     * deadline) passed through props parameters
    */
    return (
        <div>
            <h2>{game.Name}</h2>
            <p>{game.Instruction}</p>
            <p> Score: {user.scores[game.Name]}</p>
            <p>Deadline: {new Date(game.Deadline).toLocaleDateString()}</p>
        </div>
    );
}
