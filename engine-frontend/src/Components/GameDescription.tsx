"use client";
import React from "react";
export function GameDescription({ AccessGame, AccessLobby }: { AccessGame: () => void, AccessLobby: () => void }) {

    // This may be automatically choosen instead of 2 butttons
    return (
        <div>
        <button onClick={AccessGame}>Game</button>
        <button onClick={AccessLobby}>Lobby</button>
        </div>
    );
}