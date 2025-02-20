"use client";
import React from "react";
import { GameDescription } from "./GameDescription";
import { useRouter } from "next/navigation"; // Import useRouter

export function Home({ AccessGameDescription }: { AccessGameDescription: () => void }) {
    
    const onGameClick = () => {
        AccessGameDescription()
    }

    return (
        <div>
        <button onClick={onGameClick}> Go to Game Description</button>
        </div>
    );
}