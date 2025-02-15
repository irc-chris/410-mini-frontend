"use client";
import React from "react";
import { users } from "../DataManagers/UserManager";

export function Leaderboard() {
    // Collect unique game names from user assignments
    const allGames = Array.from(
      new Set(users.flatMap((user) => Object.keys(user.scores)))
    );
  
    return (
      <div>
        <h1>Leaderboard</h1>
        {allGames.map((game) => (
          <div key={game}>
            <h2>{game}</h2>
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>User</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {users
                  .filter((user) => user.scores[game] !== undefined)
                  .sort((a, b) => (b.scores[game] || 0) - (a.scores[game] || 0))
                  .map((user, index) => (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.scores[game] || 0}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    );
  }
  
  export default Leaderboard;
