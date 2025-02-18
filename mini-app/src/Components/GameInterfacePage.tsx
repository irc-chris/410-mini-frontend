import React from "react";
import "../Styles/GameInterfacePage.css";

// // will replace with correctly routing to the home page, i am just unsure on how we are doing this
// const onQuit = () => {
//   console.log("quit");
// };

// will replace with functionality
const onSend = () => {
  console.log("sent message");
};

function GameInterface({
  title,
  instructions,
  inventory,
  onQuit
}: {
  title: string;
  instructions: string;
  inventory: string[];
  onQuit: () => void
}) {
  return (
    <div className="container">
      <header className="header">
        <span className="headerTitle">{title}</span>
        <button onClick={onQuit}>Quit</button>
      </header>
      <div className="body">
        <aside className="inventory">
          <h3>Inventory</h3>
          {
            inventory.map((item, i) => (
              <li key={i}>{item}</li>
            ))
          }
        </aside>
        <main className="main">
          <p>{instructions}</p>
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
