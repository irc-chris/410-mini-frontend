"use client"
import React, { useState } from 'react';
import GameEditorCanvas from './GameEditorCanvas';

function NewGameOptions() {

    function handleGameEditor() {
        return <GameEditorCanvas />

    }
    return (
        <div> 
            <h1> New Game Options </h1>
            <button onClick={handleGameEditor}> Go to Game Editor </button>
        </div>
    )
}

export default NewGameOptions;