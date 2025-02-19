"use client";
import React from "react";

export function Game({ AccessGameDescription }: { AccessGameDescription: () => void }) {
     // Navigate to Game Description page after completed game (need to change to game description for each game)

    // I think maybe doesn't need button but go to game description automatically
    return (
        <div>
        <button onClick={AccessGameDescription}>Game Description</button>
        </div>
    );
}