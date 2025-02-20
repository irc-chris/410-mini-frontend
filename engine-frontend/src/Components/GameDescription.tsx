"use client";
import React from "react";
export function GameDescription({ AccessGame, AccessLobby }: { AccessGame: () => void, AccessLobby: () => void }) {

    const onPlayGame = () => {
        AccessGame()
    };

    const onEnterLobby = () => {
        AccessLobby()
    };
    // This may be automatically choosen instead of 2 butttons
    return (
        <div>
        <button onClick={onPlayGame}>Game</button>
        <button onClick={onEnterLobby}>Lobby</button>
        </div>
    );
}