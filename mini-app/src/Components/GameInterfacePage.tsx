import React, { useEffect, useState } from "react";
import "../Styles/GameInterfacePage.css";
import GameInterfaceManager from "../DataManagers/GameInterfaceManager";
import GameManager from "../DataManagers/GameManager";

// // will replace with correctly routing to the home page, i am just unsure on how we are doing this
// const onQuit = () => {
//   console.log("quit");
// };


function GameInterface({
  username,
  gameId,
  onQuit,
}: {
  username: string;
  gameId: string;
  onQuit: () => void;
}) {
  // Uses the manager to get GameInfo
  const { getGameInfo } = GameInterfaceManager();
  const { user, game } = getGameInfo(username, gameId);
  const [command, setCommand] = useState("");
  const [receivedCommands, setReceivedCommands] = useState<string[]>([]);

  const gameManager = GameManager.createFromProps(getGameInfo(username, gameId));

  function onReceiveMessage(message: string) {
    setReceivedCommands(prev => [...prev, message]);
  }

  // Mounts the message handler and joins the lobby on first render.
  // TODO: something about useEffect fails here in dev mode (disabling strict mode disables double useEffect and it works)
  // The bug is that messages are displayed twice.
  useEffect(() => {
    // The GameInterfacePage should never be rendered when the connection doesn't exist
    gameManager.joinLobby();
    const dismount = gameManager.listenForMessages(onReceiveMessage);

    return dismount;
  }, [])

  // sendCommand throws if failed to send a command. Clear text field if successful.
  const onSend = () => {
    gameManager.sendCommand(command)
      .then(() => setCommand(""))
      // TODO: better alert (no alert blocking!!)
      .catch(() => alert("Failed to send command"));
  };

  return (
    <div className="container">
      <header className="header">
        <span className="headerTitle">{game.Name}</span>
        <button onClick={onQuit}>Quit</button>
      </header>
      <div className="body">
        <aside className="inventory">
          <h3>Inventory</h3>
          {user.inventory[game.Name].map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </aside>
        <main className="main">
          <p>{game.Instruction}</p>
          {receivedCommands.map((s, idx) => <p key={idx}>{s}</p>)}
        </main>
      </div>
      <footer className="footer">
        <input
          type="text"
          placeholder="Type in something here..."
          className="input"
          value={command}
          onChange={e => setCommand(e.target.value)}
        />
        <button onClick={onSend}>Send</button>
      </footer>
    </div>
  );
}
export default GameInterface;
