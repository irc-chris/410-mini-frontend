"use client"
import React, { useState } from 'react';
import GameEditorCanvas from './GameEditorCanvas';

function NewGameOptions({ AccessGameEditor }: { AccessGameEditor: () => void}) {

    function handleGameEditor() {
        AccessGameEditor() // navigate to game editor
    }
    return (
        <div> 
            <h1> New Game Options </h1>
            <button onClick={handleGameEditor}> Go to Game Editor </button>
        </div>
    )
}

export default NewGameOptions;