import React, { useEffect, useState } from "react";
import { GameInfo, User } from "../Types";
import GameDataManager from "../DataManagers/GameDataManager";

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
    // State to store the game data after it's fetched
    const [gameInfo, setGameInfo] = useState<GameInfo | null>(null);

    /**
     * useEffect hook to fetch the game data when the component is mounted or when the gameId or userName changes.
     * This hook is used to call the GameDataManager and retrieve the full details for the game.
     */
    useEffect(() => {
        const gameDataManager = GameDataManager();
        // Fetch the game data using the GameDataManager's getGameInfo method
        // This function is expected to return an object with the game and user details
        const { game: fetchedGame } = gameDataManager.getGameInfo(user.name, game.Id);
        setGameInfo(fetchedGame);
    }, [game.Id, user.name]);// Re-run the effect when either the game ID or username changes

    // If the gameInfo has not been fetched yet, show a loading message
    if (!gameInfo) return <div>Loading...</div>;

    // Once gameInfo is available, render the game details (name, instructions, deadline)
    return (
        <div>
            <h2>{gameInfo.Name}</h2>
            <p>{gameInfo.Instruction}</p>
            <p> Score: {user.scores[gameInfo.Name]}</p>
            <p>Deadline: {new Date(gameInfo.Deadline).toLocaleDateString()}</p>
        </div>
    );
}
