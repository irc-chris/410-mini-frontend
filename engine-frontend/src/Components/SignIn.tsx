"use client";
import React from "react";
import { Home } from "./home";


export function SignIn() {
    // implement signin logic Here

    // Navigate to Home after signin. (This is just a template)
    const handleSignIn = () => {
        return <Home />;
    };

    return (
        <div>
        <h1>Sign In</h1>
        <button onClick={handleSignIn}>Sign In</button>
        </div>
    );
};
