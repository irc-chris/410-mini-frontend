"use client";
import React from "react";
import { Game } from "./game";

export function Lobby() {
    const AccessGame = () => {
        return <Game />;
    };

    // This may be automatically choosen instead of 2 butttons
    return (
        <div>
        <button onClick={AccessGame}>Game</button>
        </div>
    );
}