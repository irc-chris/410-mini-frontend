"use client";
import React from "react";
import { GameDescription } from "./GameDescription";
import { useRouter } from "next/navigation"; // Import useRouter

export function Home({ AccessGameDescription }: { AccessGameDescription: () => void }) {
    return (
        <div>
        <button onClick={AccessGameDescription}> Go to Game Description</button>
        </div>
    );
}