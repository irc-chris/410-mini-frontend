"use client";
import React from "react";

export function Introduction({ onSignIn }: { onSignIn: () => void }) {
    // implement function

    return (
        <div>
        <h1>Welcome to the Game App</h1>
        <button onClick={onSignIn}>Sign In</button>
        </div>
    );

}




