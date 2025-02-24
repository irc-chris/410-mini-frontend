"use client";
import React from "react";

function Introduction({ AccessSignIn }: { AccessSignIn: () => void}) {

    return (
        <div>
        <h1>Welcome to the Game Editor</h1>
        <button onClick={AccessSignIn}>Sign In</button>
        </div>
    );
}

export default Introduction;