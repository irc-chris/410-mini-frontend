import React from "react";
import { Game, Location } from "../Types";

// Define the props that the Game component will receive
interface GameProps {
    game: Game;
    userSaveState?: {
        last_location?: Location;
        attributes?: Record<string, any>;
    };
}

/**
 * Component for displaying detailed information about a specific game.
 * It checks if the game has been published. If so, it retrieves and displays game details
 * based on the game info and user state passed as props.
 * 
 * @param {Object} props - The component props
 * @param {GameInfo} props.game - The game object that contains the initial game data
 * @param {User} props.userSaveState - Any progress user may have saved previously
 * @returns {JSX.Element} A React element displaying the game's information.
 */
export default function GameComponent({ game, userSaveState }: GameProps) {
    // NEW FUNCTIONALITY: Check if the game is published
    if (!game.playable) {
        return (
            <div>
                <h2>{game.name} (In Development)</h2>
                <p>This game is not yet published.</p>
            </div>
        );
    }

    // Get score from saved state if available
    const userScore = userSaveState?.attributes?.score ?? "No progress yet";
    const lastLocation = userSaveState?.last_location?.description ?? "Unknown";

    /**  Render the game details (name, instructions, score,
     * deadline) passed through props parameters
    */
    return (
        <div>
            <h2>{game.name}</h2>
            <p>Created by: {game.user_id}</p>
            <p>Last Location: {lastLocation}</p>
            <p>Score: {userScore}</p>
        </div>
    );
}
