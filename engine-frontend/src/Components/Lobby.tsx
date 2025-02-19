"use client";
import React from "react";

export function Lobby({ AccessGame}: { AccessGame: () => void }) {

    // This may be automatically choosen instead of 2 butttons
    return (
        <div>
        <button onClick={AccessGame}>Game</button>
        </div>
    );
}