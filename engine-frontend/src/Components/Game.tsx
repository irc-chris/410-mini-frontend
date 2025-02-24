"use client";
import React from "react";

export function Game({ AccessGameDescription }: { AccessGameDescription: () => void }) {
     // Navigate to Game Description page after completed game (need to change to game description for each game)
     const onDescription = () => {
        AccessGameDescription()
    };
    // I think maybe doesn't need button but go to game description automatically
    return (
        <div>
        <button onClick={onDescription}>Game Description</button>
        </div>
    );
}