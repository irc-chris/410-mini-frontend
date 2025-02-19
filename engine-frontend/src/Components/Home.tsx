"use client";
import React from "react";
import { GameDescription } from "./gameDescription";

export function Home() {

    // Navigate to Game Description page (need to change to game description for each game)
    const AccessGameDescription = () => {
        return <GameDescription />;
    };

    return (
        <div>
        <button onClick={AccessGameDescription}>Sign In</button>
        </div>
    );
}