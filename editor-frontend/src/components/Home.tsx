"use client";
import React from "react";
import  NewGameOptions from "./NewGameOptions";

function Home() {
    function handleCreateGame() {
        return <NewGameOptions />;
    }

    return (
        <div>
            <h1>Home</h1>
            <button onClick={handleCreateGame}>Create Game</button>
        </div>
    );
}

export default Home;