"use client";
import React from "react";

export function Lobby({ AccessGame}: { AccessGame: () => void }) {

    const onGameClick = () => {
        AccessGame()
    }

    // This may be automatically choosen instead of 2 butttons
    return (
        <div>
        <button onClick={onGameClick}>Game</button>
        </div>
    );
}