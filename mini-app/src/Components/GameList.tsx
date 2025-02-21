import React, {useEffect, useState } from "react";
import Game from "./Game";
import GameListManager from "../DataManagers/GameListManager";
import { GameInfo, User, SaveState } from "../Types";

/**
 * GameListProps defines the expected props for the GameList component.
 * It contains a 'user' object which will be used to fetch the list of games
 * assigned to the user and display them, and a 'sortBy' string (assigned by
 * the user) that dictates the order in which games will appear. It also
 * includes an onGameEntry function to monitor if a game is clicked
 */
interface GameListProps {
    user: User;
    sortBy: "default" | "score" | "name";
    onGameEntry: (game: GameInfo) => void;
}

/**
 * The GameList component displays a list of games assigned to the specified user.
 * The games are fetched and optionally sorted based on user preferences for sorting 
 * (by "default", "deadline", "score", or "name"). Each game is displayed using the Game component.
 * @param {GameListProps} props - The props for the GameList component.
 * @param {User} props.user - The user object containing details about the user
 * @param {string} props.sortBy - The string specifying the order of games
 * @param {function} props.onGameEntry - The function that monitors when a game is clicked
 * @returns {JSX.Element} - The rendered GameList component.
 */
export default function GameList({ user, sortBy, onGameEntry }: GameListProps) {
    // State to hold the list of games fetched based on the current sorting criteria
    const [games, setGames] = useState<GameInfo[]>([]);

    /**
     * useEffect hook runs when the component mounts or when the sorting method
     * or user name changes. It fetches the list of games based on the selected
     * sorting criteria and updates the 'games' state.
     * 
     * NEW FUNCTIONALITY: displayed game list will include all games available to play
     * and all games the user has created (even if they have not completed/published
     * yet). This means games created by other users but not yet published are excluded
     */
    useEffect(() => {
        let fetchedGames = GameListManager.getGames(user.user_id, sortBy);
        fetchedGames = fetchedGames.filter(game => game.playable || game.user_id === user.user_id);
        setGames(fetchedGames);
    }, [user.user_id, sortBy]); // Re-run effect when user name or sortBy changes

    /**
     * Render the GameList component. This consists of a list of games, each
     * represented by a Game component
     */
    return (
        <div>
            <p>Currently sorting by: <strong>{sortBy}</strong></p>

            <ul style={{ listStyle: "none", padding: 0 }}>
                {games.map((game) => {
                    const userSaveState: SaveState | undefined = game.user_save_states[user.user_id];
                    const hasProgress = Boolean(userSaveState);
                    const isCreatedByUser = game.user_id === user.user_id;
                    const isInDevelopment = !game.playable && isCreatedByUser;

                    return (
                        <li key={game.game_id}
                            onClick={() => onGameEntry(game)}
                            style={{
                                border: "1px solid #ccc",
                                borderRadius: "8px",
                                padding: "10px",
                                marginBottom: "10px",
                                cursor: "pointer",
                                transition: "background-color 0.3s",
                                backgroundColor: "#f9f9f9",
                                boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#e0e0e0"}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#f9f9f9"}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Game game={game} userSaveState={userSaveState} />
                                <span style={{ fontStyle: "italic", fontSize: "0.9em", color: "#666" }}>
                                    {isInDevelopment ? "In Development" : hasProgress ? "Resume Game" : "New Game"}
                                </span>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
