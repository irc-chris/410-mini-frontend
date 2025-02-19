"use client";
import React from "react";
import { GameDescription } from "./gameDescription";

export function Game() {
     // Navigate to Game Description page after completed game (need to change to game description for each game)
     const AccessGameDescription = () => {
        return <GameDescription />;
    };

    // I think maybe doesn't need button but go to game description automatically
    return (
        <div>
        <button onClick={AccessGameDescription}>Game Description</button>
        </div>
    );
}