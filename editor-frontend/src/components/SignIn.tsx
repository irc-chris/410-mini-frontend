"use client";
import React from "react";
import Home from "./Home";

function SignIn({ AccessHome }: { AccessHome: () => void}) {
    // check the password and username and navigate to the home page. 
    const handleSignIn = () => {
       AccessHome()
    };

    return (
        <div>
        <form> 
            <label>Username</label>
            <input type="text" name="username" />
            <label>Password</label>
            <input type="password" name="password" />
        </form>
        <button onClick={handleSignIn}>Sign In</button>
        </div>
    );
}

export default SignIn;