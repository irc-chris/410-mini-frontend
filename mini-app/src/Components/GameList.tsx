import React, {useEffect, useState } from "react";
import Game from "./Game";
import GameListManager from "../DataManagers/GameListManager";
import { GameInfo, User } from "../Types";

/**
 * GameListProps defines the expected props for the GameList component.
 * It contains a 'user' object which will be used to fetch the list of games
 * assigned to the user and display them, and a 'sortBy' string (assigned by
 * the user) that dictates the order in which games will appear.
 */
interface GameListProps {
    user: User;
    sortBy: "default" | "deadline" | "score";
    onGameEntry: (game: GameInfo) => void;
}

/**
 * The GameList component displays a list of games assigned to the specified user.
 * The games are fetched and optionally sorted based on user preferences for sorting 
 * (by "default", "deadline", or "score"). Each game is displayed using the Game component.
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
     */
    useEffect(() => {
        const fetchedGames = GameListManager.getGames(user.name, sortBy);
        setGames(fetchedGames);
    }, [user.name, sortBy]); // Re-run effect when user name or sortBy changes

    /**
     * Render the GameList component. This consists of a list of games, each
     * represented by a Game component
     */
    return (
        <div>
            <p>Currently sorting by: <strong>{sortBy}</strong></p>

            <ul style={{ listStyle: "none", padding: 0 }}>
                {games.map((game) => (
                    <li key={game.Id}
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
                        <Game game={game} user={user} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
