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
}

/**
 * The GameList component displays a list of games assigned to the specified user.
 * The games are fetched and optionally sorted based on user preferences for sorting 
 * (by "default", "deadline", or "score"). Each game is displayed using the Game component.
 * @param {GameListProps} props - The props for the GameList component.
 * @param {User} props.user - The user object containing details about the user
 * @param {string} props.sortBy - The string specifying the order of games
 * @returns {JSX.Element} - The rendered GameList component.
 */
export default function GameList({ user, sortBy }: GameListProps) {
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

            <ul>
                {games.map((game) => (
                    <li key={game.Id}>
                        <Game game={game} user={user} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
