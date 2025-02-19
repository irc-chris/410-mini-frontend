"use client";
import React from "react";
import { SignIn } from "./signIn";

export function Introduction() {
    // implement function

    // Need to navigate to signIn page
    const handleSignIn = () => {
        return <SignIn />;
    };


    return (
        <div>
        <h1>Welcome to the Game App</h1>
        <button onClick={handleSignIn}>Sign In</button>
        </div>
    );

}




