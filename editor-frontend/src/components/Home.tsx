"use client";
import React from "react";
import  NewGameOptions from "./NewGameOptions";

function Home({ AccessNewGameOptions}: { AccessNewGameOptions: () => void}) {
    function handleCreateGame() {
        AccessNewGameOptions()
    }

    return (
        <div>
            <h1>Home</h1>
            <button onClick={handleCreateGame}>Create Game</button>
        </div>
    );
}

export default Home;