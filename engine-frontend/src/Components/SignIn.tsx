"use client";
import React from "react";

export function SignIn({ AccessHome }: { AccessHome: () => void }) {
    // implement signin logic Here

    return (
        <div>
        <h1>Sign In</h1>
        <button onClick={AccessHome}>Go Home</button>
        </div>
    );
};
