"use client";
import React, { useEffect, useRef, useState } from "react";

import Leaderboard from "./Leaderboard";
import { users } from "../DataManagers/UserManager";
import GameList from "./GameList";
import GameInterface from "./GameInterfacePage";
import { GameInfo } from "../Types";
import client2ServerAdapter, { initializeAdapter } from "../Integration/connection";

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
  const [isInitialized, setIsInitialized] = useState(false); // Eventually used by the setting up of our listener handlers
  const hasInitialized = useRef(false);
  const [sortBy, setSortBy] = useState<
    "default" | "deadline" | "score" | "name"
  >("default"); // State to handle sorting

  /**
   * Since this is the homepage, we want to initialize our connection here.
   * 
   * useEffect to initialize the client2ServerAdapter when the component mounts.
   * Ensures the adapter is only initialized once.
   */
    useEffect(() => {
      if (hasInitialized.current) return; // Prevent re-initialization
        
      initializeAdapter(setIsInitialized, hasInitialized);
    }, []);


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
    setGameUI(
      <GameInterface
        username={SAMPLE_USER.name}
        gameId={game.Id}
        onQuit={onGameExit}
      />
    );
    setInGame(true);
  }

  /**
   * Handles the change of sorting option.
   * @param event - The event triggered when the sorting option is changed.
   */
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value as "default" | "deadline" | "score" | "name");
  };

  if (inGame) {
    return gameUI;
  } else
    return (
      <div>
        {/* TODO: Display username better using CSS */}
        <div>
          <b>Username: </b>
          {SAMPLE_USER.name}
        </div>
        <button onClick={() => setShowLeaderboard(!showLeaderboard)}>
          {showLeaderboard ? "Hide Leaderboard" : "Show Leaderboard"}
        </button>
        {showLeaderboard && <Leaderboard />}
        {/* Sorting options dropdown */}
        <div>
          <label htmlFor="sort-dropdown">Sort By: </label>
          <select id="sort-dropdown" value={sortBy} onChange={handleSortChange}>
            <option value="default">Default</option>
            <option value="deadline">Deadline</option>
            <option value="score">Score</option>
            <option value="name">Name</option>
          </select>
        </div>

        <div> Connection:
          <button onClick={client2ServerAdapter.initialize}> Connect</button>
        </div>

        {/* Pass the selected sortBy to the GameList component */}
        <GameList
          user={SAMPLE_USER}
          sortBy={sortBy}
          onGameEntry={onGameEntry}
        />
      </div>
    );
}
