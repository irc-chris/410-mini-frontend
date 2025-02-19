import React from 'react';
import SceneEditorCanvas from './SceneEditorCanvas';
import AssignGame from './AssignGame';

function GameEditorCanvas() {

    function handleSceneEditor() {
        return <SceneEditorCanvas />
    }

    function handleAssignGames() {
        return <AssignGame />
    }


    return (
        <div>
            <h1>Game Editor Canvas</h1>
            <button onClick={handleSceneEditor}> Go to Scene Editor Canvas</button>
            <button onClick={handleAssignGames}> Go to Assign Games </button>
        </div>
    );
}

export default GameEditorCanvas;