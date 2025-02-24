"use client";
import { Introduction } from "../Components/Introduction";
import { SignIn } from "../Components/SignIn";
import { Home } from "../Components/Home";
import { GameDescription } from "../Components/GameDescription";
import { Lobby } from "../Components/Lobby";
import { Game } from "../Components/Game";
import React, { useState } from "react";

export default function Page() {
    const [currentPage, setCurrentPage] = useState("introduction");

    // Function to navigate between pages
    const navigate = (page: string) => {
        setCurrentPage(page);
    };

    return (
        <div>
            {currentPage === "introduction" && <Introduction onSignIn={() => navigate("signin")} />}
            {currentPage === "signin" && <SignIn AccessHome={() => navigate("home")} />}
            {currentPage === "home" && <Home AccessGameDescription={() => navigate("gamedescription")}/>}
            {currentPage === "gamedescription" && <GameDescription AccessGame={() => navigate("game")} AccessLobby = {() => navigate("lobby")}/>}
            {currentPage === "lobby" && <Lobby AccessGame={() => navigate("game")} />}
            {currentPage === "game" && <Game AccessGameDescription = {() => navigate("gamedescription")} />}
        </div>
    );
}
