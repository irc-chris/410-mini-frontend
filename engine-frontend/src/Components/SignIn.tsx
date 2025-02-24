"use client";
import React from "react";

export function SignIn({ AccessHome }: { AccessHome: () => void }) {
    // implement signin logic Here
    function handleSignIn() {
        AccessHome()
    }
    return (
        <div>
        <h1>Sign In</h1>
        <button onClick={handleSignIn}>Go Home</button>
        </div>
    );
};
