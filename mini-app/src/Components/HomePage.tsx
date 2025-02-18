"use client";
import React, { useState } from "react";

import Leaderboard from "./Leaderboard";
import { users } from "../DataManagers/UserManager";
import GameList from "./GameList";
import GameInterface from "./GameInterfacePage";
import { GameInfo } from "../Types";

// TODO: fetch from authentication layer (global state? singleton and useEffect?)
const SAMPLE_USER = users[0];

/**
 * Frankly, CSS styling is horrible here but I can fix this later.
 * @returns 
 */
export function HomePage() {
    const [inGame, setInGame] = useState(false);
    const [gameUI, setGameUI] = useState(<></>);
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [sortBy, setSortBy] = useState<"default" | "deadline" | "score">("default");  // State to handle sorting

    /**
     * Changes the displayed component to the main menu instead of the game.
     */
    function onGameExit() {
        setGameUI(<></>);
        setInGame(false);
    }

    /**
     * Changes the displayed component to the gameplay screen instead of the main menu.
     * @param game The game to be played as a GameInfo
     */
    function onGameEntry(game: GameInfo) {
        setGameUI(<GameInterface title={game.Name} instructions={game.Instruction} inventory={SAMPLE_USER.inventory[game.Name]} onQuit={onGameExit} />)
        setInGame(true);
    }

    /**
     * Handles the change of sorting option.
     * @param event - The event triggered when the sorting option is changed.
     */
    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(event.target.value as "default" | "deadline" | "score");
    };

    if (inGame) {
        return gameUI;
    } else return (
        <div>
            {/* TODO: Display username better using CSS */}
            <div><b>Username: </b>{SAMPLE_USER.name}</div>
            <button onClick={() => setShowLeaderboard(!showLeaderboard)}>
                {showLeaderboard ? "Hide Leaderboard" : "Show Leaderboard"}
            </button>
            {showLeaderboard && <Leaderboard />}
            {/* Sorting options dropdown */}
            <div>
                <label htmlFor="sort-dropdown">Sort By: </label>
                <select
                    id="sort-dropdown"
                    value={sortBy}
                    onChange={handleSortChange}
                >
                    <option value="default">Default</option>
                    <option value="deadline">Deadline</option>
                    <option value="score">Score</option>
                </select>
            </div>

            {/* Pass the selected sortBy to the GameList component */}
            <GameList user={SAMPLE_USER} sortBy={sortBy} onGameEntry={onGameEntry} />
        </div>
    )
}
