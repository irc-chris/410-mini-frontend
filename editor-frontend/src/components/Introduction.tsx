"use client";
import React from "react";
import SignIn from "./SignIn";

function Introduction() {

    // navigate to the sign in page
    const handleSignIn = () => {
       return <SignIn />;
    };

    return (
        <div>
        <h1>Welcome to the Game Editor</h1>
        <button onClick={handleSignIn}>Sign In</button>
        </div>
    );
}

export default Introduction;