import React, { useState } from "react";
import { GameInfo, User } from "../Types";
import GameListManager from "../DataManagers/GameListManager";

interface GameListProps {
    user: User,
    onGameEntry: (game: GameInfo) => void
}

/**
 * jaj10: A temporary implementation of GameList used by the HomePage component
 * before this component is finished by Tarushi (this is who is assigned this component)
 *
 * The styling here is horrible these are just buttons. This version of the component handles
 * sorting so that the main page doesn't sort.
 * @param param0 
 * @returns 
 */
function GameList({onGameEntry: onClick, user}: GameListProps) {
    /**
     * Gets the sorted version of the list from the GameListManager depending on the
     * user requested sort (lazily instead of eagerly).
     */
    let sortStates: Record<string, () => GameInfo[]> =  {
        "default": () => GameListManager.getGames(user.name),
        "deadline": () => GameListManager.getGamesSortedByDeadline(user.name),
        "score": () => GameListManager.getGameSortedByScore(user.name),
    }

    // Keeps track of the correct sort
    const [sortState, setSortState] = useState(() => sortStates.default);

    return (
        <div>
            {/* DROPDOWN for sorting option */}
            <label htmlFor="sort-dropdown">Sort By: </label>
            <select id="sort-dropdown" onChange={e => setSortState(() => sortStates[e.target.value])}>
                <option value="default">Default</option>
                <option value="deadline">Deadline</option>
                <option value="score">Score</option>
            </select>

            {
             /** 
              * Map each available game from the GameListManager to a button that calls an onClick
              * Method invokation for lazizness.
              */
            }
            {sortState().map(gameInfo => 
                <button 
                key={gameInfo.Id}
                onClick={() => onClick(gameInfo)}>
                    {gameInfo.Name}
                </button>
            )}
        </div>
    )
}

export default GameList;
