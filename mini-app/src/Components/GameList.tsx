import React, {useEffect, useState } from "react";
import Game from "./Game";
import GameListManager from "../DataManagers/GameListManager";
import { GameInfo, User } from "../Types";
 
/**
 * GameListProps defines the expected props for the GameList component.
 * It contains a single 'user' object which will be used to fetch the list of games
 * assigned to the user, and display them.
 */
interface GameListProps {
    user: User;
}
 
/**
 * The GameList component displays a list of games assigned to the specified user.
 * The games are fetched and optionally sorted based on user preferences for sorting
 * (by "default", "deadline", or "score"). Each game is displayed using the Game component.
 * @param {GameListProps} props - The props for the GameList component.
 * @returns {JSX.Element} - The rendered GameList component.
 */
export default function GameList({ user }: GameListProps) {
    // State to hold the list of games fetched based on the current sorting criteria
    const [games, setGames] = useState<GameInfo[]>([]);
    // State to keep track of the sorting preference (default, deadline, score)
    const [sortBy, setSortBy] = useState<"default" | "deadline" | "score">("default");
 
    /**
     * useEffect hook runs when the component mounts or when the sorting method
     * or user name changes. It fetches the list of games based on the selected
     * sorting criteria and updates the 'games' state.
     */
    useEffect(() => {
        let fetchedGames: GameInfo[] = [];
        // Based on the sorting preference, fetch the games using GameListManager
        if (sortBy === "deadline") {
            fetchedGames = GameListManager.getGamesSortedByDeadline(user.name);
        }
        else if (sortBy === "score") {
            fetchedGames = GameListManager.getGameSortedByScore(user.name);
        }
        else {
            fetchedGames = GameListManager.getGames(user.name);
        }
        setGames(fetchedGames);
    }, [user.name, sortBy]); // Re-run effect when user name or sortBy changes
 
    /**
     * Render the GameList component. This includes:
     * 1. A dropdown to select the sorting criteria (default, deadline, score)
     * 2. A list of games, each represented by a Game component
     */
    return (
        <div>
            <label htmlFor="sort-dropdown">Sort By:</label>
            <select
                id="sort-dropdown"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "default" | "deadline" | "score")}
            >
                <option value="default">Default</option>
                <option value="deadline">Deadline</option>
                <option value="score">Score</option>
            </select>
 
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