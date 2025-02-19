"use client";
import React from "react";
import { Game } from "./game";
import { Lobby } from "./lobby";

export function GameDescription() {
    const AccessGame = () => {
        return <Game />;
    };

    const AccessLobby = () => {
        return <Lobby />;
    };

    // This may be automatically choosen instead of 2 butttons
    return (
        <div>
        <button onClick={AccessGame}>Game</button>
        <button onClick={AccessLobby}>Lobby</button>
        </div>
    );
}