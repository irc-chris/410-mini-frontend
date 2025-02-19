import React from "react";
import "../Styles/GameInterfacePage.css";
import GameInterfaceManager from "../DataManagers/GameInterfaceManager";

// // will replace with correctly routing to the home page, i am just unsure on how we are doing this
// const onQuit = () => {
//   console.log("quit");
// };

// will replace with functionality
const onSend = () => {
  console.log("sent message");
};

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
        </main>
      </div>
      <footer className="footer">
        <input
          type="text"
          placeholder="Type in something here..."
          className="input"
        />
        <button onClick={onSend}>Send</button>
      </footer>
    </div>
  );
}
export default GameInterface;
