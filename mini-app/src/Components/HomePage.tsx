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
        setGameUI(<GameInterface title={game.Name} instructions={game.Instruction} inventory={SAMPLE_USER.inventory} onQuit={onGameExit} />)
        setInGame(true);
    }

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
            {/* TODO: Change GameList implementation to the implementation Tarushi will implement */}
            <GameList user={SAMPLE_USER}/>
        </div>
    )
}
